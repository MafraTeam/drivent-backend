import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { enrollActivityForUser, listActivitiesByDay, listDayWithActivities } from '@/controllers';

const activitiesRouter = Router();

activitiesRouter
  .all('/*', authenticateToken)
  .get('/', listDayWithActivities)
  .get('/:activityDay', listActivitiesByDay)
  .post('/', enrollActivityForUser);

export { activitiesRouter };
