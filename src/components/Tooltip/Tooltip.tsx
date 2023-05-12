import { useRef, useEffect, useState } from 'react';
import adjustElementPositionToWindow from '../../utils/adjustElementPositionToWindow';
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

  const [child, setChild] = useState({ x: 0, y: 0, height: 0 });
  const [visible, setVisible] = useState(false);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    function handleResize() {
      setTrigger((state) => !state);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ref.current === null) return;

    const firstChild = ref.current.firstChild;

    if (!(firstChild instanceof HTMLElement)) return;

    const height = firstChild.offsetHeight;

    const x = firstChild.getBoundingClientRect().x;
    const y = firstChild.getBoundingClientRect().y;

    setChild({ x, y, height });

    return () => {
      setChild({ x: 0, y: 0, height: 0 });
    };
  }, [trigger]);

  const onMouseEnterHandler = () => {
    setVisible((state) => !state);
  };

  useEffect(() => {
    const { x, y, height } = child;

    if (toolTipTextRef.current !== null) {
      const OFFSET = 10;

      const { offsetWidth } = toolTipTextRef.current;

      if (position === Position.BOTTOM) {
        toolTipTextRef.current.style.top = `${y + height + OFFSET}px`;
        toolTipTextRef.current.style.left = `${x - offsetWidth / 4}px`;

        adjustElementPositionToWindow(toolTipTextRef.current, OFFSET);
      }

      if (position === Position.TOP) {
        toolTipTextRef.current.style.top = `${y - height / 2 - OFFSET}px`;
        toolTipTextRef.current.style.left = `${x - offsetWidth / 4}px`;
        adjustElementPositionToWindow(toolTipTextRef.current, OFFSET);
      }
    }
  }, [child, position, visible, trigger]);

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
