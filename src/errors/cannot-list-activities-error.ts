import { ApplicationError } from '@/protocols';

export function cannotListActivitiesError(): ApplicationError {
  return {
    name: 'CannotListActivitiesError',
    message: 'Cannot List Activities',
  };
}
