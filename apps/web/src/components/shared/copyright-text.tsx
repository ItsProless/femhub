'use client'

import { Suspense } from 'react'
import { Skeleton } from '../ui/skeleton'

export function Copyright({
  className,
  license = 'MIT',
  name = 'Proless',
}: {
  className?: string
  license?: string
  name?: string
}) {
  return (
    <Suspense fallback={<Skeleton className="h-4 w-[200px]" />}>
      <span className={className}>
        &copy;
        <CurrentYear /> {license} {name}. All rights reserved.
      </span>
    </Suspense>
  )
}

export function CurrentYear() {
  const currentYear = new Date().getFullYear()
  return <p>{currentYear}</p>
}
