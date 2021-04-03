import { Descriptor } from 'libdivecomputerjs';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/Button';
import {
  allDescriptorsSelector,
  descriptorName,
  setDescriptors,
  selectDescriptor,
  supportedTransports,
  descriptorId,
} from '../redux/descriptorSlice';

const Label = styled.label`
  display: flex;
  align-items: center;
`;
const InputContainer = styled.div``;

const Row = styled.div<{ full?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  height: 3rem;
  grid-gap: 2rem;

  ${Label} {
    min-width: 6rem;
  }
  ${InputContainer} {
    flex-grow: 1;
  }
`;

export default function Download() {
  const allDescriptors = useSelector(allDescriptorsSelector);
  const transports = useSelector(supportedTransports);

  const dispatch = useDispatch();
  useEffect(() => {
    const all = Array.from(Descriptor.iterate());
    dispatch(setDescriptors(all));
  }, []);

  return (
    <form>
      <Row>
        <Label htmlFor="descriptor">Computer</Label>
        <InputContainer>
          <select
            name="descriptor"
            onChange={(event) => dispatch(selectDescriptor(event.target.value))}
          >
            {allDescriptors.map((d) => (
              <option key={descriptorId(d)} value={descriptorId(d)}>
                {descriptorName(d)}
              </option>
            ))}
          </select>
        </InputContainer>
      </Row>

      <Row>
        <Label htmlFor="transport">Transports</Label>
        <InputContainer>
          <select name="transport">
            {transports.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </InputContainer>
      </Row>

      <Row>
        <Label htmlFor="source">Source</Label>
        <InputContainer>
          <select name="source">
            <option>(none)</option>
          </select>
        </InputContainer>
      </Row>

      <Row>
        <Label htmlFor="select">Select dives</Label>
        <InputContainer>
          <input name="select" type="checkbox" />
        </InputContainer>
      </Row>

      <Row>
        <Label htmlFor="output">Output</Label>
        <InputContainer>
          <label htmlFor="output-file">
            <input name="output" id="output-file" type="radio" />
            File
          </label>
          <label htmlFor="output-littlelog">
            <input name="output" id="output-littlelog" type="radio" />
            Littlelog
          </label>
        </InputContainer>
      </Row>

      <Row full>
        <Button primary={transports.length > 0}>Download</Button>
      </Row>
    </form>
  );
}
