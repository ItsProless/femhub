import Image from 'next/image'
import Link from 'next/link'
import { Copyright } from '@/components/shared/copyright-text'
import { footerLinks } from '@/constants/home'
import GithubIcon from '../shared/social/github-icon'
import RedditIcon from '../shared/social/reddit-icon'
import DiscordIcon from '../shared/social/discord-icon'

export function Footer() {
  return (
    <footer className="border-border/50 bg-card/30 border-t">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Femhub Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-xl font-bold">Femhub</span>
            </div>
            <p className="text-muted-foreground mt-4 text-sm">
              Your hub for feminine resources, wellness, and community support.
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <GithubIcon className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <DiscordIcon className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <RedditIcon className="h-5 w-5" />
                <span className="sr-only">Reddit</span>
              </Link>
            </div>
          </div>
          <div>
            {footerLinks.map((group) => (
              <div key={group.id}>
                <h3 className="text-muted-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
                  {group.title}
                </h3>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={link.href}
                        className="text-foreground/80 hover:text-primary text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-border/50 mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <Copyright license="MIT" name="Proless" className="flex gap-2" />
          <p className="text-muted-foreground text-sm">
            Empowering femininity, one resource at a time.
          </p>
        </div>
      </div>
    </footer>
  )
}
