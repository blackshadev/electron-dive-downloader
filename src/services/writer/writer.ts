import { Descriptor } from 'libdivecomputerjs';
import { Dive } from '../../redux/dive';
import { DeviceInfo } from '../../redux/divecomputer/device';

export default interface Writer {
  setComputer(descriptor: Descriptor, deviceInfo: DeviceInfo): Promise<void>;
  write(dive: Dive): Promise<void>;
  end(): Promise<void>;
}
