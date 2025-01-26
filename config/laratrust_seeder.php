<?php

return [
    /**
     * Control if the seeder should create a user per role while seeding the data.
     */
    'create_users' => false,

    /**
     * Control if all the laratrust tables should be truncated before running the seeder.
     */
    'truncate_tables' => true,

    'roles_structure' => [
        'studio_owner' => [
            'users' => 'c,r,u,d',
            'teams' => 'c,r,u,d',
            'organizations' => 'c,r,u,d',
            'events' => 'c,r,u,d',
        ],
        'studio_staff' => [
            'events' => 'c,r,u,d',
        ],
        'user' => [
            'users' => 'r,u',
        ],
    ],

    'permissions_map' => [
        'c' => 'create',
        'r' => 'read',
        'u' => 'update',
        'd' => 'delete',
    ],
];
