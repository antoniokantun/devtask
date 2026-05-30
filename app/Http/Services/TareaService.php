<?php

namespace App\Http\Services;
use App\Models\Tarea;

class TareaService
{
    public function obtenerTareas($filtros) {
        return Tarea::with('categoria')
            ->when($filtros['buscar'] ?? null, function ($query, $buscar) {
                $query->where('titulo', 'like', "%{$buscar}%");
            })
            ->when($filtros['estado'] ?? null, function ($query, $estado) {
                $query->where('estado', $estado);
            })
            ->orderBy('fecha_vencimiento', 'asc')
            ->paginate(10)
            ->withQueryString();
    }

    public function guardarTarea(array $datos, Tarea $tarea = null) {
        if (isset($datos['estado']) && $datos['estado'] === 'Completada') {
            if (!$tarea || $tarea->estado !== 'Completada') {
                $datos['fecha_completado'] = now();
            }
        } else {
            $datos['fecha_completado'] = null;
        }

        if ($tarea) {
            $tarea->update($datos);
            return $tarea;
        }

        return Tarea::create($datos);
    }

    public function eliminarTarea(Tarea $tarea) {
        $tarea->delete();
    }
}
