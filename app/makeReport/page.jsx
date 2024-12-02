"use client";

import MainLayout from '../components/MainLayout';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';
import EditorToolbar, { modules, formats } from '../components/EditorToolbar';

const MakeReport = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState({ date: '' });
    const [incidencia, setIncidencia] = useState('');

    const [errors, setErrors] = useState({
        title: '',
        date: '',
        description: '',
        incidencia: ''
    });

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (newValue) => {
        setDescription(newValue);
    };

    const handleValueChange = (e) => {
        setValue({ ...value, date: e.target.value });
    };

    const handleIncidenciaChange = (e) => {
        setIncidencia(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({ title: '', date: '', description: '', incidencia: '' });

        let hasError = false;

        if (!title.trim()) {
            setErrors(prev => ({ ...prev, title: 'Por favor, agregue un título.' }));
            hasError = true;
        }

        if (!value.date) {
            setErrors(prev => ({ ...prev, date: 'Por favor, selecciona una fecha.' }));
            hasError = true;
        }

        if (!description.trim()) {
            setErrors(prev => ({ ...prev, description: 'Por favor, proporciona una descripción.' }));
            hasError = true;
        }

        if (!incidencia) {
            setErrors(prev => ({ ...prev, incidencia: 'Por favor, selecciona una incidencia.' }));
            hasError = true;
        }

        if (hasError) return;

        const formattedDate = new Date(value.date).toISOString();
        console.log('Datos a enviar:', {
            title,
            description,
            date: formattedDate,
            incidencia // Agregamos incidencia aquí
        });

        try {
            const response = await fetch('/api/addReport', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    date: formattedDate,
                    incidencia
                }),
            });

            if (response.ok) {
                toast.success('Informe enviado correctamente');
                setTitle('');
                setDescription('');
                setValue({ date: '' });
                setIncidencia('');
            } else {
                toast.error('Error al enviar el informe');
            }
        } catch (error) {
            toast.error('Error al enviar el informe');
            console.error('Error al enviar el informe:', error);
        }
    };

    return (
        <MainLayout>
            <section className="p-4 h-full w-full flex flex-col items-center ">
                <h1 className="text-center text-4xl m-4 font-bold">Realizar Informe</h1>
                <form onSubmit={handleSubmit} className="m-4 w-full max-w-4xl bg-white drop-shadow-[2px_3px_3px_rgba(0,0,0,0.3)]">
                    <div className="m-4">
                        <label className="text-lg font-medium">Título:</label>
                        <input
                            name='title'
                            type="text"
                            className="border p-2 rounded w-full"
                            placeholder='Titulo'
                            value={title}
                            onChange={handleTitleChange}
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>

                    <div className="m-4">
                        <label className="text-lg font-medium">Fecha del hecho:</label>
                        <input
                            name="date"
                            type="date"
                            className="border p-2 rounded w-full"
                            value={value.date}
                            onChange={handleValueChange}
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                    </div>

                    <div className="m-4">
                        <label className="text-lg font-medium">Tipo de incidencia:</label>
                        <select
                            value={incidencia}
                            onChange={handleIncidenciaChange}
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
                        {errors.incidencia && <p className="text-red-500 text-sm">{errors.incidencia}</p>}
                    </div>

                    <div className="text-editor m-4">
                        <label className="text-lg font-medium">Descripción incidente:</label>
                        <EditorToolbar />
                        <ReactQuill
                            value={description}
                            onChange={handleDescriptionChange}
                            placeholder={"Describe el hecho..."}
                            modules={modules}
                            formats={formats}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>

                    <div className="m-4">
                        <button
                            type="submit"
                            className="p-2 w-full bg-gradient-to-r from-purple-500 via-red-500 to-orange-500 text-white rounded drop-shadow-[2px_4px_0px_rgba(0,0,0,0.8)] active:drop-shadow-none transition duration-200 ease-out active:translate-y-[3px]"
                        >
                            Enviar Informe
                        </button>
                    </div>
                </form>
            </section>
        </MainLayout>
    );
};

export default MakeReport;
