import { ReactNode } from 'react';
import styled from 'styled-components';

import { ColorService } from '../../../services/ColorService';
import { getFontFamily } from '../../../services/FontService';
import { Footer } from '../../atoms/Footer/Footer';
import { Container } from '../../layouts/Container/Container';
import { Header } from '../../molecules/Header/Header';
import { Title } from './Title';

interface IFormTemplate {
  children: ReactNode;
  title: string;
}

export const FormTemplate = ({ children, title }: IFormTemplate) => (
  <Wrapper>
    <Header />
    <Container>
      <Content>
        <Head>
          <Link href="/">Back to home</Link>
          <Title title={title} />
        </Head>
        <FormContent>{children}</FormContent>
      </Content>
      <Footer />
    </Container>
  </Wrapper>
);

const Wrapper = styled.div`
  background: ${ColorService.EXTRA_LIGHT};
  width: 100%;
  display: flex;
  padding: 34px;
  flex-direction: column;
  padding: 0;
`;

const Content = styled.div`
  min-height: calc(100vh - 160px);
`;

const FormContent = styled.div`
  border: 1px solid #dadada;
  padding: 40px;
`;

const Head = styled.div`
  text-align: left;
  padding: 72px 0;
`;

// const Title = styled.p`
//   font-family: ${getFontFamily('bold')};
//   font-size: 56px;
//   line-height: 80px;
//   color: ${ColorService.SECONDARY};
// `;

const Link = styled.a`
  font-family: ${getFontFamily()};
  font-size: 16px;
  line-height: 24px;
  color: ${ColorService.SECONDARY};
`;
