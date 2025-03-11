
import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> & {
    asChild?: boolean;
    showOnHover?: boolean;
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (showOnHover) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (showOnHover) {
      timeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, 200);
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
      data-state={open ? "open" : "closed"}
      open={showOnHover ? open : undefined}
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

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    showOnHover?: boolean;
  }
>(({ className, align = "center", sideOffset = 4, showOnHover = false, ...props }, ref) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  
  const handleMouseEnter = () => {
    if (showOnHover && contentRef.current) {
      const trigger = contentRef.current.parentElement?.querySelector('[data-state="open"]');
      if (trigger) {
        trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      }
    }
  };
  
  const handleMouseLeave = () => {
    if (showOnHover && contentRef.current) {
      const trigger = contentRef.current.parentElement?.querySelector('[data-state="open"]');
      if (trigger) {
        trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      }
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
