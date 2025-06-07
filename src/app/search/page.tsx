"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { searchItems } from '@/lib/api';
import type { Song, Album, Artist, SearchResults } from '@/lib/types';
import { SongCard } from '@/components/custom/SongCard';
import { AlbumCard } from '@/components/custom/AlbumCard';
import { ArtistCard } from '@/components/custom/ArtistCard';
import { LoadingSpinner } from '@/components/custom/LoadingSpinner';
import { ErrorMessage } from '@/components/custom/ErrorMessage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  
  const [results, setResults] = useState<SearchResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        setIsLoading(true);
        setError(null);
        setResults(null);
        try {
          const data = await searchItems(query, 'all');
          setResults(data);
        } catch (e) {
          console.error("Search failed:", e);
          setError("Failed to fetch search results. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchResults();
    } else {
      setResults(null); // Clear results if no query
    }
  }, [query]);

  if (!query) {
    return <p className="text-muted-foreground text-center py-8">Enter a search term to find music.</p>;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!results || (results.songs.length === 0 && results.albums.length === 0 && results.artists.length === 0)) {
    return <p className="text-muted-foreground text-center py-8">No results found for "{query}".</p>;
  }

  return (
    <div className="space-y-8">
      <h1 className="font-headline text-3xl font-bold">Search Results for "{query}"</h1>
      <Tabs defaultValue="songs" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="songs" disabled={results.songs.length === 0}>Songs ({results.songs.length})</TabsTrigger>
          <TabsTrigger value="albums" disabled={results.albums.length === 0}>Albums ({results.albums.length})</TabsTrigger>
          <TabsTrigger value="artists" disabled={results.artists.length === 0}>Artists ({results.artists.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="songs">
          {results.songs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.songs.map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No songs found.</p>
          )}
        </TabsContent>
        
        <TabsContent value="albums">
          {results.albums.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {results.albums.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No albums found.</p>
          )}
        </TabsContent>

        <TabsContent value="artists">
          {results.artists.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {results.artists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No artists found.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SearchResultsContent />
    </Suspense>
  )
}
