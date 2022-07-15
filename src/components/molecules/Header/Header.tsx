import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { ColorService } from '../../../services/ColorService';

export const Header = () => {
  const location = useLocation();

  console.log({ location });
  return (
    <HeaderStyled>
      <NavStyled>
        <LinkStyled to="/" active={Boolean(location.pathname === '/')}>
          Home
        </LinkStyled>{' '}
        |{' '}
        <LinkStyled active={Boolean(location.pathname === '/posts')} to="posts">
          Posts
        </LinkStyled>
      </NavStyled>
      {/* <Image src="http://wallpapers-image.ru/2560x1600/mountains/wallpapers/wallpapers-mountains-08.jpg" /> */}
    </HeaderStyled>
  );
};

const HeaderStyled = styled.header`
  background: ${ColorService.PRIMARY};
  width: 100%;
  height: 84px;
  display: flex;
`;

const NavStyled = styled.nav`
  color: ${ColorService.WHITE};
  padding: 20px 100px 0;
`;

const LinkStyled = styled(Link)<{ active: boolean }>`
  color: ${ColorService.WHITE};

  color: ${({ active }) => ` ${active ? ColorService.ERROR : ColorService.WHITE}`};
`;

const Image = styled.img`
  /* width: auto: */
`;
