import { useDispatch, useSelector } from 'react-redux';
import { dismissError, getErrors } from '../redux/logging';
import ErrorNudge from './ErrorNudge';

export default function ApplicationErrors() {
  const errors = useSelector(getErrors);
  const dispatch = useDispatch();

  return (
    <>
      {errors.map((error) => (
        <ErrorNudge
          key={error.key}
          message={error.message}
          onClose={() => dispatch(dismissError(error.key))}
        />
      ))}
    </>
  );
}
