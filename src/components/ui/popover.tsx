
import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> & {
    showOnHover?: boolean;
  }
>(({ showOnHover, ...props }, ref) => {
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = React.useCallback(() => {
    if (showOnHover) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setOpen(true);
    }
  }, [showOnHover]);

  const handleMouseLeave = React.useCallback(() => {
    if (showOnHover) {
      timeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, 200);
    }
  }, [showOnHover]);

  // Modified component to use controlled open state
  return (
    <PopoverPrimitive.Root 
      open={showOnHover ? open : props.open} 
      onOpenChange={showOnHover ? undefined : props.onOpenChange}
      {...props}
    />
  );
});

Popover.displayName = "Popover";

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> & {
    asChild?: boolean;
    showOnHover?: boolean;
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const context = React.useContext(PopoverContext);
  
  const handleMouseEnter = () => {
    if (showOnHover && context?.handleMouseEnter) {
      context.handleMouseEnter();
    }
  };

  const handleMouseLeave = () => {
    if (showOnHover && context?.handleMouseLeave) {
      context.handleMouseLeave();
    }
  };

  // Use the Slot component when asChild is true
  const Comp = asChild ? PopoverPrimitive.Trigger : "button";

  return (
    <PopoverPrimitive.Trigger
      ref={ref}
      className={className}
      {...props}
      asChild={true}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-state={context?.open ? "open" : "closed"}
    >
      <Comp
        {...(asChild ? {} : props)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </PopoverPrimitive.Trigger>
  );
});

PopoverTrigger.displayName = "PopoverTrigger";

// Create a context to share state between components
type PopoverContextType = {
  open?: boolean;
  handleMouseEnter?: () => void;
  handleMouseLeave?: () => void;
};

const PopoverContext = React.createContext<PopoverContextType | null>(null);

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    showOnHover?: boolean;
  }
>(({ className, align = "center", sideOffset = 4, showOnHover = false, ...props }, ref) => {
  const context = React.useContext(PopoverContext);
  
  const handleMouseEnter = () => {
    if (showOnHover && context?.handleMouseEnter) {
      context.handleMouseEnter();
    }
  };
  
  const handleMouseLeave = () => {
    if (showOnHover && context?.handleMouseLeave) {
      context.handleMouseLeave();
    }
  };

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
});

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
