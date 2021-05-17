import axios from 'axios';
import { IComputer } from '../../../redux/computers/types';
import { bearerToken } from '../../headers';
import { serviceUrl } from '../config';

interface ILittledevComputer {
  computer_id: number;
  dive_count: number;
  last_fingerprint: string;
  last_read: string;
  model: number;
  serial: number;
  type: number;
  vendor: string;
}

export default async function getComputers(
  accessToken: string
): Promise<IComputer[]> {
  const response = await axios.get<ILittledevComputer[]>(
    `${serviceUrl}/computers/`,
    {
      headers: bearerToken(accessToken),
    }
  );

  return response.data.map((comp) => ({
    description: '',
    id: comp.computer_id,
    lastFingerprint: comp.last_fingerprint,
    model: comp.model,
    serial: comp.serial,
  }));
}
