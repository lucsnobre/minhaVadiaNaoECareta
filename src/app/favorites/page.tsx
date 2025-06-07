"use client";

import { useEffect, useState, Suspense } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { getMultipleSongsByIds } from '@/lib/api';
import type { Song } from '@/lib/types';
import { SongCard } from '@/components/custom/SongCard';
import { LoadingSpinner } from '@/components/custom/LoadingSpinner';
import { ErrorMessage } from '@/components/custom/ErrorMessage';
import { HeartOff } from 'lucide-react';

function FavoritesContent() {
  const { favoriteIds, isLoaded: favoritesLoaded } = useFavorites();
  const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (favoritesLoaded) {
      if (favoriteIds.length > 0) {
        const fetchFavoriteSongs = async () => {
          setIsLoading(true);
          setError(null);
          try {
            const songs = await getMultipleSongsByIds(favoriteIds);
            setFavoriteSongs(songs);
          } catch (e) {
            console.error("Failed to fetch favorite songs:", e);
            setError("Could not load your favorite songs. Please try again later.");
          } finally {
            setIsLoading(false);
          }
        };
        fetchFavoriteSongs();
      } else {
        setFavoriteSongs([]);
        setIsLoading(false);
      }
    }
  }, [favoriteIds, favoritesLoaded]);

  if (!favoritesLoaded || isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (favoriteSongs.length === 0) {
    return (
      <div className="text-center py-10">
        <HeartOff className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-headline text-2xl font-bold mb-2">No Favorites Yet</h1>
        <p className="text-muted-foreground">
          Start exploring and add some songs to your favorites!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="font-headline text-3xl font-bold">Your Favorite Songs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favoriteSongs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}


export default function FavoritesPage() {
  return (
    // Suspense helps if useFavorites itself has async parts or if child components suspend
    <Suspense fallback={<LoadingSpinner />}>
      <FavoritesContent />
    </Suspense>
  );
}

export const metadata = {
  title: 'Your Favorites | TuneFlow',
  description: 'View and manage your favorite songs on TuneFlow.',
};
