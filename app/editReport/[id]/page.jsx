'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';
import EditorToolbar, { modules, formats } from '../../components/EditorToolbar';

const EditReport = ({ params }) => {
    const { id } = params;
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [incidencia, setIncidencia] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch report data
        const fetchReport = async () => {
            try {
                const response = await fetch(`/api/reports/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener el informe');
                }
                const data = await response.json();

                setTitle(data.title);
                setDescription(data.content);
                setDate(new Date(data.date).toISOString().split('T')[0]); // Formato para el input date
                setIncidencia(data.incidencia || '');
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/reports/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    date,
                    incidencia,
                }),
            });

            if (response.ok) {
                toast.success('Informe actualizado correctamente');
                router.push(`/reports/${id}`); // Redirige a la vista del informe
            } else {
                toast.error('Error al actualizar el informe');
            }
        } catch (error) {
            console.error('Error al actualizar el informe:', error);
            toast.error('Error al actualizar el informe');
        }
    };

    if (loading) return <p className="text-center text-2xl p-10">Cargando informe...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <section className="p-4 h-full w-full flex flex-col items-center">
            <h1 className="text-center text-4xl m-4 font-bold">Editar Informe</h1>
            <form onSubmit={handleSubmit} className="m-4 w-full max-w-4xl bg-white drop-shadow-md p-4 rounded">
                <div className="mb-4">
                    <label className="text-lg font-medium">Título:</label>
                    <input
                        name="title"
                        type="text"
                        className="border p-2 rounded w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="text-lg font-medium">Fecha del hecho:</label>
                    <input
                        name="date"
                        type="date"
                        className="border p-2 rounded w-full"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="text-lg font-medium">Tipo de incidencia:</label>
                    <select
                        value={incidencia}
                        onChange={(e) => setIncidencia(e.target.value)}
                        className="border p-2 rounded w-full"
                    >
                        <option value="">Selecciona un tipo de incidencia</option>
                        <option value="Robo">Robo</option>
                        <option value="Tentativa de robo">Tentativa de robo</option>
                        <option value="Infracción">Infracción</option>
                        <option value="Accidente">Accidente</option>
                        <option value="Hurto">Hurto</option>
                        <option value="Infracción ley 23.737">Infracción ley 23.737</option>
                        <option value="Daño (vandalismo)">Daño (vandalismo)</option>
                        <option value="Otros">Otros</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="text-lg font-medium">Descripción incidente:</label>
                    <EditorToolbar />
                    <ReactQuill
                        value={description}
                        onChange={setDescription}
                        placeholder="Describe el hecho..."
                        modules={modules}
                        formats={formats}
                    />
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className="w-full p-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded font-medium drop-shadow-[2px_4px_0px_rgba(0,0,0,0.8)] transition duration-200 ease-out no-print"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </section>
    );
};

export default EditReport;
