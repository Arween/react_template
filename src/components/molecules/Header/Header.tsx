import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getStoreProfile } from '../../../core/slices/authSlice';

import { ColorService } from '../../../services/ColorService';

export const Header = () => {
  const location = useLocation();

  const profile = useSelector(getStoreProfile);
  return (
    <HeaderStyled>
      <NavStyled>
        {profile ? (
          <>
            <LinkStyled active={Boolean(location.pathname === '/favorites')}>
              <Link to="/favorites">Favorites</Link>
            </LinkStyled>
          </>
        ) : (
          <>
            <LinkStyled active={Boolean(location.pathname === '/')}>
              <Link to="/">Registration</Link>
            </LinkStyled>{' '}
            <LinkStyled active={Boolean(location.pathname === '/login')}>
              <Link to="/login">login</Link>
            </LinkStyled>{' '}
          </>
        )}
        |{' '}
        <LinkStyled active={Boolean(location.pathname === '/posts')}>
          <Link to="/posts">Posts</Link>
        </LinkStyled>
        <ProfileName>| Profile name: {profile?.username}</ProfileName>
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
  display: flex;
`;

const LinkStyled = styled.div<{ active: boolean }>`
  a {
    color: ${ColorService.WHITE};
    margin: 20px;
    color: ${({ active }) => ` ${active ? ColorService.ERROR : ColorService.WHITE}`};
  }
`;

const ProfileName = styled.div`
  color: ${ColorService.WHITE};
  /* margin: 20px; */
`;

const Image = styled.img`
  /* width: auto: */
`;
