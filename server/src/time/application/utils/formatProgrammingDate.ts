import {format} from "date-fns";
import {ko} from "date-fns/locale";

export function formatProgrammingDate(date: Date) {
  return {
    fullDateTime: format(date, 'yyyy-MM-dd HH:mm:ss', { locale: ko }),
    programDay: format(date, 'yyyy-MM-dd', { locale: ko }),
  };
}