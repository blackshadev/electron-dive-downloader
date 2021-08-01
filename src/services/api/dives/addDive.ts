import axios from 'axios';
import { Salinity } from 'libdivecomputerjs';
import { Dive } from '../../../redux/dive';
import { bearerToken } from '../../headers';
import { serviceUrl } from '../config';

interface IDiveInput {
  date: string;
  divetime: number;
  fingerprint: string;
  max_depth: number;
  min_temperature?: number;
  max_temperature?: number;
  surface_temperature?: number;
  atmospheric_pressure?: number;
  mode?: string;
  salinity?: Salinity;
  tanks: {
    pressure: { begin: number; end: number; type: 'psi' | 'bar' };
    volume?: number;
    oxygen?: number;
  }[];
  computer_id: number;
  samples: any[];
}

function convertDive(computer_id: number, dive: Dive): IDiveInput {
  return {
    computer_id,
    date: dive.date,
    divetime: dive.divetime,
    max_depth: dive.maxDepth ?? 0,
    fingerprint: dive.fingerprint,
    atmospheric_pressure: dive.atmospheric,
    max_temperature: dive.maxTemperature,
    min_temperature: dive.minTemperature,
    mode: dive.divemode,
    salinity: dive.salinity,
    surface_temperature: dive.surfaceTemperature,
    samples: dive.samples,
    tanks: dive.tanks.map((tank) => ({
      pressure: {
        begin: tank.beginPressure ?? 0,
        end: tank.endPressure ?? 0,
        type: tank.type ?? 'bar',
      },
      volume: tank.volume,
      oxygen: tank.gasmix ? Math.round(tank.gasmix.oxygen * 100) : undefined,
    })),
  };
}

export default async function addDive(
  accessToken: string,
  computerId: number,
  dive: Dive
): Promise<void> {
  await axios.post(`${serviceUrl}/dives`, convertDive(computerId, dive), {
    headers: bearerToken(accessToken),
  });
}
