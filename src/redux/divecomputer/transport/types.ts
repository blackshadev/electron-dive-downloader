import {
  BluetoothTranport,
  IRDATransport,
  SerialTransport,
  Transport,
  USBHIDTransport,
} from 'libdivecomputerjs';

export interface TransportSource {
  type: Transport;
  key: string;
  name: string;
  original:
    | USBHIDTransport
    | SerialTransport
    | BluetoothTranport
    | IRDATransport;
}

export type TransportState = {
  type: Transport;
  transport?: TransportSource;
  availableTransports: TransportSource[];
};
