"use client"

import MainLayout from '../components/MainLayout';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const ConsultReport = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        incidencia: '',
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const query = new URLSearchParams(filters).toString();
                const response = await fetch(`/api/reports?${query}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los informes');
                }
                const data = await response.json();
                setReports(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, [filters]);

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const clearFilters = () => {
        setFilters({
            incidencia: '',
            startDate: '',
            endDate: '',
        });
    };

    if (loading) return <MainLayout><p className='text-center p-10 text-lg'>Cargando informes...</p></MainLayout>;
    if (error) return <p>{error}</p>;

    return (
        <MainLayout>
            <section className="p-4 h-full w-full flex flex-col items-center">
                <h1 className="text-4xl font-bold m-4">Listado Informes</h1>

                <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto my-4 flex flex-wrap justify-between drop-shadow-[3px_3px_3px_rgba(0,0,0,0.3)]">
                    <div className="flex flex-col w-full md:w-1/3 mb-4 md:pr-4">
                        <label htmlFor="incidencia">Tipo de Incidencia</label>
                        <select
                            name="incidencia"
                            id="incidencia"
                            value={filters.incidencia}
                            onChange={handleFilterChange}
                            className="border p-2 rounded w-full">
                            <option value="">Todas</option>
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
                    <div className="flex flex-col w-full md:w-1/3 mb-4 md:px-4">
                        <label htmlFor="startDate">Fecha desde</label>
                        <input
                            type="date"
                            name="startDate"
                            id="startDate"
                            value={filters.startDate}
                            onChange={handleFilterChange}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="flex flex-col w-full md:w-1/3 mb-4 md:pl-4">
                        <label htmlFor="endDate">Fecha hasta</label>
                        <input
                            type="date"
                            name="endDate"
                            id="endDate"
                            value={filters.endDate}
                            onChange={handleFilterChange}
                            className="border p-2 rounded w-full"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={clearFilters}
                        className="p-2 bg-gray-800 text-white rounded hover:bg-gray-600 transition duration-200 ease-out w-full md:w-auto drop-shadow-[2px_3px_3px_rgba(0,0,0,0.3)]"
                    >
                        Limpiar Filtros
                    </button>
                </form>

                <ul className="w-full max-w-4xl bg-white drop-shadow-[3px_3px_3px_rgba(0,0,0,0.3)] ">
                    {reports.map((report) => (
                        <li key={report.id} className="border-b p-4 hover:bg-gray-100">
                            <div className="flex justify-between items-center">
                                <Link href={`/reports/${report.id}`} className="hover:text-blue-500 hover:underline">
                                    ID: {report.id} - {report.title}
                                </Link>
                                <span className="text-gray-500">
                                    {report.incidencia} - {new Date(report.date).toLocaleDateString()}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </MainLayout>
    );
};

export default ConsultReport;

