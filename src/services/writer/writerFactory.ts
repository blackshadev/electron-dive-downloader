import { WriterType } from '../../redux/writer/types';
import FileWriter from './fileWriter';
import Writer from './writer';

export default function createWriter(type: WriterType): Writer {
  switch (type) {
    case 'file':
      return new FileWriter();
    case 'littledev':
    default:
      throw new Error('Unsupported writer type');
  }
}
