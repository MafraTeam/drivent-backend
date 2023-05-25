import { notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository';

async function checkEnrollmentTicket(userId: number) {
  //verificar pagamento, enrollment, verificar se a modalidade é online
}

async function getActivities(userId: number) {
  const activities = await activitiesRepository.findDaysWithActivities();

  if (!activities) throw notFoundError();

  return activities;
}

async function getActivitiesByDay(userId: number, day: string) {
  const activities = await activitiesRepository.findActivitiesByDay(day);

  if (!activities) throw notFoundError();

  return activities;
}

async function registerEnrollActivity(userId: number, activityId: number) {
  const register = await activitiesRepository.create(userId, activityId);

  if (!register) throw notFoundError();

  return register;
}

const activitiesService = {
  getActivities,
  getActivitiesByDay,
  registerEnrollActivity,
};

export default activitiesService;
