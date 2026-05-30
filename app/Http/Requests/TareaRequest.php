<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TareaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        return [
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'fecha_vencimiento' => 'required|date|after_or_equal:today',
            'categoria_id' => 'required|exists:categorias,id',
            'estado' => 'required|in:Pendiente,En Progreso,Completada'
        ];
    }

    public function messages(): array {
        return [
            'fecha_vencimiento.after_or_equal' => 'La fecha de vencimiento no puede ser anterior a hoy.',
        ];
    }
}
