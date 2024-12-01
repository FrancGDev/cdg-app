'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ReportDetail = ({ params }) => {
    const { id } = params;
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await fetch(`/api/reports/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener el informe');
                }
                const data = await response.json();
                setReport(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [id]);

    const handleBack = () => {
        router.push('/consultReport');
    };

    const handlePrint = () => {
        window.print();
    };

    if (loading) return <p className='text-center text-2xl p-10'>Cargando informe...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-col min-h-screen">
            <header className="w-full bg-blue-950 text-white py-2 flex items-center justify-between relative ">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-red-500 to-orange-500"></div>

                <div className="pl-4">
                    <Image src="/CDGGOBARLOGO-1-300x98.png" alt="Logo" width={150} height={96} className="mr-4" />
                </div>

                <h1 className="text-center text-xl font-bold flex-1">Informe Centro De Monitoreo</h1>
            </header>

            <section className="p-4 h-full w-full flex flex-col items-start max-w-4xl mx-auto flex-1">
                <button onClick={handleBack} className="flex items-center mb-4 text-blue-600 hover:underline no-print">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver a la lista
                </button>
                <h1 className="text-3xl font-bold mb-4">{report.title}</h1>
                <p className="text-gray-600 mb-2">Fecha del hecho: {new Date(report.date).toLocaleDateString()}</p>
                <p className="text-gray-600 mb-4">Autor del informe: {report.author.name}</p>
                <div className="prose">
                    <div dangerouslySetInnerHTML={{ __html: report.content }} />
                </div>
                <div className="py-4 w-full">
                    <button
                        onClick={handlePrint}
                        className="w-full p-2 bg-gradient-to-r from-purple-500 via-red-500 to-orange-500 rounded text-white font-medium drop-shadow-[2px_4px_0px_rgba(0,0,0,0.8)] transition duration-200 ease-out no-print"
                    >
                        Imprimir Informe
                    </button>
                </div>
            </section>

            <footer className="w-full bg-blue-950 text-neutral-400 py-4 text-center mt-10">
                <p className="text-sm">© {new Date().getFullYear()} Centro De Monitoreo - Municipalidad De Cañada De Gómez.</p>
            </footer>
        </div>
    );
};

export default ReportDetail;
