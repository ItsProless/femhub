import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-24 text-center">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[4rem_4rem]" />
        <div className="to-background absolute inset-0 bg-linear-to-b from-transparent via-transparent" />
      </div>
      <div className="border-primary/20 bg-primary/5 text-primary mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm">
        <span className="bg-primary h-2 w-2 animate-pulse rounded-full" />
        Empowering Individuals Everywhere
      </div>
      <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
        Your Hub for{' '}
        <span className="from-primary to-primary/60 bg-linear-to-r bg-clip-text text-transparent">
          Feminine
        </span>{' '}
        Resources
      </h1>
      <p className="text-muted-foreground mt-6 max-w-2xl text-lg text-pretty md:text-xl">
        Discover guides, wellness tips, and community support designed to
        empower and celebrate individuals in all aspects of life.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Button size="lg" className="gap-2 px-8">
          Get Started
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="gap-2 bg-transparent px-8"
        >
          <BookOpen className="h-4 w-4" />
          Explore Resources
        </Button>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
        {[
          { value: '0+', label: 'Guides' },
          { value: '0+', label: 'Community Members' },
          { value: '0+', label: 'Topics' },
          { value: '100%', label: 'Open Source' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-primary text-3xl font-bold md:text-4xl">
              {stat.value}
            </p>
            <p className="text-muted-foreground mt-1 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
