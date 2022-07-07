import styled from 'styled-components';

import { ColorService } from '../../../services/ColorService';
import { getFontFamily } from '../../../services/FontService';

interface ITitle {
  title: string;
}

export const Title = ({ title }: ITitle) => <TitleStyled>{title}</TitleStyled>;

const TitleStyled = styled.p`
  font-family: ${getFontFamily('bold')};
  font-size: 56px;
  line-height: 80px;
  color: ${ColorService.SECONDARY};
`;
