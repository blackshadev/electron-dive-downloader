import { createSelector } from 'reselect';
import { compareDescriptor, descriptorId } from './helpers';
import { DescriptorState } from './types';

export const allDescriptorsSelector = createSelector(
  (state: { descriptors: DescriptorState }) => state.descriptors.all,
  (descriptors) => descriptors.slice().sort(compareDescriptor)
);

export const selectedDescriptorSelector = (state: {
  descriptors: DescriptorState;
}) =>
  state.descriptors.all.find(
    (descriptor) => state.descriptors.selected === descriptorId(descriptor)
  );

export const supportedTransports = createSelector(
  selectedDescriptorSelector,
  (state) => state?.transports ?? []
);

export const serializableDescriptorSelector = (state: {
  descriptors: DescriptorState;
}) => ({
  descriptors: { selected: state.descriptors.selected },
});
