<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tarea extends Model
{
    use HasFactory, SoftDeletes;


    protected $table = 'tareas';

    protected $fillable = [
        'categoria_id',
        'titulo',
        'descripcion',
        'fecha_vencimiento',
        'estado',
        'fecha_completado',
    ];

    protected $casts = [
        'fecha_vencimiento' => 'date:Y-m-d',
        'fecha_completado' => 'datetime:Y-m-d H:i:s',
    ];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'categoria_id');
    }
}
