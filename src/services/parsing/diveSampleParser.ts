import { Sample, SampleType } from 'libdivecomputerjs';
import { ISample } from '../../redux/dive';

interface ISampleAggregates {
  tanks: (
    | {
        beginPressure: number;
        endPressure: number;
      }
    | undefined
  )[];
  maxTemperature?: number;
  minTemperature?: number;
}

type NumericalSamplesTypes =
  | SampleType.Bearing
  | SampleType.CNS
  | SampleType.Depth
  | SampleType.Gasmix
  | SampleType.Heartbeat
  | SampleType.PPO2
  | SampleType.RBT
  | SampleType.Setpoint
  | SampleType.Temperature
  | SampleType.Time;

type NumericalFieldnames =
  | 'Bearing'
  | 'CNS'
  | 'Depth'
  | 'Gasmix'
  | 'Heartbeat'
  | 'PPO2'
  | 'RBT'
  | 'SetPoint'
  | 'Temperature'
  | 'Time';

export default class DiveSampleParser {
  private static SampleTypeToFieldName(
    sampleType: NumericalSamplesTypes
  ): NumericalFieldnames;
  private static SampleTypeToFieldName(sampleType: SampleType): keyof ISample {
    switch (sampleType) {
      case SampleType.Bearing:
        return 'Bearing';
      case SampleType.CNS:
        return 'CNS';
      case SampleType.Deco:
        return 'Deco';
      case SampleType.Depth:
        return 'Depth';
      case SampleType.Event:
        return 'Events';
      case SampleType.Heartbeat:
        return 'Heartbeat';
      case SampleType.PPO2:
        return 'PPO2';
      case SampleType.Pressure:
        return 'Pressure';
      case SampleType.RBT:
        return 'RBT';
      case SampleType.Setpoint:
        return 'SetPoint';
      case SampleType.Temperature:
        return 'Temperature';
      case SampleType.Time:
        return 'Time';
      case SampleType.Gasmix:
        return 'Gasmix';
      case SampleType.Vendor:
      default:
        throw new Error(`Invalid input sampleType ${sampleType}`);
    }
  }

  private workingSample: ISample = { Time: 0 };

  private validSample = false;

  private samples: ISample[] = [];

  private isFinalized = false;

  private aggregates: ISampleAggregates = { tanks: [] };

  public add(sample: Sample): void {
    if (this.isFinalized) {
      throw new Error('Sample parser already finalized');
    }

    switch (sample.type) {
      case SampleType.Time:
        this.newSample(sample.value);
        break;

      case SampleType.Temperature:
        this.aggregates.minTemperature = Math.min(
          this.aggregates.minTemperature ?? Number.POSITIVE_INFINITY,
          sample.value
        );
        this.aggregates.maxTemperature = Math.max(
          this.aggregates.minTemperature ?? Number.NEGATIVE_INFINITY,
          sample.value
        );
        this.addNumerical(sample.type, sample.value);
        break;
      case SampleType.Bearing:
      case SampleType.CNS:
      case SampleType.Depth:
      case SampleType.Heartbeat:
      case SampleType.PPO2:
      case SampleType.RBT:
      case SampleType.Setpoint:
      case SampleType.Gasmix:
        this.addNumerical(sample.type, sample.value);
        break;
      case SampleType.Deco:
        this.workingSample.Deco = sample.value;
        break;
      case SampleType.Pressure:
        this.addPressure(sample.value);
        break;
      default:
    }
  }

  private newSample(time: number): void {
    if (this.validSample) {
      this.samples.push(this.workingSample);
    }

    this.validSample = true;
    this.workingSample = {
      ...this.workingSample,
      Time: time,
      Events: undefined,
      Pressure: this.workingSample.Pressure
        ? [...this.workingSample.Pressure]
        : undefined,
    };
  }

  private addPressure(pressureValue: { tank: number; value: number }) {
    this.workingSample.Pressure = this.workingSample.Pressure ?? [];
    const index = this.workingSample.Pressure.findIndex(
      (pressure) => pressure.Tank === pressureValue.tank
    );

    if (index > -1) {
      this.workingSample.Pressure[index] = {
        Pressure: pressureValue.value,
        Tank: pressureValue.tank,
      };
    } else {
      this.workingSample.Pressure.push({
        Pressure: pressureValue.value,
        Tank: pressureValue.tank,
      });
    }

    this.addPressureToAggregate(pressureValue);
  }

  private addPressureToAggregate(pressureValue: {
    tank: number;
    value: number;
  }) {
    const tankValue = this.aggregates.tanks[pressureValue.tank] ?? {
      beginPressure: pressureValue.value,
      endPressure: pressureValue.value,
    };

    tankValue.endPressure = pressureValue.value;

    this.aggregates.tanks[pressureValue.tank] = tankValue;
  }

  private addNumerical(sampleType: NumericalSamplesTypes, value: number) {
    const fieldName = DiveSampleParser.SampleTypeToFieldName(sampleType);
    this.workingSample[fieldName] = value;
  }

  public finalize(): void {
    this.samples.push(this.workingSample);
    this.isFinalized = true;
  }

  public getSamples(): ISample[] {
    this.assertFinalized();

    return this.samples;
  }

  public minTemperature(): number | undefined {
    this.assertFinalized();

    return this.aggregates.minTemperature;
  }

  public maxTemperature(): number | undefined {
    this.assertFinalized();

    return this.aggregates.maxTemperature;
  }

  public beginPressure(iX: number): number | undefined {
    this.assertFinalized();

    return this.aggregates.tanks[iX]?.beginPressure;
  }

  public endPressure(iX: number): number | undefined {
    this.assertFinalized();

    return this.aggregates.tanks[iX]?.endPressure;
  }

  public getAggregates() {
    return { ...this.aggregates };
  }

  private assertFinalized() {
    if (!this.isFinalized) {
      throw new Error('Sample parser not yet finalized');
    }
  }
}
