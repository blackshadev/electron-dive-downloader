import { Transport } from 'libdivecomputerjs';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputRow from '../components/InputRow';
import Label from '../components/Label';
import Row from '../components/Row';
import Select from '../components/Select';
import {
  allDescriptorsSelector,
  descriptorId,
  descriptorName,
  selectDescriptor,
  selectedDescriptor,
  supportedTransports,
} from '../redux/divecomputer/descriptor';
import {
  availableTransports,
  getAvailableTransportSources,
  getSelectedTransport,
  getTransportType,
  setSelectedTransportSource,
  setTransportType,
  TransportSource,
} from '../redux/divecomputer/transport';
import DownloadIcon from '../../assets/icons/fa/download-solid.svg';
import RefreshIcon from '../../assets/icons/fa/sync-alt-solid.svg';
import IconButton from '../components/IconButton';
import {
  getDeviceError,
  getNewDivesOnly,
  getProgress,
  isReading as getIsReading,
  readStart,
  setNewDivesOnly,
} from '../redux/divecomputer/reader';
import ProgressBar from '../components/ProgressBar';
import {
  getOutputFilePath,
  getOutputType,
  setOutputFilePath,
  setOutputType,
} from '../redux/writer';
import SaveFileInput from '../components/FileInput';
import { isLoggedInSelector } from '../redux/auth';

export default function Download() {
  const allDescriptors = useSelector(allDescriptorsSelector);
  const transports = useSelector(supportedTransports);
  const descriptor = useSelector(selectedDescriptor);
  const transportSources = useSelector(availableTransports);
  const progress = useSelector(getProgress);
  const isReading = useSelector(getIsReading);
  const outputType = useSelector(getOutputType);
  const transportType = useSelector(getTransportType);
  const transportSource = useSelector(getSelectedTransport);
  const outputFilePath = useSelector(getOutputFilePath);
  const newDivesOnly = useSelector(getNewDivesOnly);
  const error = useSelector(getDeviceError);
  const isLoggedIn = useSelector(isLoggedInSelector);

  const dispatch = useDispatch();

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

        <IconButton
          outline
          onClick={(e) => {
            e.preventDefault();
            dispatch(getAvailableTransportSources());
          }}
        >
          <RefreshIcon />
        </IconButton>
      </InputRow>

      <InputRow label="Output" name="output">
        <Label htmlFor="output-file">
          <input
            name="output"
            id="output-file"
            type="radio"
            checked={outputType === 'file'}
            onChange={() => dispatch(setOutputType('file'))}
          />
          File
        </Label>
        <Label htmlFor="output-littlelog">
          <input
            name="output"
            id="output-littlelog"
            type="radio"
            checked={outputType === 'littledev'}
            onChange={() => dispatch(setOutputType('littledev'))}
          />
          Littlelog
        </Label>
      </InputRow>

      {outputType === 'file' && (
        <InputRow label="Filename" name="filename">
          <SaveFileInput
            value={outputFilePath}
            onChange={(filepath) => dispatch(setOutputFilePath(filepath))}
            name="filename"
          />
        </InputRow>
      )}
      <InputRow label="New dives only" name="new-dives-only">
        <input
          name="new-dives-only"
          id="new-dives-only"
          type="checkbox"
          checked={newDivesOnly}
          readOnly={isLoggedIn}
          onChange={(ev) => dispatch(setNewDivesOnly(ev.target.checked))}
        />
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
            disabled={
              isReading || !descriptor || !transportType || !transportSource
            }
            onClick={(e) => {
              e.preventDefault();
              dispatch(readStart());
            }}
          >
            <DownloadIcon />
          </IconButton>
        )}
      </Row>

      {error && (
        <Row>
          <Label>{error}</Label>
        </Row>
      )}

      {isReading && (
        <InputRow label="Reading" name="reading">
          <ProgressBar progress={progress} />
        </InputRow>
      )}
    </form>
  );
}
