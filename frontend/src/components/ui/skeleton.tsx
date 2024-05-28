import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("noanimate-pulse norounded-md nobg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
