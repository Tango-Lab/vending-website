import { IEvents } from '@/schema/Event';
import { createEvent, updateEventById } from '@/service/event';

export const handleSubmitCreateEvent = (param: IEvents) => {
  return createEvent(param).catch((err) => {
    if (err?.message) {
      alert(err.message);
    }
    throw err;
  });
};

export const handleSubmitUpdateEvent = (id: string, param: IEvents) => {
  return updateEventById(id, param).catch((err) => {
    if (err?.message) {
      alert(err.message);
    }
    throw err;
  });
};
