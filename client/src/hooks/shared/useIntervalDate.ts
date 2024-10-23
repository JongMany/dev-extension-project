import { useDuration } from "@/store/duration/useDuration";
import { getFromDate, getToDate } from "@utils/shared/date/interval";
import { eachDayOfInterval, format } from "date-fns";

export const useIntervalDate = () => {
  const { from, to } = useGetFromToDate();

  const interval = eachDayOfInterval({
    start: from,
    end: to,
  });
  const dates = interval.map((date) => format(date, "yyyy-MM-dd"));

  return dates;
};

export const useGetFromToDate = () => {
  const { duration } = useDuration();
  const from = getFromDate(duration);
  const to = getToDate(duration);
  return { from, to };
};
