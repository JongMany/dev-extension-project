"use client";

import useGetOthersTask from "@/app/(main)/profile/_hooks/useGetOthersTask";
import moment from "moment";
import React from "react";
import { momentLocalizer } from "react-big-calendar";
import TaskCalendar from "@components/profile/calendar/TaskCalendar";

type Props = {
  email: string;
};

export default function SharedCalendarContainer({ email }: Props) {
  const { data } = useGetOthersTask(email);
  const tasks =
    data?.tasks.map((task, idx) => ({
      id: task._id,
      start: new Date(task.dueDate),
      end: new Date(task.dueDate),
      title: `${task.projectName}-${task.task}`,
      resourceId: idx + 1,
      isCompleted: task.isCompleted,
    })) || [];

  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  return (
    <section>
      <h4>일정</h4>
      <TaskCalendar localizer={localizer} tasks={tasks} />
    </section>
  );
}
