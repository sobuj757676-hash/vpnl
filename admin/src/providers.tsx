import { TooltipProvider } from "@/components/ui/tooltip"

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      {children}
    </TooltipProvider>
  )
}
