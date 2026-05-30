import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ tareas, categorias, filtros }) {
    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        id: null,
        titulo: '',
        descripcion: '',
        fecha_vencimiento: '',
        categoria_id: '',
        estado: 'Pendiente',
    });

    const [modalAbierto, setModalAbierto] = useState(false);
    const [busqueda, setBusqueda] = useState(filtros.buscar || '');
    const [estadoFiltro, setEstadoFiltro] = useState(filtros.estado || '');
    const [modoEdicion, setModoEdicion] = useState(false);

    const abrirModal = (tarea = null) => {
        clearErrors();
        if (tarea) {
            setModoEdicion(true);
            setData({ ...tarea });
        } else {
            setModoEdicion(false);
            reset();
        }
        setModalAbierto(true);
    };

    const aplicarFiltros = (e) => {
        e.preventDefault();
        router.get(route('tareas.index'), { buscar: busqueda, estado: estadoFiltro }, { preserveState: true });
    };

    const submit = (e) => {
        e.preventDefault();
        if (modoEdicion) {
            put(route('tareas.update', data.id), { onSuccess: () => setModalAbierto(false) });
        } else {
            post(route('tareas.store'), { onSuccess: () => setModalAbierto(false) });
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <Head title="Gestión de Tareas" />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">DevTask</h1>
                <PrimaryButton onClick={() => abrirModal()}>+ Nueva Tarea</PrimaryButton>
            </div>

            <form onSubmit={aplicarFiltros} className="flex gap-4 mb-6">
                <TextInput
                    placeholder="Buscar por título..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                <select
                    value={estadoFiltro}
                    onChange={(e) => setEstadoFiltro(e.target.value)}
                    className="border-gray-300 rounded-md shadow-sm"
                >
                    <option value="">Todos los estados</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Progreso">En Progreso</option>
                    <option value="Completada">Completada</option>
                </select>
                <PrimaryButton type="submit">Filtrar</PrimaryButton>
            </form>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 border-b">Título</th>
                            <th className="p-4 border-b">Descripción</th>
                            <th className="p-4 border-b">Categoría</th>
                            <th className="p-4 border-b">Vencimiento</th>
                            <th className="p-4 border-b">Estado</th>
                            <th className="p-4 border-b">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tareas.data.map((tarea) => (
                            <tr key={tarea.id}>
                                <td className="p-4 border-b">{tarea.titulo}</td>
                                <td className="p-4 border-b">{tarea.descripcion}</td>
                                <td className="p-4 border-b">{tarea.categoria?.nombre}</td>
                                <td className="p-4 border-b">{tarea.fecha_vencimiento}</td>
                                <td className="p-4 border-b">{tarea.estado}</td>
                                <td className="p-4 border-b flex gap-2">
                                    <button onClick={() => abrirModal(tarea)} className="text-blue-600">Editar</button>
                                    <button onClick={() => destroy(route('tareas.destroy', tarea.id))} className="text-red-600">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal show={modalAbierto} onClose={() => setModalAbierto(false)}>
                <form onSubmit={submit} className="p-6">
                    <h2 className="text-lg font-medium mb-4">{modoEdicion ? 'Editar Tarea' : 'Nueva Tarea'}</h2>

                    <div className="mb-4">
                        <InputLabel value="Título" />
                        <TextInput className="w-full" value={data.titulo} onChange={e => setData('titulo', e.target.value)} />
                        <InputError message={errors.titulo} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel value="Descripción" />
                        <textarea
                            className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={data.descripcion}
                            onChange={e => setData('descripcion', e.target.value)}
                            rows="3"
                        ></textarea>
                        <InputError message={errors.descripcion} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel value="Categoría" />
                        <select className="w-full border-gray-300 rounded-md" value={data.categoria_id} onChange={e => setData('categoria_id', e.target.value)}>
                            <option value="">Seleccione...</option>
                            {categorias.map(cat => <option key={cat.id} value={cat.id}>{cat.nombre}</option>)}
                        </select>
                        <InputError message={errors.categoria_id} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel value="Fecha de Vencimiento" />
                        <TextInput type="date" className="w-full" value={data.fecha_vencimiento} onChange={e => setData('fecha_vencimiento', e.target.value)} />
                        <InputError message={errors.fecha_vencimiento} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel value="Estado" />
                        <select className="w-full border-gray-300 rounded-md" value={data.estado} onChange={e => setData('estado', e.target.value)}>
                            <option value="Pendiente">Pendiente</option>
                            <option value="En Progreso">En Progreso</option>
                            <option value="Completada">Completada</option>
                        </select>
                        <InputError message={errors.estado} className="mt-2" />
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                        <button type="button" onClick={() => setModalAbierto(false)} className="px-4 py-2 text-gray-600">Cancelar</button>
                        <PrimaryButton disabled={processing}>{processing ? 'Guardando...' : 'Guardar'}</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
