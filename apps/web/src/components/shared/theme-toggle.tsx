'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Toggle } from '@/components/ui/toggle'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <div>
      <Toggle
        className="group data-[state=on]:hover:bg-muted size-9 data-[state=on]:bg-transparent"
        onPressedChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        <MoonIcon
          aria-hidden="true"
          className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
          size={16}
        />
        <SunIcon
          aria-hidden="true"
          className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
          size={16}
        />
      </Toggle>
    </div>
  )
}
