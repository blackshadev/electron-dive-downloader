export interface IComputerIdentity {
  model: number;
  serial: number;
}

export interface IComputer extends IComputerIdentity {
  id: number;
  description: string;
  lastFingerprint: string;
}

export type ComputerState = {
  computers?: IComputer[];
  selectedComputer?: IComputer;
};
