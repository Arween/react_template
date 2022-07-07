import { ReactNode } from 'react';

import styled from 'styled-components';

interface IContainer {
  children: ReactNode;
}

export const Container = ({ children }: IContainer) => (
  <ContainerStyled>{children}</ContainerStyled>
);

const ContainerStyled = styled.div`
  max-width: 1120px;
  width: 100%;
  box-sizing: border-box;
  margin: auto;
`;
