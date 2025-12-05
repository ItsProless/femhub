import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <div className="border-primary/20 from-primary/5 rounded-2xl border bg-linear-to-b to-transparent p-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Join Our Community?
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg">
            Connect with thousands of individuals sharing experiences, advice,
            and support on Femhub.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2">
              Browse Resources
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Join Community
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
