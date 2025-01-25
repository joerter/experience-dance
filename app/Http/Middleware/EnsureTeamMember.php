<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureTeamMember
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        $hasTeam = $user->rolesTeams()->exists();

        if (!$hasTeam) {
            if ($user->hasRole('studio_owner')) {
                return redirect()->route('onboarding.studio');
            }
            // Add other role redirects as needed
        }

        return $next($request);
    }
}
