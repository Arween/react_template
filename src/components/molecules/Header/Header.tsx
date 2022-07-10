import styled from 'styled-components';
import { ColorService } from '../../../services/ColorService';

export const Header = () => <HeaderStyled></HeaderStyled>;

const HeaderStyled = styled.header`
  background: ${ColorService.PRIMARY};
  width: 100%;
  height: 84px;
  display: flex;
`;
