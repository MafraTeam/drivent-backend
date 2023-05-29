import { notFoundError } from '@/errors';
import { cannotListActivitiesError } from '@/errors/cannot-list-activities-error';
import activitiesRepository from '@/repositories/activities-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function checkEnrollmentTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote) {
    throw cannotListActivitiesError();
  }
}

async function getActivities(userId: number) {
  await checkEnrollmentTicket(userId);

  const activities = await activitiesRepository.findDaysWithActivities();
  if (!activities) throw notFoundError();

  return activities;
}

async function getActivitiesByDay(userId: number, day: string) {
  await checkEnrollmentTicket(userId);

  const activities = await activitiesRepository.findActivitiesByDay(userId, day);
  if (!activities) throw notFoundError();

  return activities;
}

async function registerEnrollActivity(userId: number, activityId: number) {
  await checkEnrollmentTicket(userId);

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
