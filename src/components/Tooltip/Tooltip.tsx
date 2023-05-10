// Tooltip component largely based on: https://codesandbox.io/s/xenodochial-grass-js3bo9?file=/src/styles.css
import React from 'react';

import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  FloatingPortal,
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';

import './Tooltip.css';

interface TooltipOptions {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useTooltip({
  initialOpen = false,
  placement = 'top',
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: TooltipOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(6),
      flip({
        fallbackAxisSideDirection: 'start',
        padding: 5,
      }),
      shift({ padding: 5 }),
    ],
  });

  const context = data.context;

  const hover = useHover(context, {
    move: false,
    enabled: controlledOpen == null,
  });
  const focus = useFocus(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const interactions = useInteractions([hover, focus, dismiss, role]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
    }),
    [open, setOpen, interactions, data]
  );
}

type ContextType = ReturnType<typeof useTooltip> | null;

const TooltipContext = React.createContext<ContextType>(null);

export const useTooltipContext = () => {
  const context = React.useContext(TooltipContext);

  if (context == null) {
    throw new Error('Tooltip components must be wrapped with <Tooltip />');
  }

  return context;
};

function TooltipContainer({
  children,
  ...options
}: { children: React.ReactNode } & TooltipOptions) {
  const tooltip = useTooltip(options);
  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  );
}

const TooltipTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & { asChild?: boolean; className?: string }
>(function TooltipTrigger(
  { children, asChild = false, className, ...props },
  propRef
) {
  const context = useTooltipContext();
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        'data-state': context.open ? 'open' : 'closed',
      })
    );
  }

  return (
    <div
      ref={ref}
      className={`tooltip-trigger ${className ? className : ''}`}
      data-state={context.open ? 'open' : 'closed'}
      {...context.getReferenceProps(props)}>
      {children}
    </div>
  );
});

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function TooltipContent(props, propRef) {
  const context = useTooltipContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!context.open) return null;

  return (
    <FloatingPortal>
      <div
        style={context.floatingStyles}
        ref={ref}
        {...context.getFloatingProps(props)}
      />
    </FloatingPortal>
  );
});

export default function Tooltip({
  children,
  text,
  className,
}: {
  children: React.ReactNode;
  text: string;
  className?: string;
}) {
  return (
    <TooltipContainer>
      <TooltipTrigger className={`${className ? className : ''}`}>
        {children}
      </TooltipTrigger>
      <TooltipContent className="tooltip">{text}</TooltipContent>
    </TooltipContainer>
  );
}
