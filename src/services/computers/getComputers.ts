import axios from 'axios';
import { IComputer } from '../../redux/computers/types';
import { serviceUrl, bearerToken } from '../config';

export default async function getComputers(
  accessToken: string
): Promise<IComputer[]> {
  const response = await axios.get<IComputer[]>(`${serviceUrl}/computers/`, {
    headers: bearerToken(accessToken),
  });

  return response.data;
}
