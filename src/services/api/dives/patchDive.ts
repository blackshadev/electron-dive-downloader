import axios from 'axios';
import { Dive } from '../../../redux/dive';
import { bearerToken } from '../../headers';
import { serviceUrl } from '../config';
import convertDive from './support/convertDive';

export default async function patchDive(
  accessToken: string,
  computerId: number,
  dive: Dive
): Promise<void> {
  await axios.patch(`${serviceUrl}/dives/upload-computer-data`, convertDive(computerId, dive), {
    headers: bearerToken(accessToken),
  });
}
