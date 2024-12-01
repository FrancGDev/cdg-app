"use client"

import Image from 'next/image';
import MainLayout from "../components/MainLayout";


export default function DashboardPage() {
    return (
        <MainLayout >

            <div className="min-h-screen w-full bg-gradient-to-r from-purple-500 via-red-500 to-orange-500 flex items-center justify-center">
                <div className="relative w-[70%] h-auto ">


                    <Image
                        src="/ESCUDO NUEVO MUNI BLANCO.png"
                        alt="Imagen de fondo"
                        layout="responsive"
                        width={1000}
                        height={600}
                        className="object-cover"
                    />
                </div>
            </div>

        </MainLayout>

    )
}