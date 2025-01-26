<?php

namespace App\Http\Requests;

use App\Constants\Roles;
use Illuminate\Foundation\Http\FormRequest;

class StoreStudioOwnerOnboardingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->hasRole(Roles::STUDIO_OWNER);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'studio_name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:15',
            'street_line_1' => 'required|string|max:255',
            'street_line_2' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'postal_code' => 'required|string|max:10',
            'website' => 'nullable|url|max:255',
        ];
    }
}
