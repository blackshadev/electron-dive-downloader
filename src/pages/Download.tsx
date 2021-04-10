import { Transport } from 'libdivecomputerjs';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/Button';
import InputRow from '../components/InputRow';
import Label from '../components/Label';
import Row from '../components/Row';
import Select from '../components/Select';
import {
  allDescriptorsSelector,
  descriptorId,
  descriptorName,
  fetchDescriptors,
  selectDescriptor,
  selectedDescriptor,
  supportedTransports,
} from '../redux/divecomputer/descriptor';
import {
  getAvailableTransports,
  getTransportSources,
  getTransportType,
  setTransportType,
  TransportSource,
} from '../redux/divecomputer/transport';
import DownloadIcon from '../../assets/icons/fa/download-solid.svg';
import RefreshIcon from '../../assets/icons/fa/sync-alt-solid.svg';
import IconButton from '../components/IconButton';

export default function Download() {
  const allDescriptors = useSelector(allDescriptorsSelector);
  const transports = useSelector(supportedTransports);
  const descriptor = useSelector(selectedDescriptor);
  const transportSources = useSelector(getAvailableTransports);
  const transport = useSelector(getTransportType);

  const dispatch = useDispatch();
  useEffect(() => {
    if (allDescriptors.length === 0) {
      dispatch(fetchDescriptors());
    }
  }, [dispatch, allDescriptors]);

  useEffect(() => {
    dispatch(setTransportType(transports[0] ?? Transport.None));
  }, [dispatch, transports]);

  useEffect(() => {
    dispatch(getTransportSources());
  }, [dispatch, transport]);

  return (
    <form>
      <InputRow label="Computer" name="descriptor">
        <Select
          name="descriptor"
          value={descriptor ? descriptorId(descriptor) : undefined}
          onChange={(event) => dispatch(selectDescriptor(event.target.value))}
        >
          {allDescriptors.map((d) => (
            <option key={descriptorId(d)} value={descriptorId(d)}>
              {descriptorName(d)}
            </option>
          ))}
        </Select>
      </InputRow>

      <InputRow label="Transports" name="tranport">
        <Select
          name="transport"
          onChange={(e) =>
            dispatch(setTransportType(e.target.value as Transport))
          }
        >
          {transports.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      </InputRow>

      <InputRow label="Source" name="source">
        <Select name="source">
          {transportSources.length === 0 && <option>(None)</option>}
          {transportSources.length > 0 &&
            transportSources.map((t: TransportSource) => (
              <option key={t.key} value={t.key}>
                {t.name}
              </option>
            ))}
        </Select>

        <IconButton
          outline
          onClick={(e) => {
            e.preventDefault();
            dispatch(getTransportSources());
          }}
        >
          <RefreshIcon />
        </IconButton>
      </InputRow>

      <InputRow label="Select dives" name="select">
        <input name="select" type="checkbox" />
      </InputRow>

      <InputRow label="Output" name="output">
        <Label htmlFor="output-file">
          <input name="output" id="output-file" type="radio" />
          File
        </Label>
        <Label htmlFor="output-littlelog">
          <input name="output" id="output-littlelog" type="radio" />
          Littlelog
        </Label>
      </InputRow>

      <Row>
        <IconButton rounded primary size="md">
          <DownloadIcon />
        </IconButton>
      </Row>
    </form>
  );
}
