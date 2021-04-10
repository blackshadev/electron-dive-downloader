import { Descriptor } from 'libdivecomputerjs';

export const descriptorName = (descriptor: Descriptor) =>
  `${descriptor.vendor} ${descriptor.product}`;

export const descriptorId = (descriptor: Descriptor) =>
  `${descriptor.vendor}:${descriptor.product}:${descriptor.model}`;

export const compareDescriptor = (a: Descriptor, b: Descriptor) =>
  descriptorName(a).localeCompare(descriptorName(b));
