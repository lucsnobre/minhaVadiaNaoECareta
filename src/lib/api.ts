
import type { Song, Album, Artist, SearchResults } from './types';
import { API_BASE_URL } from './constants';

// MOCK DATA - Trap Brasileiro Corrigido e com Álbuns Corretos

const mockArtists: Artist[] = [
  { id: 'art_trap1', name: 'MC Cabelinho', genre: 'Trap/Funk', imageUrl: 'https://placehold.co/300x300.png?text=MC+Cabelinho', bio: 'MC Cabelinho é um fenômeno do trap e funk carioca, conhecido por suas letras autênticas e flow marcante.' },
  { id: 'art_trap2', name: 'Matuê', genre: 'Trap', imageUrl: 'https://placehold.co/300x300.png?text=Matue', bio: 'Matuê é um dos pioneiros do trap no Brasil, famoso por hits como "Kenny G" e por sua produtora 30PRAUM.' },
  { id: 'art_trap3', name: 'Alee', genre: 'Trap', imageUrl: 'https://placehold.co/300x300.png?text=Alee', bio: 'Alee ganhou destaque na cena com músicas como "Passado de um Vilão", mostrando um estilo único e letras reflexivas.' },
  { id: 'art_trap4', name: 'Teto', genre: 'Trap', imageUrl: 'https://placehold.co/300x300.png?text=Teto', bio: 'Teto é um jovem talento do trap baiano, integrante da 30PRAUM, conhecido por sua energia e versatilidade.' },
  { id: 'art_trap5', name: 'Veigh', genre: 'Trap', imageUrl: 'https://placehold.co/300x300.png?text=Veigh', bio: 'Veigh rapidamente se tornou um dos maiores nomes do trap nacional com seu álbum "Dos Prédios".' },
];

const mockAlbums: Album[] = [
  { id: 'alb_trap1', title: 'LITTLE HAIR', artist: 'MC Cabelinho', artistId: 'art_trap1', artworkUrl: 'https://placehold.co/300x300.png?text=LITTLE+HAIR', releaseDate: '2022-11-17', songs: [] },
  { id: 'alb_trap2', title: 'Máquina do Tempo', artist: 'Matuê', artistId: 'art_trap2', artworkUrl: 'https://placehold.co/300x300.png?text=Maquina+Tempo', releaseDate: '2020-09-10', songs: [] },
  { id: 'alb_alee_caos', title: 'CAOS', artist: 'Alee', artistId: 'art_trap3', artworkUrl: 'https://placehold.co/300x300.png?text=CAOS', releaseDate: '2023-01-19', songs: [] },
  { id: 'alb_trap4', title: 'previas.zip', artist: 'Teto', artistId: 'art_trap4', artworkUrl: 'https://placehold.co/300x300.png?text=previas.zip', releaseDate: '2021-03-05', songs: [] },
  { id: 'alb_trap5', title: 'Dos Prédios Deluxe', artist: 'Veigh', artistId: 'art_trap5', artworkUrl: 'https://placehold.co/300x300.png?text=Dos+Predios+Deluxe', releaseDate: '2023-05-19', songs: [] },
  { id: 'alb_matue_anos_luz_single', title: 'Anos Luz (Single)', artist: 'Matuê', artistId: 'art_trap2', artworkUrl: 'https://placehold.co/300x300.png?text=Anos+Luz+Single', releaseDate: '2017-10-02', songs: [] },
  { id: 'alb_teto_mateca', title: 'Mateca', artist: 'Teto', artistId: 'art_trap4', artworkUrl: 'https://placehold.co/300x300.png?text=Mateca', releaseDate: '2023-03-02', songs: [] },
];

const mockSongs: Song[] = [
  { id: 'trap1', title: 'O Preço', artist: 'MC Cabelinho', artistId: 'art_trap1', album: 'LITTLE HAIR', albumId: 'alb_trap1', duration: '2:48', artworkUrl: 'https://placehold.co/300x300.png?text=O+Preco', lyrics: 'O sofrimento de quem não desiste é o que me faz querer mais\nLágrimas de um anjo mau, pra mim tanto faz...' , streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'},
  { id: 'trap2', title: 'Passado de um Vilão', artist: 'Alee', artistId: 'art_trap3', album: 'CAOS', albumId: 'alb_alee_caos', duration: '2:50', artworkUrl: 'https://placehold.co/300x300.png?text=Passado+Vilao', lyrics: 'O passado de um vilão, eu juro, ninguém quer saber\nMas a glória de um herói, todos querem conhecer...' , streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'},
  { id: 'trap3', title: 'Kenny G', artist: 'Matuê', artistId: 'art_trap2', album: 'Máquina do Tempo', albumId: 'alb_trap2', duration: '2:30', artworkUrl: 'https://placehold.co/300x300.png?text=Kenny+G', lyrics: 'Isso não é um drill, nego, isso aqui é um atentado\nMe chamam de profeta, eu vim pra abalar o teu legado...' , streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'},
  { id: 'trap4', title: 'M4 (feat. Matuê)', artist: 'Teto', artistId: 'art_trap4', album: 'previas.zip', albumId: 'alb_trap4', duration: '3:05', artworkUrl: 'https://placehold.co/300x300.png?text=M4', lyrics: 'M4 cantando no meu porte, ela gosta do meu malote\nGroupies querendo meu dote, yeah...' , streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'},
  { id: 'trap5', title: 'Novo Balanço', artist: 'Veigh', artistId: 'art_trap5', album: 'Dos Prédios Deluxe', albumId: 'alb_trap5', duration: '2:58', artworkUrl: 'https://placehold.co/300x300.png?text=Novo+Balanco', lyrics: 'Aê, Nagalli, ele que fez o beat\nNovo balanço, nego, novo pique...' , streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'},
  { id: 'trap6', title: 'Anos Luz', artist: 'Matuê', artistId: 'art_trap2', album: 'Anos Luz (Single)', albumId: 'alb_matue_anos_luz_single', duration: '3:01', artworkUrl: 'https://placehold.co/300x300.png?text=Anos+Luz', lyrics: 'Baby, eu tô a anos-luz de casa\nEu sei que eu errei, mas eu não vivo sem você...' , streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'},
  { id: 'trap7', title: 'X1', artist: 'MC Cabelinho', artistId: 'art_trap1', album: 'LITTLE HAIR', albumId: 'alb_trap1', duration: '3:00', artworkUrl: 'https://placehold.co/300x300.png?text=X1', lyrics: 'Essa vida é uma guerra, X1 com o inimigo\nMas eu tô preparado, blindado e protegido...' , streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3'},
  { id: 'trap8', title: 'Fim de Semana no Rio', artist: 'Teto', artistId: 'art_trap4', album: 'Mateca', albumId: 'alb_teto_mateca', duration: '2:55', artworkUrl: 'https://placehold.co/300x300.png?text=FDS+no+Rio', lyrics: 'Fim de semana no Rio, copo cheio, gelo e lean\nCom as bitch jogando o bundão, ouvindo meu som, sim...' , streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'},
  { id: 'trap9', title: 'Vida Chique', artist: 'Veigh', artistId: 'art_trap5', album: 'Dos Prédios Deluxe', albumId: 'alb_trap5', duration: '3:10', artworkUrl: 'https://placehold.co/300x300.png?text=Vida+Chique', lyrics: 'Ayy, vida chique, meu mano, eu tô bem\nComprando o que eu quero, não devo a ninguém...' , streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3'},
];


// API Fetching Functions (Simulated)

async function simulateFetch<T>(data: T, delay: number = 200): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(JSON.parse(JSON.stringify(data))), delay)); // Deep copy to avoid mutation issues with shared mock data
}

export async function getFeaturedSongs(): Promise<Song[]> {
  console.log(`Fetching featured songs from ${API_BASE_URL}/featured-songs (mocked)`);
  // Shuffle and pick 4 songs to make it more dynamic
  const shuffled = [...mockSongs].sort(() => 0.5 - Math.random());
  return simulateFetch(shuffled.slice(0, 4));
}

export async function getFeaturedAlbums(): Promise<Album[]> {
  console.log(`Fetching featured albums from ${API_BASE_URL}/featured-albums (mocked)`);
  // Shuffle and pick 3 albums
  const shuffled = [...mockAlbums].sort(() => 0.5 - Math.random());
  return simulateFetch(shuffled.slice(0, 3));
}

export async function searchItems(query: string, type?: 'songs' | 'albums' | 'artists' | 'all'): Promise<SearchResults> {
  console.log(`Searching for "${query}" (type: ${type || 'all'}) from ${API_BASE_URL} (mocked)`);
  const lowerQuery = query.toLowerCase();
  const results: SearchResults = {
    songs: mockSongs.filter(s => 
      s.title.toLowerCase().includes(lowerQuery) || 
      s.artist.toLowerCase().includes(lowerQuery) ||
      s.album.toLowerCase().includes(lowerQuery)
    ),
    albums: mockAlbums.filter(a => 
      a.title.toLowerCase().includes(lowerQuery) || 
      a.artist.toLowerCase().includes(lowerQuery)
    ),
    artists: mockArtists.filter(ar => 
      ar.name.toLowerCase().includes(lowerQuery) ||
      ar.genre.toLowerCase().includes(lowerQuery)
    ),
  };
  return simulateFetch(results);
}

export async function getSongById(id: string): Promise<Song | null> {
  console.log(`Fetching song ${id} from ${API_BASE_URL}/songs/${id} (mocked)`);
  const song = mockSongs.find(s => s.id === id) || null;
  return simulateFetch(song);
}

export async function getAlbumById(id: string): Promise<Album | null> {
  console.log(`Fetching album ${id} from ${API_BASE_URL}/albums/${id} (mocked)`);
  let album = mockAlbums.find(a => a.id === id);
  if (album) {
    album = JSON.parse(JSON.stringify(album)); // Deep copy
    // Populate songs for the album
    album.songs = mockSongs.filter(s => s.albumId === album!.id);
  }
  return simulateFetch(album || null);
}

export async function getArtistById(id: string): Promise<Artist | null> {
  console.log(`Fetching artist ${id} from ${API_BASE_URL}/artists/${id} (mocked)`);
  let artist = mockArtists.find(ar => ar.id === id);
  if (artist) {
    artist = JSON.parse(JSON.stringify(artist)); // Deep copy
    // Populate top songs and albums for the artist
    artist.topSongs = mockSongs.filter(s => s.artistId === artist!.id).slice(0, 4); // Show top 4 songs
    artist.albums = mockAlbums.filter(al => al.artistId === artist!.id);
  }
  return simulateFetch(artist || null);
}

export async function getMultipleSongsByIds(ids: string[]): Promise<Song[]> {
  console.log(`Fetching multiple songs by IDs: ${ids.join(', ')} (mocked)`);
  const songs = mockSongs.filter(song => ids.includes(song.id));
  return simulateFetch(songs);
}

