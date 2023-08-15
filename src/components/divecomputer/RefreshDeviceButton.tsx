import { useDispatch } from 'react-redux';
import IconButton from '../IconButton';
import { ReactComponent as RefreshIcon } from '../../../assets/icons/fa/sync-alt-solid.svg';
import { getAvailableTransportSources } from '../../redux/divecomputer/transport';

export default function RefreshDeviceButton() {
  const dispatch = useDispatch();

  return (
    <IconButton
      $outline
      onClick={(e) => {
        e.preventDefault();
        dispatch(getAvailableTransportSources());
      }}
    >
      <RefreshIcon />
    </IconButton>
  );
}
