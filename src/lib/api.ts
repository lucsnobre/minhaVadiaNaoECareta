import type { Song, Album, Artist, SearchResults } from './types';
import { API_BASE_URL } from './constants';

// MOCK DATA - Replace with actual API calls

const mockSongs: Song[] = [
  { id: '1', title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: '5:55', artworkUrl: 'https://placehold.co/300x300.png?text=Song1', lyrics: 'Is this the real life? Is this just fantasy?...' },
  { id: '2', title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV', duration: '8:02', artworkUrl: 'https://placehold.co/300x300.png?text=Song2' },
  { id: '3', title: 'Shape of You', artist: 'Ed Sheeran', album: '÷ (Divide)', duration: '3:53', artworkUrl: 'https://placehold.co/300x300.png?text=Song3' },
  { id: '4', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', artworkUrl: 'https://placehold.co/300x300.png?text=Song4' },
  { id: '5', title: 'Hotel California', artist: 'Eagles', album: 'Hotel California', duration: '6:30', artworkUrl: 'https://placehold.co/300x300.png?text=Song5' },
  { id: '6', title: ' Billie Jean', artist: 'Michael Jackson', album: 'Thriller', duration: '4:54', artworkUrl: 'https://placehold.co/300x300.png?text=Song6' },
];

const mockAlbums: Album[] = [
  { id: 'alb1', title: 'Thriller', artist: 'Michael Jackson', artworkUrl: 'https://placehold.co/300x300.png?text=Album1', releaseDate: '1982-11-30', songs: mockSongs.filter(s => s.album === 'Thriller') },
  { id: 'alb2', title: 'The Dark Side of the Moon', artist: 'Pink Floyd', artworkUrl: 'https://placehold.co/300x300.png?text=Album2', releaseDate: '1973-03-01', songs: [] },
  { id: 'alb3', title: 'Abbey Road', artist: 'The Beatles', artworkUrl: 'https://placehold.co/300x300.png?text=Album3', releaseDate: '1969-09-26', songs: [] },
];

const mockArtists: Artist[] = [
  { id: 'art1', name: 'Queen', genre: 'Rock', imageUrl: 'https://placehold.co/300x300.png?text=Artist1', bio: 'British rock band formed in London in 1970.' },
  { id: 'art2', name: 'Ed Sheeran', genre: 'Pop', imageUrl: 'https://placehold.co/300x300.png?text=Artist2', bio: 'English singer-songwriter.' },
  { id: 'art3', name: 'The Weeknd', genre: 'R&B/Pop', imageUrl: 'https://placehold.co/300x300.png?text=Artist3', bio: 'Canadian singer, songwriter, and record producer.' },
];

// API Fetching Functions (Simulated)

async function simulateFetch<T>(data: T, delay: number = 500): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
}

export async function getFeaturedSongs(): Promise<Song[]> {
  // In a real app: return fetch(`${API_BASE_URL}/featured-songs`).then(res => res.json());
  console.log(`Fetching featured songs from ${API_BASE_URL}/featured-songs (mocked)`);
  return simulateFetch(mockSongs.slice(0, 4));
}

export async function getFeaturedAlbums(): Promise<Album[]> {
  // In a real app: return fetch(`${API_BASE_URL}/featured-albums`).then(res => res.json());
  console.log(`Fetching featured albums from ${API_BASE_URL}/featured-albums (mocked)`);
  return simulateFetch(mockAlbums.slice(0, 3));
}

export async function searchItems(query: string, type?: 'songs' | 'albums' | 'artists' | 'all'): Promise<SearchResults> {
  // In a real app: return fetch(`${API_BASE_URL}/search?q=${query}&type=${type || 'all'}`).then(res => res.json());
  console.log(`Searching for "${query}" (type: ${type || 'all'}) from ${API_BASE_URL} (mocked)`);
  const lowerQuery = query.toLowerCase();
  const results: SearchResults = {
    songs: mockSongs.filter(s => s.title.toLowerCase().includes(lowerQuery) || s.artist.toLowerCase().includes(lowerQuery)),
    albums: mockAlbums.filter(a => a.title.toLowerCase().includes(lowerQuery) || a.artist.toLowerCase().includes(lowerQuery)),
    artists: mockArtists.filter(ar => ar.name.toLowerCase().includes(lowerQuery)),
  };
  return simulateFetch(results);
}

export async function getSongById(id: string): Promise<Song | null> {
  // In a real app: return fetch(`${API_BASE_URL}/songs/${id}`).then(res => res.json());
  console.log(`Fetching song ${id} from ${API_BASE_URL}/songs/${id} (mocked)`);
  const song = mockSongs.find(s => s.id === id) || null;
  return simulateFetch(song);
}

export async function getAlbumById(id: string): Promise<Album | null> {
  // In a real app: return fetch(`${API_BASE_URL}/albums/${id}`).then(res => res.json());
  console.log(`Fetching album ${id} from ${API_BASE_URL}/albums/${id} (mocked)`);
  const album = mockAlbums.find(a => a.id === id);
  if (album) {
    // Simulate fetching songs for the album if not already populated
    album.songs = mockSongs.filter(s => s.album === album.title).slice(0,5); // Example: limit songs
  }
  return simulateFetch(album || null);
}

export async function getArtistById(id: string): Promise<Artist | null> {
  // In a real app: return fetch(`${API_BASE_URL}/artists/${id}`).then(res => res.json());
  console.log(`Fetching artist ${id} from ${API_BASE_URL}/artists/${id} (mocked)`);
  const artist = mockArtists.find(ar => ar.id === id);
  if (artist) {
    artist.topSongs = mockSongs.filter(s => s.artist === artist.name).slice(0,3);
    artist.albums = mockAlbums.filter(al => al.artist === artist.name).slice(0,2);
  }
  return simulateFetch(artist || null);
}

export async function getMultipleSongsByIds(ids: string[]): Promise<Song[]> {
  // In a real app, this might be one or multiple API calls
  console.log(`Fetching multiple songs by IDs: ${ids.join(', ')} (mocked)`);
  const songs = mockSongs.filter(song => ids.includes(song.id));
  return simulateFetch(songs);
}
