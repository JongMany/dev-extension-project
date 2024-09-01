"use client";

import { useModal } from "@/lib/useModal";
import { useRef } from "react";
import { Overlay, Tooltip } from "react-bootstrap";

type Props = {
  event: any;
};
export default function CalendarEvent({ event }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { openModal, isOpen, closeModal } = useModal();
  const background = event.isCompleted
    ? "bg-[rgba(0,255,0,0.6)]"
    : "bg-[rgba(255,0,0,0.3)]";

  return (
    <div ref={ref} onMouseLeave={closeModal}>
      <p onMouseOver={openModal}>
        <span className="mr-[6px]">{event.isCompleted ? "✅" : "❌"}</span>
        <span>{event.title}</span>
      </p>
      <Overlay
        rootClose={true}
        target={ref.current}
        show={isOpen}
        placement="top"
        onHide={closeModal}
      >
        <Tooltip id="test">
          <div
            className={`px-2 py-1 rounded-lg ${background} relative flex flex-col items-center bottom-5 text-white`}
          >
            <p>{event.title}</p>
            <p>완료여부-{event.isCompleted ? "✅" : "❌"}</p>
          </div>
        </Tooltip>
      </Overlay>
    </div>
  );
}
