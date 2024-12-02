import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
    const { id } = params;

    try {
        const report = await prisma.informe.findUnique({
            where: {
                id: parseInt(id),
            },
            select: {
                id: true,
                title: true,
                content: true,
                date: true,
                author: {
                    select: {
                        name: true,
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

export async function PUT(req, { params }) {
    const { id } = params;
    const body = await req.json();
    const { title, description, date, incidencia } = body;

    try {
        const updatedReport = await prisma.informe.update({
            where: { id: parseInt(id) },
            data: { title, content: description, date: new Date(date), incidencia },
        });

        return NextResponse.json(updatedReport, { status: 200 });
    } catch (error) {
        console.error('Error al actualizar el informe:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}