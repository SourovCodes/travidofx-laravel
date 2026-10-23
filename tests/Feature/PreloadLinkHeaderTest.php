<?php

/*
 * The production web server (LiteSpeed) rejects responses whose headers exceed
 * about 8 KB with a bare 500, so the Vite preload Link header must stay small.
 */
test('the preload link header stays well under the web server header limit', function (string $url) {
    $link = (string) $this->get($url)->assertOk()->headers->get('Link');

    expect($link)->not->toBe('')
        ->and(strlen($link))->toBeLessThan(4096);
})->with([
    'home' => '/',
    'privacy policy' => '/privacy-policy',
    'checkout' => '/checkout',
    'products landing page' => 'http://products.tradivofx.com/',
    'contact landing page' => 'http://info.tradivofx.com/',
]);
