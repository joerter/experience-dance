<?php

use App\Models\Event;
use App\Models\Organization;
use Inertia\Testing\AssertableInertia as Assert;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('does not show event and org search unless there are upcoming events and organizations', function () {
    $response = $this->get('/');

    $response->assertInertia(
        fn(Assert $page) => $page
            ->component('Welcome')
            ->where(
                'showEventAndOrgSearch',
                false
            )
    );
});

test('shows event and org search when there are upcoming events or organizations', function () {
    Organization::factory()->has(Event::factory()->count(1))->create();

    $response = $this->get('/');

    $response->assertInertia(
        fn(Assert $page) => $page
            ->component('Welcome')
            ->where(
                'showEventAndOrgSearch',
                true
            )
    );
});
