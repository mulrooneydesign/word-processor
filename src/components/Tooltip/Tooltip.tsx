import { useRef, useEffect, useState, useLayoutEffect } from 'react';
import './Tooltip.css';

export enum Position {
  TOP = 'top',
  BOTTOM = 'bottom',
}

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: Position;
}

export default function Tooltip({
  text,
  children,
  position = Position.BOTTOM,
}: TooltipProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const toolTipTextRef = useRef<HTMLDivElement | null>(null);

  const [child, setChild] = useState({ x: 0, y: 0, height: 0, width: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (ref.current === null) return;

    const firstChild = ref.current.firstChild;

    if (!(firstChild instanceof HTMLElement)) return;

    const height = firstChild.offsetHeight;
    const width = firstChild.offsetWidth;

    const x = firstChild.getBoundingClientRect().x;
    const y = firstChild.getBoundingClientRect().y;

    setChild({ x, y, height, width });

    return () => {
      setChild({ x: 0, y: 0, height: 0, width: 0 });
    };
  }, []);

  const onMouseEnterHandler = () => {
    setVisible((state) => !state);
  };

  useLayoutEffect(() => {
    const { x, y, height, width } = child;

    if (toolTipTextRef.current !== null) {
      const OFFSET = 10;

      const { offsetWidth } = toolTipTextRef.current;

      if (position === Position.BOTTOM) {
        toolTipTextRef.current.style.top = `${y + height + OFFSET}px`;
        toolTipTextRef.current.style.left = `${x - offsetWidth / 4}px`;
      }

      if (position === Position.TOP) {
        toolTipTextRef.current.style.top = `${y - height}px`;
        toolTipTextRef.current.style.left = `${x - offsetWidth / 4}px`;
      }
    }
  }, [child, position, visible]);

  return (
    <div
      ref={ref}
      className="tooltip"
      data-testid="tooltip"
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseEnterHandler}>
      {children}
      {visible && (
        <div ref={toolTipTextRef} className="tooltipText">
          {text}
        </div>
      )}
    </div>
  );
}
