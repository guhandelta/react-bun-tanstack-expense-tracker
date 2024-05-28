import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "noflex noh-10 now-full norounded-md noborder noborder-input nobg-background nopx-3 nopy-2 notext-sm noring-offset-background file:noborder-0 file:nobg-transparent file:notext-sm file:nofont-medium placeholder:notext-muted-foreground focus-visible:nooutline-none focus-visible:noring-2 focus-visible:noring-ring focus-visible:noring-offset-2 disabled:nocursor-not-allowed disabled:noopacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
