<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LoginToken extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'token',
        'created_at',
        'expires_at'
    ];

    protected $dates = [
        'created_at',
        'expires_at'
    ];

    public function isValid()
    {
        return $this->expires_at->isFuture();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
