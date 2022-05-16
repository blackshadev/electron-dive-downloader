import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputRow from '../components/InputRow';
import Label from '../components/Label';
import Row from '../components/Row';
import { selectedDescriptorSelector } from '../redux/divecomputer/descriptor';
import {
  getSelectedTransport,
  getTransportType,
} from '../redux/divecomputer/transport';
import { ReactComponent as DownloadIcon } from '../../assets/icons/fa/download-solid.svg';
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
import ComputerDescriptorSelect from '../components/divecomputer/ComputerDescriptorSelect';
import TransportSelect from '../components/divecomputer/TransportSelect';
import DeviceSelect from '../components/divecomputer/DeviceSelect';
import RefreshDeviceButton from '../components/divecomputer/RefreshDeviceButton';

export default function Download() {
  const descriptor = useSelector(selectedDescriptorSelector);
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
    <>
      <InputRow label="Computer" name="descriptor">
        <ComputerDescriptorSelect className="-grow" name="descriptor" />
      </InputRow>

      <InputRow label="Transports" name="tranport">
        <TransportSelect className="-grow" name="transport" />
      </InputRow>

      <InputRow label="Source" name="source">
        <DeviceSelect className="-grow" name="source" />

        <RefreshDeviceButton />
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
            disabled={!isLoggedIn}
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
          disabled={!isLoggedIn}
          onChange={(ev) => dispatch(setNewDivesOnly(ev.target.checked))}
        />
      </InputRow>

      <Row className="full content-centered">
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
            size="lg"
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
        <InputRow label="Reading" name="reading" className="full">
          <ProgressBar progress={progress} />
        </InputRow>
      )}
    </>
  );
}
