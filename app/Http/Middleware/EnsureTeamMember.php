<?php

namespace App\Http\Middleware;

use App\Constants\SessionKeys;
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
        if (session()->has(SessionKeys::TEAM_ID)) {
            return $next($request);
        }

        $user = $request->user();
        $hasTeam = $user->rolesTeams()->exists();

        if ($hasTeam) {
            $firstTeam = $user->rolesTeams()->first();
            session([SessionKeys::TEAM_ID => $firstTeam->id]);
            return $next($request);
        }

        if ($user->hasRole('studio_owner')) {
            return redirect()->route('onboarding.studio.create');
        }

        return redirect()->route('logout.destroy');
    }
}
