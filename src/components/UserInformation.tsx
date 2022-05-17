import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { userInfoSelector } from '../redux/user';
import styling from '../styling';

const StyledUserInformation = styled.dl`
  display: grid;
  grid-template-columns: minmax(min-content, max-content) auto;
  grid-gap: ${styling.spacing.md};

  dd {
    margin: 0;
  }
`;

export default function UserInformation() {
  const userData = useSelector(userInfoSelector);

  if (!userData) {
    return null;
  }

  return (
    <StyledUserInformation>
      <dt>Name</dt>
      <dd>{userData.name}</dd>

      <dt>E-mail</dt>
      <dd>{userData.email}</dd>

      <dt>Dives</dt>
      <dd>{userData.dive_count}</dd>

      <dt>Computers</dt>
      <dd>{userData.computer_count}</dd>
    </StyledUserInformation>
  );
}
