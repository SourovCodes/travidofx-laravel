<?php

namespace Deployer;

require 'recipe/laravel.php';

set('application', 'tradivofx');
set('repository', getenv('DEPLOY_REPOSITORY') ?: 'https://github.com/SourovCodes/tradivofx.git');
set('writable_mode', 'chmod');
set('keep_releases', 2);

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', []);

$hostname = getenv('DEPLOY_HOSTNAME');
$remoteUser = getenv('DEPLOY_REMOTE_USER');
$deployPath = getenv('DEPLOY_PATH');
$httpUser = getenv('DEPLOY_HTTP_USER');
$sshPort = getenv('DEPLOY_SSH_PORT');
$branch = getenv('DEPLOY_BRANCH') ?: 'main';
$phpBinary = getenv('DEPLOY_PHP_BINARY') ?: 'php';

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

set('bin/php', $phpBinary);

host($hostname)
    ->set('remote_user', $remoteUser)
    ->set('deploy_path', $deployPath)
    ->set('http_user', $httpUser)
    ->set('port', $sshPort)
    ->set('branch', $branch);

task('build:assets', function () {
    writeln('Building assets locally...');
    runLocally('npm ci');
    runLocally('npm run build');
})->desc('Build assets locally');

task('upload:assets', function () {
    writeln('Uploading built assets...');

    $user = get('remote_user');
    $hostname = currentHost()->getHostname();
    $port = get('port');
    $releasePath = get('release_path');
    $archiveName = 'build-assets.tar.gz';

    writeln('Creating archive...');
    runLocally("rm -f {$archiveName}");
    runLocally("tar -czf {$archiveName} -C public build");

    writeln('Uploading archive...');
    runLocally("scp -P {$port} {$archiveName} {$user}@{$hostname}:{$releasePath}/");

    writeln('Extracting archive on server...');
    run("tar -xzf {$releasePath}/{$archiveName} -C {$releasePath}/public/");

    writeln('Cleaning up...');
    runLocally("rm -f {$archiveName}");
    run("rm -f {$releasePath}/{$archiveName}");
})->desc('Upload built assets to server');

task('deploy:npm', function () {
    writeln('Skipping npm install on server (assets built locally)');
});

task('opcache:clear', function () {
    $commands = run('{{bin/php}} {{bin/artisan}} list --raw');

    if (! str_contains($commands, 'opcache:clear')) {
        writeln('Skipping OPcache clear; opcache:clear Artisan command is not available.');

        return;
    }

    writeln('Clearing OPcache...');
    run('{{bin/php}} {{bin/artisan}} opcache:clear');
})->desc('Clear OPcache when the Artisan command is available');

before('deploy', 'build:assets');
after('deploy:vendors', 'upload:assets');
after('deploy:success', 'opcache:clear');
after('deploy:failed', 'deploy:unlock');
