import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const incidencia = searchParams.get("incidencia") || undefined;
    const startDate = searchParams.get("startDate") || undefined;
    const endDate = searchParams.get("endDate") || undefined;

    const whereClause = {};

    if (incidencia) {
      whereClause.incidencia = incidencia;
    }

    if (startDate && endDate) {
      whereClause.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const informes = await prisma.informe.findMany({
      where: whereClause,
      select: {
        id: true,
        title: true,
        date: true,
        incidencia: true,
      },
    });

    return new Response(JSON.stringify(informes), { status: 200 });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return new Response(JSON.stringify({ error: 'Error fetching reports' }), { status: 500 });
  }
}
