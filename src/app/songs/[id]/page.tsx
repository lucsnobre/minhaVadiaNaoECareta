import Image from 'next/image';
import { getSongById } from '@/lib/api';
import { FavoriteButton } from '@/components/custom/FavoriteButton';
import { AlertTriangle, Music, CalendarDays, Clock, Mic2, Library } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

interface SongPageProps {
  params: { id: string };
}

export default async function SongPage({ params }: SongPageProps) {
  const song = await getSongById(params.id);

  if (!song) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h1 className="font-headline text-2xl font-bold">Song Not Found</h1>
        <p className="text-muted-foreground">The song you are looking for does not exist or could not be loaded.</p>
        <Link href="/" className="mt-4 text-primary hover:underline">Go back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="overflow-hidden shadow-xl">
        <div className="md:flex">
          <div className="md:w-1/3 relative">
            <Image
              src={song.artworkUrl || "https://placehold.co/400x400.png?text=No+Art"}
              alt={`Artwork for ${song.title}`}
              width={400}
              height={400}
              className="w-full h-auto md:h-full object-cover"
              data-ai-hint="album cover song"
            />
          </div>
          <div className="md:w-2/3">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="font-headline text-3xl md:text-4xl">{song.title}</CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">{song.artist}</CardDescription>
                </div>
                <FavoriteButton songId={song.id} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Library className="h-4 w-4 mr-2 text-primary" />
                  <span><strong>Album:</strong> {song.album}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  <span><strong>Duration:</strong> {song.duration}</span>
                </div>
              </div>
              {song.streamUrl && (
                <div className="pt-4">
                  <h3 className="font-semibold mb-2 font-headline">Listen</h3>
                  <audio controls src={song.streamUrl} className="w-full">
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </CardContent>
          </div>
        </div>
      </Card>

      {song.lyrics && (
        <>
          <Separator className="my-8" />
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Lyrics</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-muted-foreground font-body text-sm leading-relaxed">
                {song.lyrics}
              </pre>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

export async function generateMetadata({ params }: SongPageProps) {
  const song = await getSongById(params.id);
  if (!song) {
    return { title: 'Song Not Found' };
  }
  return {
    title: `${song.title} - ${song.artist} | TuneFlow`,
    description: `Details and lyrics for ${song.title} by ${song.artist}.`,
  };
}
