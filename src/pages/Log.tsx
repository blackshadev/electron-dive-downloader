import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/Button';
import Select from '../components/Select';
import {
  getLogLevel,
  getLogLines,
  log,
  LogLevel,
  setLogLevel,
} from '../redux/logging';
import getAllLogLevelKeys from '../redux/logging/support';
import styling from '../styling';

const LogLevelSpan = styled.span`
  padding-right: ${styling.spacing.md};
  padding-bottom: ${styling.spacing.md};
  display: table-cell;
`;

const LogMessageSpan = styled.span`
  display: table-cell;
`;

const LogLine = styled.div`
  display: table-row;
  grid-template-columns: min-content auto;
`;

const LogLines = styled.div`
  display: table;
`;

const LogControls = styled.div`
  margin-bottom: ${styling.spacing.sm};
  padding-bottom: ${styling.spacing.sm};
  border-bottom: 1px solid ${styling.colors.lightGrey};
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
            dispatch(setLogLevel(e.target.value as unknown as LogLevel));
          }}
        >
          {getAllLogLevelKeys().map((l) => (
            <option key={l} value={LogLevel[l]}>
              {l}
            </option>
          ))}
        </Select>
        <Button
          type="button"
          onClick={() =>
            dispatch(
              log({
                loglevel,
                source: 'user',
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
            <LogLevelSpan>{LogLevel[line.loglevel]}</LogLevelSpan>
            <LogMessageSpan>{line.message}</LogMessageSpan>
          </LogLine>
        ))}
      </LogLines>
    </LogViewer>
  );
}
