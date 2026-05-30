<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tarea;

class TareaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tareas = [
            [
                'titulo' => 'Revisar correos',
                'descripcion' => 'Revisar y responder todos los correos pendientes de la semana.',
                'fecha_vencimiento' => now()->addDays(2)->format('Y-m-d'),
                'estado' => 'Pendiente',
                'categoria_id' => 1,
                'fecha_completado' => null,
            ],
            [
                'titulo' => 'Comprar despensa',
                'descripcion' => 'Ir al supermercado y comprar víveres para la semana.',
                'fecha_vencimiento' => now()->addDays(1)->format('Y-m-d'),
                'estado' => 'Pendiente',
                'categoria_id' => 3,
                'fecha_completado' => null,
            ],
            [
                'titulo' => 'Hacer ejercicio',
                'descripcion' => 'Rutina de cardio y pesas por 45 minutos.',
                'fecha_vencimiento' => now()->format('Y-m-d'),
                'estado' => 'En Progreso',
                'categoria_id' => 2,
                'fecha_completado' => null,
            ],
            [
                'titulo' => 'Preparar reporte mensual',
                'descripcion' => 'Elaborar el informe de resultados para la reunión del viernes.',
                'fecha_vencimiento' => now()->addDays(3)->format('Y-m-d'),
                'estado' => 'Pendiente',
                'categoria_id' => 1,
                'fecha_completado' => null,
            ],
            [
                'titulo' => 'Pagar recibo de luz',
                'descripcion' => 'Realizar el pago a través de la aplicación del banco.',
                'fecha_vencimiento' => now()->subDays(1)->format('Y-m-d'),
                'estado' => 'Completada',
                'categoria_id' => 2,
                'fecha_completado' => now()->subDays(1),
            ],
        ];

        foreach ($tareas as $tarea) {
            Tarea::create($tarea);
        }
    }
}
