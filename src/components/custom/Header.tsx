import Link from 'next/link';
import { Music2 } from 'lucide-react';
import { DarkModeToggle } from './DarkModeToggle';
import { SearchBar } from './SearchBar';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Music2 className="h-7 w-7 text-primary" />
          <span className="font-headline text-2xl font-bold text-primary">TuneFlow</span>
        </Link>
        
        <div className="flex-1 mx-4 md:mx-8 max-w-md">
          <SearchBar />
        </div>

        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/favorites">Favorites</Link>
          </Button>
          <DarkModeToggle />
        </nav>
      </div>
    </header>
  );
}
