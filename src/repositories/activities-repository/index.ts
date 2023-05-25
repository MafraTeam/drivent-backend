import { prisma } from '@/config';

async function findDaysWithActivities() {
  return 'Isso retorna os dias que vai ter atividade';
}

async function findActivitiesByDay(day: string) {
  return 'Isso retorna as atividades do dia';
}

async function create(userId: number, activityId: number) {
  return 'Isso retorna o id feito na tabela de ActivityRecords';
}
const activitiesRepository = {
  findDaysWithActivities,
  findActivitiesByDay,
  create,
};

export default activitiesRepository;
