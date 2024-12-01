import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user.id) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const authorId = session.user.id;

        const body = await request.json();
        const { title, description, date, incidencia } = body;


        if (!title || !description || !date || !incidencia) {
            return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
        }

        const newInforme = await prisma.informe.create({
            data: {
                title,
                content: description,
                date: date,
                authorId,
                incidencia
            },
        });

        return NextResponse.json(newInforme, { status: 201 });

    } catch (error) {
        console.error("Error al crear el informe:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}


export const dynamic = 'force-dynamic';

export const config = {
    api: {
        responseLimit: false,
    },
}