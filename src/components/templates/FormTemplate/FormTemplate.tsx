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
        {children}
      </Content>

      <Footer />
    </Container>
  </Wrapper>
);

const Wrapper = styled.div`
  background: ${ColorService.MEDIUM};
  width: 100%;
  display: flex;
  padding: 34px;
  flex-direction: column;
  min-height: 100vh;
  padding: 0;
  /* justify-content: space-between; */
`;

const Content = styled.div``;

const Head = styled.div`
  text-align: left;
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
