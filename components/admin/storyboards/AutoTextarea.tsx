"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, type TextareaHTMLAttributes } from "react";

/** Textarea that grows with its content. */
const AutoTextarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function AutoTextarea(props, ref) {
    const inner = useRef<HTMLTextAreaElement>(null);
    useImperativeHandle(ref, () => inner.current!);
    useEffect(() => {
      const el = inner.current;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight + 2}px`;
    }, [props.value]);
    return <textarea rows={2} {...props} ref={inner} />;
  },
);

export default AutoTextarea;
