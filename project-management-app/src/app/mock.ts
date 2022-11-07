import { Column } from './models';
import { Board } from './main/models/board';

export const boards: Board[] = [
  {
    id: '1',
    title: 'Board 1',
    description: 'description...',
  },
  {
    id: '2',
    title: 'Board 2',
    description: 'description...',
  },
  {
    id: '3',
    title: 'Board 3',
    description: 'description...',
  },
];

export const columns: Column[] = [
  {
    id: '1',
    title: 'Colum 1',
    order: 1,
  },
  {
    id: '2',
    title: 'Colum 2',
    order: 2,
  },
  {
    id: '3',
    title: 'Colum 3',
    order: 3,
  },
];
