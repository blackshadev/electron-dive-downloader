import { Descriptor } from 'libdivecomputerjs';
import { Dive } from '../../redux/dive';
import Writer from './writer';
import upsertComputer from '../api/computers/upsertComputer';
import { IComputer } from '../../redux/computers';
import { DeviceInfo } from '../../redux/divecomputer/reader';
import addDive from '../api/dives/addDive';

export default class LittledivelogWriter implements Writer {
  private computer?: IComputer;

  private accessToken?: string;

  public setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  public async setComputer(
    descriptor: Descriptor,
    devInfo: DeviceInfo
  ): Promise<void> {
    if (!this.accessToken) {
      throw new Error('No access token set');
    }

    const comp = await upsertComputer(this.accessToken, {
      model: devInfo.model,
      name: descriptor.product,
      vendor: descriptor.vendor,
      serial: devInfo.serial,
      type: descriptor.type,
    });
    this.computer = comp;
  }

  public async write(dive: Dive): Promise<void> {
    if (!this.accessToken) {
      throw new Error('No access token set');
    }
    if (!this.computer) {
      throw new Error('No computer set');
    }

    await addDive(this.accessToken, this.computer?.id, dive);
  }

  // eslint-disable-next-line class-methods-use-this
  public async end(): Promise<void> {
    /* noop */
  }
}
