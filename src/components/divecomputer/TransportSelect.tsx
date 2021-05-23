import { Transport } from 'libdivecomputerjs';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defaultFormProps, FormProps } from '../../helpers/formProps';
import { supportedTransports } from '../../redux/divecomputer/descriptor';
import { setTransportType } from '../../redux/divecomputer/transport';
import Select from '../Select';

export default function TransportSelect({ name, className }: FormProps) {
  const transports = useSelector(supportedTransports);
  const dispatch = useDispatch();

  return (
    <Select
      className={className}
      name={name}
      onChange={(e) => dispatch(setTransportType(e.target.value as Transport))}
    >
      {transports.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </Select>
  );
}
TransportSelect.defaultProps = {
  ...defaultFormProps,
};
