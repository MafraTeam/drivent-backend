import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import activitiesService from '@/services/activities-service';

export async function listDayWithActivities(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;

    const daysWithActivities = await activitiesService.getActivities(userId);

    return res.status(httpStatus.OK).send(daysWithActivities);
  } catch (error) {
    next(error);
  }
}

export async function listActivitiesByDay(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const { activityDay } = req.params as Record<string, string>;

    const activitiesByDay = await activitiesService.getActivitiesByDay(userId, activityDay);

    return res.status(httpStatus.OK).send(activitiesByDay);
  } catch (error) {
    next(error);
  }
}

export async function enrollActivityForUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const { activityId } = req.body as Record<string, number>;

    const enrollUser = await activitiesService.registerEnrollActivity(userId, activityId);

    return res.status(httpStatus.OK).send(enrollUser);
  } catch (error) {
    next(error);
  }
}
