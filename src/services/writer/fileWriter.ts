import fs from 'fs';
import { Descriptor } from 'libdivecomputerjs';
import { Dive } from '../../redux/dive';
import Writer from './writer';

interface IComputer {
  name: string;
  vendor: string;
  serial: number;
  model: number;
}

export default class FileWriter implements Writer {
  private dives: Dive[] = [];

  private computer?: IComputer = undefined;

  private fileName = '/home/vincent/dives/dive.json';

  public setFilename(fileName: string): void {
    this.fileName = fileName;
  }

  public async setComputer(
    descriptor: Descriptor,
    devInfo: { serial: number; model: number }
  ): Promise<void> {
    this.computer = {
      vendor: descriptor.vendor,
      name: descriptor.product,
      serial: devInfo.serial,
      model: devInfo.model,
    };
  }

  public async write(dive: Dive): Promise<void> {
    this.dives.push(dive);
  }

  public async end(): Promise<void> {
    const packaged = {
      readtime: new Date().toISOString(),
      computer: this.computer,
      dives: this.dives,
    };
    await fs.promises.writeFile(this.fileName, JSON.stringify(packaged));
  }
}
