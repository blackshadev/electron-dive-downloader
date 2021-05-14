import { WriterType } from '../../redux/writer/types';
import FileWriter from './fileWriter';
import LittledivelogWriter from './littledivelogWriter';
import Writer from './writer';

export default function createWriter(type: WriterType): Writer {
  switch (type) {
    case 'file':
      return new FileWriter();
    case 'littledev':
      return new LittledivelogWriter();
    default:
      throw new Error('Unsupported writer type');
  }
}
