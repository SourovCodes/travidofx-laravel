<?php

namespace Deployer;

require 'recipe/laravel.php';

/*
|--------------------------------------------------------------------------
| Basic Config
|--------------------------------------------------------------------------
*/

// The repository is public, so the server clones it over HTTPS and needs no
// deploy key.
set('repository', 'https://github.com/SourovCodes/travidofx-laravel.git');
set('branch', getenv('DEPLOY_BRANCH') ?: 'main');
set('keep_releases', 2);

/*
|--------------------------------------------------------------------------
| Laravel Shared & Writable Paths
|--------------------------------------------------------------------------
*/

set('shared_dirs', [
    'storage',
]);

set('shared_files', [
    '.env',
]);

set('writable_dirs', [
    'storage',
    'bootstrap/cache',
]);

// Shared hosting has no ACL support and PHP runs as the account user.
set('writable_mode', 'chmod');

// Every class is in the classmap after install, so skip filesystem lookups.
set('composer_options', '--verbose --prefer-dist --no-progress --no-interaction --no-dev --optimize-autoloader --classmap-authoritative');

/*
|--------------------------------------------------------------------------
| Load Environment Variables
|--------------------------------------------------------------------------
*/

$hostname = getenv('DEPLOY_HOSTNAME');
$remoteUser = getenv('DEPLOY_REMOTE_USER');
$deployPath = getenv('DEPLOY_PATH');
$httpUser = getenv('DEPLOY_HTTP_USER');
$sshPort = getenv('DEPLOY_SSH_PORT');

if (! $hostname) {
    throw new \RuntimeException('DEPLOY_HOSTNAME environment variable is required');
}

if (! $remoteUser) {
    throw new \RuntimeException('DEPLOY_REMOTE_USER environment variable is required');
}

if (! $deployPath) {
    throw new \RuntimeException('DEPLOY_PATH environment variable is required');
}

if (! $httpUser) {
    throw new \RuntimeException('DEPLOY_HTTP_USER environment variable is required');
}

if (! $sshPort) {
    throw new \RuntimeException('DEPLOY_SSH_PORT environment variable is required');
}

/*
|--------------------------------------------------------------------------
| Hosts
|--------------------------------------------------------------------------
*/

host($hostname)
    ->set('remote_user', $remoteUser)
    ->set('deploy_path', $deployPath)
    ->set('http_user', $httpUser)
    ->set('port', $sshPort);

/*
|--------------------------------------------------------------------------
| Local Asset Build
|--------------------------------------------------------------------------
*/

// The server has no Node, so assets are always built where Deployer runs.
task('build:assets', function () {
    writeln('📦 Building assets locally...');
    runLocally('npm ci');
    runLocally('npm run build');
})->desc('Build assets locally');

/*
|--------------------------------------------------------------------------
| Upload Built Assets
|--------------------------------------------------------------------------
*/

task('upload:assets', function () {
    writeln('🚀 Uploading built assets...');
    $user = get('remote_user');
    $hostname = currentHost()->getHostname();
    $port = get('port');
    $releasePath = get('release_path');
    $archive = 'build-assets.tar.gz';

    runLocally("COPYFILE_DISABLE=1 tar -czf {$archive} -C public build");
    runLocally("scp -P {$port} {$archive} {$user}@{$hostname}:{$releasePath}/");
    run("tar -xzf {$releasePath}/{$archive} -C {$releasePath}/public/");
    runLocally("rm {$archive}");
    run("rm {$releasePath}/{$archive}");
})->desc('Upload built assets');

/*
|--------------------------------------------------------------------------
| Upload Production Environment
|--------------------------------------------------------------------------
*/

// In CI the production .env comes from the DOT_ENV secret; without it the
// existing shared/.env on the server is kept.
task('upload:env', function () {
    if (empty(getenv('DOT_ENV'))) {
        writeln('⏭️  DOT_ENV is not set, keeping the existing shared/.env');

        return;
    }

    writeln('🔐 Uploading production .env...');
    $user = get('remote_user');
    $hostname = currentHost()->getHostname();
    $port = get('port');

    runLocally("printenv DOT_ENV | ssh -p {$port} {$user}@{$hostname} \"umask 077 && cat > {{deploy_path}}/shared/.env\"");
})->desc('Upload production .env from the DOT_ENV secret');

/*
|--------------------------------------------------------------------------
| Skip npm on Server
|--------------------------------------------------------------------------
*/

task('deploy:npm', function () {
    writeln('⏭️  Skipping npm install on server');
});

/*
|--------------------------------------------------------------------------
| Restart Queue Workers
|--------------------------------------------------------------------------
*/

// The restart signal travels through the cache, so any running workers pick
// up the new release after finishing their current job.
task('queue:restart', function () {
    writeln('🔄 Gracefully restarting queue workers...');
    run('cd {{release_path}} && php artisan queue:restart');
})->desc('Gracefully restart queue workers');

/*
|--------------------------------------------------------------------------
| Hooks
|--------------------------------------------------------------------------
*/

before('deploy', 'build:assets');

before('deploy:shared', 'upload:env');

after('deploy:vendors', 'upload:assets');

after('deploy:symlink', 'queue:restart');

after('deploy:failed', 'deploy:unlock');
