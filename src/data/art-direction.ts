import { images, type Asset } from './projects';

export type GalleryLayout = 'study' | 'pairs' | 'sequence' | 'contact';
type Treatment = {
  layout: 'spread' | 'object' | 'folio';
  tone: 'clay' | 'silver' | 'moss' | 'ink';
  galleries: GalleryLayout[];
  detail?: Asset;
};

export const treatments: Record<string, Treatment> = {
  'homo-sapiens': { layout: 'spread', tone: 'clay', galleries: ['study'], detail: images([5])[1] },
  'trong-dong': { layout: 'object', tone: 'silver', galleries: ['study', 'sequence'], detail: images([8])[6] },
  'luxury-backgammon': { layout: 'object', tone: 'clay', galleries: ['contact', 'study'], detail: images([10])[3] },
  'foldable-chess': { layout: 'object', tone: 'clay', galleries: ['contact', 'pairs'] },
  'tournament-backgammon': { layout: 'object', tone: 'moss', galleries: ['contact', 'study'] },
  'artisan-poker': { layout: 'spread', tone: 'clay', galleries: ['pairs'], detail: images([16])[3] },
  'artisan-keycaps': { layout: 'folio', tone: 'moss', galleries: ['pairs', 'contact', 'study', 'contact'], detail: images([23])[5] },
  'reborn-sculptures': { layout: 'folio', tone: 'clay', galleries: ['contact', 'pairs', 'pairs'] },
  'recycled-wood': { layout: 'spread', tone: 'ink', galleries: ['study'] },
  'material-rd': { layout: 'spread', tone: 'moss', galleries: ['study'] },
  'tournament-identities': { layout: 'folio', tone: 'silver', galleries: ['pairs', 'study'] },
};
