import { createSelector } from 'reselect';
import { compareDescriptor, descriptorId } from './helpers';
import { DescriptorState } from './types';

export const allDescriptorsSelector = (state: {
  descriptors: DescriptorState;
}) => state.descriptors.all.slice().sort(compareDescriptor);

export const selectedDescriptor = (state: { descriptors: DescriptorState }) =>
  state.descriptors.all.find(
    (descriptor) => state.descriptors.selected === descriptorId(descriptor)
  );

export const supportedTransports = createSelector(
  selectedDescriptor,
  (state) => state?.transports ?? []
);

export const serializableDescriptorSelector = (state: {
  descriptors: DescriptorState;
}) => ({
  descriptors: { selected: state.descriptors.selected },
});
