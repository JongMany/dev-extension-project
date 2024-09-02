

import { CalendarTask } from "@/entities/task";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { Calendar, DateLocalizer, Views } from "react-big-calendar";
import { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import CalendarEvent from "@components/profile/calendar/CalendarEvent";
import {useUpdateTaskDueDate} from "@hooks/profile/useUpdateTaskDueDate";

type Props = {
  localizer: DateLocalizer;
  tasks: CalendarTask[];
};

export default function TaskCalendar({ localizer, tasks }: Props) {
  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1972, 0, 1, 8),
    }),
    []
  );
  const [date, setDate] = useState(defaultDate);

  const { mutate: updateTaskDueDate } = useUpdateTaskDueDate();

  /* 날짜 변경 */
  const taskMoveHandler = ({
    event,
    start,
    end,
  }: EventInteractionArgs<any>) => {
    const changed = start;
    const changedDueDate = format(changed, "yyyy-MM-dd");
    const taskId = event.id;
    // console.log(changedDueDate, event);
    updateTaskDueDate({
      taskId,
      updatedDate: changedDueDate,
    });
  };
  const onNavigate = (date: Date) => {
    setDate(new Date(date));
  };

  /* 티켓 스타일 지정 */
  const eventStyles = (
    event: any,
    start: Date,
    end: Date,
    isSelected: boolean
  ) => {
    return {
      style: {
        backgroundColor: event.isCompleted
          ? "rgba(0, 255,0,0.6)"
          : "rgba(255, 0, 0, 0.3)",
        borderRadius: "4px",
        border: "none",
      },
    };
  };

  return (
    <div className="h-[700px]">
      <Calendar
        localizer={localizer}
        defaultDate={defaultDate}
        date={date}
        defaultView={Views.MONTH}
        views={[Views.MONTH]}
        events={tasks}
        scrollToTime={scrollToTime}
        popup
        onNavigate={onNavigate}
        eventPropGetter={eventStyles}
        // titleAccessor={(event: any) => {
        //   if (event.isCompleted) return `✅ ${event.title}`;
        //   return event.title;
        // }}
        components={{
          event: CalendarEvent,
        }}
      />
    </div>
  );
}
