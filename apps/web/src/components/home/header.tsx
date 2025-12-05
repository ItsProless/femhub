import Image from 'next/image'
import { NavMenu } from '@/components/home/nav-menu'
import ThemeToggle from '@/components/shared/theme-toggle'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="border-border/50 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Femhub Logo"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <div className="flex flex-col">
            <span className="text-lg leading-tight font-bold">Femhub</span>
            <span className="text-muted-foreground hidden text-xs sm:block">
              Fem Resources
            </span>
          </div>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <nav>
            <NavMenu />
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button size="sm" className="hidden sm:inline-flex">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}
