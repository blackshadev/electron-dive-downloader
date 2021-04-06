import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/Button';
import InputRow from '../components/InputRow';
import Label from '../components/Label';
import Row from '../components/Row';
import Select from '../components/Select';
import {
  allDescriptorsSelector,
  descriptorName,
  selectDescriptor,
  supportedTransports,
  descriptorId,
  selectedDescriptor,
  fetchDescriptors,
} from '../redux/descriptorSlice';

export default function Download() {
  const allDescriptors = useSelector(allDescriptorsSelector);
  const transports = useSelector(supportedTransports);
  const descriptor = useSelector(selectedDescriptor);

  const dispatch = useDispatch();
  useEffect(() => {
    if (allDescriptors.length === 0) {
      dispatch(fetchDescriptors());
    }
  }, [dispatch, allDescriptors]);

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
        <Select name="transport">
          {transports.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      </InputRow>

      <InputRow label="Source" name="source">
        <Select name="source">
          <option>(none)</option>
        </Select>
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
        <Button primary>Download</Button>
      </Row>
    </form>
  );
}
