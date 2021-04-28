import { Device, FieldType, Parser } from 'libdivecomputerjs';
import { Dive, ITank } from '../../redux/dive';
import DiveSampleParser from './diveSampleParser';

export default class DiveParser {
  constructor(
    private parser: Parser,
    private diveSampleParser: DiveSampleParser
  ) {}

  public parse(divedata: Buffer, fingerprint: Buffer): Dive {
    this.parser.setData(divedata);

    const dive: Dive = {
      fingerprint: fingerprint.toString('base64'),
      date: this.parser.getDatetime(),
      divetime: this.parser.getField(FieldType.DiveTime),
      avgDepth: this.parser.getField(FieldType.AverageDepth),
      maxDepth: this.parser.getField(FieldType.MaxDepth),
      maxTemperature: this.parser.getField(FieldType.TemperatureMaximum),
      minTemperature: this.parser.getField(FieldType.TemperatureMinimum),
      surfaceTemperature: this.parser.getField(FieldType.TemperatureMinimum),
      divemode: this.parser.getField(FieldType.DiveMode),
      salinity: this.parser.getField(FieldType.Salinity),
      atmospheric: this.parser.getField(FieldType.Atmospheric),
      tanks: [],
      samples: [],
    };

    const tankCount = this.parser.getField(FieldType.TankCount) ?? 0;
    for (let iX = 0; iX < tankCount; iX += 1) {
      dive.tanks.push(this.parseTank(iX));
    }

    this.parser.samplesForeach((sample) => this.diveSampleParser.add(sample));
    this.diveSampleParser.finalize();
    dive.samples = this.diveSampleParser.getSamples();

    this.fixMissingTemperatures(dive);

    this.fixMissingTankPressures(dive);

    return dive;
  }

  private fixMissingTemperatures(dive: Dive): void {
    if (!dive.minTemperature) {
      dive.minTemperature = this.diveSampleParser.minTemperature();
    }
    if (!dive.maxTemperature) {
      dive.maxTemperature = this.diveSampleParser.maxTemperature();
    }
  }

  private fixMissingTankPressures(dive: Dive): void {
    for (let iX = 0; iX < dive.tanks.length; iX += 1) {
      const tank = dive.tanks[iX];
      if (!tank.beginPressure) {
        tank.beginPressure = this.diveSampleParser.beginPressure(iX);
      }
      if (!tank.endPressure) {
        tank.endPressure = this.diveSampleParser.endPressure(iX);
      }
    }
  }

  private parseTank(index: number): ITank {
    const divetank = this.parser.getField(FieldType.Tank, index);

    if (divetank === undefined) {
      throw new Error(`Invalid value for tank ${index}.`);
    }

    const gasmix = this.parser.getField(FieldType.GasMix, index);
    const tank: ITank = {
      beginPressure: divetank.beginPressure,
      endPressure: divetank.endPressure,
      type: divetank.type,
      workingPressure: divetank.workingPressure,
      volume: divetank.volume,
      gasmix,
    };

    return tank;
  }
}
