import axios from 'axios';
import { IComputer } from '../../../redux/computers';
import { bearerToken } from '../../headers';
import { serviceUrl } from '../config';

interface IComputerInput {
  serial: number;
  vendor: string;
  model: number;
  type: number;
  name: string;
}

export default async function upsertComputers(
  accessToken: string,
  computerData: IComputerInput
): Promise<IComputer> {
  const response = await axios.post<IComputer>(
    `${serviceUrl}/computers/`,
    computerData,
    {
      headers: bearerToken(accessToken),
    }
  );

  return response.data;
}
