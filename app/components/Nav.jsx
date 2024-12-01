'use client'

import { signOut } from "next-auth/react";
import Link from 'next/link';


export default function Nav() {
    return (
        <div className="h-screen w-60 bg-blue-950 text-white top-0 left-0 flex flex-col justify-between drop-shadow-[0_0px_3px_rgba(0,0,0,0.9)] z-20 fixed">
            <div>
                <div className="text-center pt-2">
                    <Link href="/dashboard" className="text-7xl font-black bg-gradient-to-r from-purple-700 via-red-600 to-orange-500 bg-clip-text text-transparent">CDG</Link>
                    <h3 className="">Centro De Monitoreo</h3>
                </div>
                <nav className="mt-10 mx-2">
                    <Link href="/makeReport" className="block py-3 px-4 my-4 rounded transition duration-100 bg-blue-800 drop-shadow-[0_3px_3px_rgba(0,0,0,0.3)] hover:scale-[1.02]">
                        Realizar Informe
                    </Link>
                    <Link href="/consultReport" className="block py-3 px-4 my-4 rounded transition duration-100 bg-blue-800 drop-shadow-[0_3px_3px_rgba(0,0,0,0.3)]  hover:scale-[1.02]">
                        Consultar Informes
                    </Link>
                    <Link href="/makeReport" className="block py-3 px-4 my-4 rounded transition duration-100 bg-blue-800 drop-shadow-[0_3px_3px_rgba(0,0,0,0.3)]  hover:scale-[1.02]">
                        Inventario
                    </Link>
                    <Link href="/makeReport" className="block py-3 px-4 my-4 rounded transition duration-100 bg-blue-800 drop-shadow-[0_3px_3px_rgba(0,0,0,0.3)]  hover:scale-[1.02]">
                        Mantenimiento
                    </Link>
                </nav>
            </div>
            <div>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        signOut({ callbackUrl: '/login' });
                    }}
                    className="block py-3 px-4 m-2 rounded text-xl transition duration-100 bg-red-500 drop-shadow-[0_3px_3px_rgba(0,0,0,0.3)] hover:scale-[1.02]"
                >
                    Cerrar Sesión
                </a>

            </div>
        </div>
    );
};
