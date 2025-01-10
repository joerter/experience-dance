<?php

use Inertia\Testing\AssertableInertia as Assert;

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
    $response = $this->get('/');

    // TODO: Create an organization and an event to test this

    $response->assertInertia(
        fn(Assert $page) => $page
            ->component('Welcome')
            ->where(
                'showEventAndOrgSearch',
                true
            )
    );
});
