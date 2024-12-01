import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
    const { id } = params; // Extraemos el ID del informe desde la URL.

    try {
        const report = await prisma.informe.findUnique({
            where: {
                id: parseInt(id), // Buscamos el informe por su ID.
            },
            select: {
                id: true,
                title: true,
                content: true,  // Contenido del informe
                date: true,
                author: {
                    select: {
                        name: true,  // Obtenemos el nombre del autor desde la tabla User.
                    },
                },
            },
        });

        if (!report) {
            return NextResponse.json({ error: 'Informe no encontrado' }, { status: 404 });
        }

        return NextResponse.json(report, { status: 200 });
    } catch (error) {
        console.error("Error fetching report:", error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
