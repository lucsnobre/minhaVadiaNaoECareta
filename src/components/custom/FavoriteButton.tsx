"use client";

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  songId: string;
}

export function FavoriteButton({ songId }: FavoriteButtonProps) {
  const { favoriteIds, addFavorite, removeFavorite, isLoaded } = useFavorites();
  const { toast } = useToast();
  const isFavorited = favoriteIds.includes(songId);

  if (!isLoaded) {
    // Prevent hydration mismatch or flash of incorrect state
    return <Button variant="ghost" size="icon" disabled className="w-8 h-8 opacity-50"><Heart className="h-4 w-4" /></Button>;
  }

  const toggleFavorite = () => {
    if (isFavorited) {
      removeFavorite(songId);
      toast({ title: "Removed from favorites", variant: "default" });
    } else {
      addFavorite(songId);
      toast({ title: "Added to favorites", variant: "default" });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleFavorite}
      className={cn("w-8 h-8 hover:bg-accent/20", isFavorited ? "text-accent" : "text-muted-foreground hover:text-accent")}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart className={cn("h-4 w-4", isFavorited && "fill-current")} />
    </Button>
  );
}
