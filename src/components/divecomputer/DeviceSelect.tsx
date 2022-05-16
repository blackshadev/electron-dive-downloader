import { useDispatch, useSelector } from 'react-redux';
import { defaultFormProps, FormProps } from '../../helpers/formProps';
import {
  availableTransports,
  setSelectedTransportSource,
  TransportSource,
} from '../../redux/divecomputer/transport';
import Select from '../Select';

export default function DeviceSelect({ name, className }: FormProps) {
  const transportSources = useSelector(availableTransports);

  const dispatch = useDispatch();

  return (
    <Select
      name={name}
      className={className}
      onChange={(e) => dispatch(setSelectedTransportSource(e.target.value))}
    >
      {transportSources.length === 0 && <option>(None)</option>}
      {transportSources.length > 0 &&
        transportSources.map((t: TransportSource) => (
          <option key={t.key} value={t.key}>
            {t.name}
          </option>
        ))}
    </Select>
  );
}
DeviceSelect.defaultProps = {
  ...defaultFormProps,
};
