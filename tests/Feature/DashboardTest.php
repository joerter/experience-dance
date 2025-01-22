<?php

describe('GET /', function () {
    it('responds with 200', function () {
        $response = $this->get('/');

        $response->assertStatus(200);
    });
});
