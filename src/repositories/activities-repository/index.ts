import { prisma } from '@/config';
import { EventosPorDia } from '@/protocols';

async function findDaysWithActivities() {
  const activities = await prisma.activity.findMany();

  function getDiaSemana(data: Date): string {
    const diasSemana = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ];
    const dia = data.getDay();
    return diasSemana[dia];
  }

  const eventosComDiaSemana = activities.map((evento) => {
    const startDate = new Date(evento.startDate);
    const diaSemana = getDiaSemana(startDate);
    return { ...evento, diaSemana };
  });

  const eventosPorDia: EventosPorDia[] = [];

  for (const evento of eventosComDiaSemana) {
    const { startDate, diaSemana } = evento;
    // const dataFormatada = new Date(startDate).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
    const data = new Date(startDate);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = String(data.getFullYear());
    const dataFormatada = `${diaSemana}, ${dia}-${mes}-${ano}`;
    const primeiraLetraMaiuscula = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

    let diaExistente = eventosPorDia.find((dia) => dia.dataFormatada === primeiraLetraMaiuscula);

    if (!diaExistente) {
      diaExistente = {
        dataFormatada: primeiraLetraMaiuscula,
        activities: [],
      };
      eventosPorDia.push(diaExistente);
    }

    diaExistente.activities.push(evento);
  }

  return eventosPorDia;
}

async function findActivitiesByDay(userId: number, day: string) {
  const activities = await prisma.activity.findMany();

  const activitiesWithSubscription = [];

  for (const activity of activities) {
    const isSubscribed = await prisma.activityRecords.findFirst({
      where: {
        userId: userId,
        activityId: activity.id,
      },
    });

    const ActivityWithSubscription = {
      ...activity,
      isSubscribed: Boolean(isSubscribed),
    };

    activitiesWithSubscription.push(ActivityWithSubscription);
  }

  const isoDate = day.split('-').reverse().join('-');

  const filteredActivities = activitiesWithSubscription.filter((activity) => {
    const startDate = activity.startDate.toISOString().split('T')[0];
    return startDate === isoDate;
  });

  return filteredActivities;
}

async function create(userId: number, activityId: number) {
  return prisma.activityRecords.create({
    data: {
      userId: userId,
      activityId: activityId,
    },
  });
}
const activitiesRepository = {
  findDaysWithActivities,
  findActivitiesByDay,
  create,
};

export default activitiesRepository;
