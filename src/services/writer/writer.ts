import { Descriptor } from 'libdivecomputerjs';
import { Dive } from '../../redux/dive';

export type DevInfo = { firmware: number; model: number; serial: number };

export default interface Writer {
  setComputer(descriptor: Descriptor, devInfo: DevInfo): Promise<void>;
  write(dive: Dive): Promise<void>;
  end(): Promise<void>;
}
