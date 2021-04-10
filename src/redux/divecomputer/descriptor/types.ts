import { Descriptor } from 'libdivecomputerjs';

export type DescriptorState = {
  all: Descriptor[];
  selected?: string;
};

export type PersistedAuthState = {
  refreshToken?: string;
  accessToken?: string;
};
