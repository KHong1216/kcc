import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:scale-[1.02] active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[#2D6A9F] text-white shadow-sm hover:bg-[#1E3A8A] hover:shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border-2 border-[#2D6A9F] bg-transparent text-[#2D6A9F] shadow-sm hover:bg-[#E8F4FB] hover:border-[#1E3A8A]",
        secondary:
          "bg-[#E8F4FB] text-[#2D6A9F] shadow-sm hover:bg-[#D1E7F5]",
        ghost: "hover:bg-[#E8F4FB] hover:text-[#2D6A9F]",
        link: "text-[#2D6A9F] underline-offset-4 hover:underline hover:text-[#1E3A8A]",
        gradient:
          "bg-[linear-gradient(90deg,#A8C5F8,#F3C3E6,#FFE6C5)] text-white shadow-lg hover:opacity-90 hover:shadow-xl",
        "gradient-diagonal":
          "bg-koi-gradient-diagonal text-white shadow-lg hover:opacity-90 hover:shadow-xl",
        "gradient-soft":
          "bg-koi-soft text-[#3B2F2F] shadow-sm hover:opacity-90",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
