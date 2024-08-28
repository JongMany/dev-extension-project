"use client";
import { useInView, useScroll } from "framer-motion";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
type Props = {};
export default function DescriptionCard({
  children,
}: PropsWithChildren<Props>) {
  const vertMargin = 10;
  const container = useRef<HTMLDivElement>(null);
  const [maxScrollY, setMaxScrollY] = useState(Infinity);
  const [dynamicStyles, setDynamicStyles] = useState({
    scale: 1,
    filter: 0,
  });

  const { scrollY } = useScroll({
    target: container,
  });

  const isInView = useInView(container, {
    margin: `0px 0px -${100 - vertMargin}% 0px`,
    once: true,
  });

  scrollY.on("change", (scrollY) => {
    let animationValue = 1;
    if (scrollY > maxScrollY) {
      animationValue = Math.max(0, 1 - (scrollY - maxScrollY) / 10000);
    }

    setDynamicStyles({
      scale: animationValue,
      filter: (1 - animationValue) * 100,
    });
  });

  useEffect(() => {
    if (isInView) {
      setMaxScrollY(scrollY.get());
    }
  }, [isInView]);

  return (
    <div
      ref={container}
      className="sticky h-[80vh] w-[90vw] bg-neutral-200 rounded-xl overflow-hidden"
      style={{
        top: `${vertMargin}vh`,
        height: `${100 - 2 * vertMargin}vh`,
        scale: dynamicStyles.scale,
        filter: `blur(${dynamicStyles.filter}px)`,
      }}
    >
      {children}
    </div>
  );
}
