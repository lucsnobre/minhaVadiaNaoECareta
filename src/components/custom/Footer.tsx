export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-2 text-center md:flex-row md:justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} TuneFlow. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          Powered by <span className="font-semibold text-primary">Next.js</span> and <span className="font-semibold text-primary">Tailwind CSS</span>.
        </p>
      </div>
    </footer>
  );
}
