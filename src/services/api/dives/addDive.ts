import axios from 'axios';
import { Dive } from '../../../redux/dive';
import { bearerToken } from '../../headers';
import { serviceUrl } from '../config';
import convertDive from './support/convertDive';

export default async function addDive(
  accessToken: string,
  computerId: number,
  dive: Dive
): Promise<void> {
  await axios.post(`${serviceUrl}/dives`, convertDive(computerId, dive), {
    headers: bearerToken(accessToken),
  });
}
