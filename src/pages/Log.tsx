import { LogLevel as LogLevelType } from 'libdivecomputerjs';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/Button';
import Select from '../components/Select';
import {
  addLog,
  getLogLevel,
  getLogLines,
  setLogLevel,
} from '../redux/divecomputer/context';
import styling from '../styling';

const LogLevel = styled.span``;

const LogMessage = styled.span``;

const LogLine = styled.div`
  display: grid;
  grid-template-columns: 55px auto;
  border-bottom: 1px solid ${styling.colors.lightGrey};
`;

const LogLines = styled.div``;

const LogControls = styled.div`
  margin-bottom: ${styling.spacing.sm};
`;

const LogViewer = styled.div``;

export default function Log() {
  const lines = useSelector(getLogLines);
  const loglevel = useSelector(getLogLevel);
  const dispatch = useDispatch();

  return (
    <LogViewer>
      <LogControls>
        <Select
          value={loglevel}
          onChange={(e) => {
            dispatch(setLogLevel(e.target.value as LogLevelType));
          }}
        >
          {[
            LogLevelType.All,
            LogLevelType.Debug,
            LogLevelType.Info,
            LogLevelType.Warning,
            LogLevelType.Error,
            LogLevelType.None,
          ].map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </Select>
        <Button
          type="button"
          onClick={() =>
            dispatch(
              addLog({
                key: `Test:${Date.now()}`,
                logLevel: LogLevelType.Info,
                message: 'This is a test message',
              })
            )
          }
        >
          {' '}
          Test log
        </Button>
      </LogControls>
      <LogLines>
        {lines.map((line) => (
          <LogLine key={line.key}>
            <LogLevel>{line.logLevel}</LogLevel>
            <LogMessage>{line.message}</LogMessage>
          </LogLine>
        ))}
      </LogLines>
    </LogViewer>
  );
}
