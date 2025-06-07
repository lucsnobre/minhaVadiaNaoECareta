import { getFeaturedSongs, getFeaturedAlbums } from '@/lib/api';
import type { Song, Album } from '@/lib/types';
import { SongCard } from '@/components/custom/SongCard';
import { AlbumCard } from '@/components/custom/AlbumCard';
import { Separator } from '@/components/ui/separator';

export default async function HomePage() {
  let featuredSongs: Song[] = [];
  let featuredAlbums: Album[] = [];
  let error: string | null = null;

  try {
    // Fetch in parallel
    [featuredSongs, featuredAlbums] = await Promise.all([
      getFeaturedSongs(),
      getFeaturedAlbums(),
    ]);
  } catch (e) {
    console.error("Failed to fetch featured content:", e);
    error = "Could not load featured content. Please try again later.";
    // In a real app, you might want to log this error to a monitoring service
  }

  if (error) {
    return <p className="text-destructive text-center py-8">{error}</p>;
  }

  return (
    <div className="space-y-12">
      <section>
        <h1 className="font-headline text-3xl md:text-4xl font-bold mb-6 text-primary">
          Featured Songs
        </h1>
        {featuredSongs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredSongs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No featured songs available at the moment.</p>
        )}
      </section>

      <Separator />

      <section>
        <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6 text-primary">
          Featured Albums
        </h2>
        {featuredAlbums.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No featured albums available at the moment.</p>
        )}
      </section>
    </div>
  );
}
