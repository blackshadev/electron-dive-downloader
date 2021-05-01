import { Transport } from 'libdivecomputerjs';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  setTransportSource,
  setTransportType,
  TransportSource,
} from '../redux/divecomputer/transport';
import DownloadIcon from '../../assets/icons/fa/download-solid.svg';
import RefreshIcon from '../../assets/icons/fa/sync-alt-solid.svg';
import IconButton from '../components/IconButton';
import {
  getProgress,
  isReading as getIsReading,
  startReading,
} from '../redux/divecomputer/device';
import ProgressBar from '../components/ProgressBar';

export default function Download() {
  const allDescriptors = useSelector(allDescriptorsSelector);
  const transports = useSelector(supportedTransports);
  const descriptor = useSelector(selectedDescriptor);
  const transportSources = useSelector(getAvailableTransports);
  const transport = useSelector(getTransportType);
  const progress = useSelector(getProgress);
  const isReading = useSelector(getIsReading);

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

  useEffect(() => {
    dispatch(setTransportSource(transportSources[0]?.key));
  }, [dispatch, transportSources]);

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
        <Select
          name="source"
          onChange={(e) => dispatch(setTransportSource(e.target.value))}
        >
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
        {/* {isReading && (
          <IconButton
            rounded
            primary
            size="md"
            onClick={() => dispatch(setState('cancelled'))}
          >
            <CancelIcon />
          </IconButton>
        )} */}

        {!isReading && (
          <IconButton
            rounded
            primary
            size="md"
            onClick={(e) => {
              e.preventDefault();
              console.log('h');
              dispatch(startReading());
            }}
          >
            <DownloadIcon />
          </IconButton>
        )}
      </Row>

      {isReading && (
        <InputRow label="Reading" name="reading">
          <ProgressBar progress={progress} />
        </InputRow>
      )}
    </form>
  );
}
