import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { features } from '@/constants/home'

export function FeaturesSection() {
  return (
    <section id="resources" className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Thrive
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Comprehensive resources designed to support and empower individuals
            in every aspect of life.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="group border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card backdrop-blur-sm transition-all"
            >
              <CardHeader>
                <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{feature.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
