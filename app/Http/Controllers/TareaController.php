<?php

namespace App\Http\Controllers;

use App\Models\Tarea;
use App\Models\Categoria;
use App\Http\Services\TareaService;
use App\Http\Requests\TareaRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TareaController extends Controller
{
    protected $tareaService;

    public function __construct(TareaService $tareaService)
    {
        $this->tareaService = $tareaService;
    }

   public function index(Request $request) {
        $filtros = $request->only(['buscar', 'estado']);

        return Inertia::render('Tareas/Index', [
            'tareas' => $this->tareaService->obtenerTareas($filtros),
            'categorias' => Categoria::all(),
            'filtros' => $filtros,
        ]);
    }

    public function store(TareaRequest $request) {
        $this->tareaService->guardarTarea($request->validated());
        return redirect()->route('tareas.index');
    }

    public function update(TareaRequest $request, Tarea $tarea) {
        $this->tareaService->guardarTarea($request->validated(), $tarea);
        return redirect()->route('tareas.index');
    }

    public function destroy(Tarea $tarea) {
        $this->tareaService->eliminarTarea($tarea);
        return redirect()->route('tareas.index');
    }
}
