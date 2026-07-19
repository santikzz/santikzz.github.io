import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme/theme-provider"
import { ThemeToggleButton, useThemeTransition } from "@/components/theme/theme-transition"
import { useCallback, useEffect, useState } from "react"

export function ThemeToggle() {

  const { theme, setTheme } = useTheme()
  const { startTransition } = useThemeTransition()
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeToggle = useCallback(() => {
    const newMode = theme === 'dark' ? 'light' : 'dark'
    startTransition(() => {
      setTheme(newMode)
    })
  }, [setTheme, startTransition])

  if (!mounted) {
    return null
  }

  // Normalize theme: Theme provider may return 'system' - map that to undefined
  // so `ThemeToggleButton` which expects 'dark' | 'light' | undefined accepts it.
  const currentTheme: 'dark' | 'light' | undefined = theme === 'system' ? undefined : (theme as 'dark' | 'light');

  // return (
  //   <Button
  //     variant="ghost"
  //     size="icon"
  //     onClick={() => setTheme(theme === "light" ? "dark" : "light")}
  //     className="hover:bg-primary/10 hover:text-primary transition-colors"
  //   >
  //     <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
  //     <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
  //     <span className="sr-only">Toggle theme</span>
  //   </Button>
  // )

  return (
    <ThemeToggleButton
      theme={currentTheme}
      onClick={handleThemeToggle}
      variant="circle"
      start="top-right"
    />
  )

}