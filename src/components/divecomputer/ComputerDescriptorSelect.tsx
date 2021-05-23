import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  allDescriptorsSelector,
  descriptorId,
  descriptorName,
  selectDescriptor,
  selectedDescriptorSelector,
} from '../../redux/divecomputer/descriptor';
import Select from '../Select';

export default function ComputerDescriptorSelect({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) {
  const allDescriptors = useSelector(allDescriptorsSelector);
  const descriptor = useSelector(selectedDescriptorSelector);

  const dispatch = useDispatch();

  return (
    <Select
      className={className}
      name={name}
      value={descriptor ? descriptorId(descriptor) : undefined}
      onChange={(event) => dispatch(selectDescriptor(event.target.value))}
    >
      {allDescriptors.map((d) => (
        <option key={descriptorId(d)} value={descriptorId(d)}>
          {descriptorName(d)}
        </option>
      ))}
    </Select>
  );
}
ComputerDescriptorSelect.defaultProps = {
  name: undefined,
  className: undefined,
};
