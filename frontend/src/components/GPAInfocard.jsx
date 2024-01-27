import styled from 'styled-components';
import { background } from '@chakra-ui/react';

const StyledInfoCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 16px;
  font-weight: 600;
`;

const GPAInfoCard = ({ title, value }) => (
  <StyledInfoCard>
    <p>{title}: {value.toFixed(2)}</p>
  </StyledInfoCard>
);

export default GPAInfoCard;