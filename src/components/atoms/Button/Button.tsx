import { ReactNode } from 'react';
import styled from 'styled-components';

import { getFontFamily } from '../../../services';
import { ColorService } from '../../../services/ColorService';
// import { default as logo } from '../../../assets/icons/favorite.svg';
// import { ReactComponent as Logo } from './favoritesIcon.svg';

const getTheme = (theme: 'primary' | 'secondary' | 'delete' | 'icon'): IButtonStyled => {
  if (theme === 'icon') {
    return {
      bgDefault: ColorService.LIGHT,
      bgHover: ColorService.PRIMARY_2,
      colorBorderDefault: ColorService.LIGHT,
      colorBorderHover: ColorService.PRIMARY_2,
      bgDisabled: ColorService.LIGHT,
      color: ColorService.SECONDARY,
      colorHover: ColorService.WHITE,
    };
  }

  if (theme === 'delete') {
    return {
      bgDefault: ColorService.TRANSPARENT,
      bgHover: ColorService.TRANSPARENT,
      colorBorderDefault: ColorService.TRANSPARENT,
      colorBorderHover: ColorService.MEDIUM,
      bgDisabled: ColorService.TRANSPARENT,
      color: ColorService.ERROR,
      colorHover: ColorService.ERROR,
    };
  }

  if (theme === 'secondary') {
    return {
      bgDefault: ColorService.LIGHT,
      bgHover: ColorService.MEDIUM,
      colorBorderDefault: ColorService.LIGHT,
      colorBorderHover: ColorService.MEDIUM,
      bgDisabled: ColorService.LIGHT,
      color: ColorService.SECONDARY,
      colorHover: ColorService.SECONDARY,
    };
  }

  return {
    bgDefault: ColorService.PRIMARY,
    bgHover: ColorService.PRIMARY_2,
    colorBorderDefault: ColorService.PRIMARY,
    colorBorderHover: ColorService.PRIMARY_2,
    bgDisabled: ColorService.LIGHT,
    color: ColorService.WHITE,
    colorHover: ColorService.WHITE,
  };
};

interface IButtonStyled {
  bgDefault: string;
  bgHover: string;
  colorBorderDefault: string;
  colorBorderHover: string;
  bgDisabled: string;
  color: string;
  colorHover: string;
}

interface IButton {
  text: string;
  disabled?: boolean;
  onClick: () => void;
  icon?: ReactNode;
  theme: 'primary' | 'secondary' | 'delete' | 'icon';
}

export const Button = ({ text, disabled, onClick, icon, theme }: IButton) => {
  const selectedTheme = getTheme(theme);
  return (
    <ButtonStyled onClick={onClick} disabled={disabled} {...selectedTheme}>
      {icon}
      {text}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button<IButtonStyled>`
  padding: 16px 32px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  background: ${({ bgDefault }) => bgDefault};
  border: ${({ colorBorderDefault }) => `1px solid  ${colorBorderDefault}`};
  color: ${({ color }) => color};

  font-weight: 500;
  font-size: 25px;
  line-height: 29px;
  letter-spacing: 0.05em;

  font-family: ${getFontFamily()};

  svg {
    margin-right: 10px;
  }

  :disabled {
    background: ${({ bgDisabled }) => bgDisabled};
    border: ${({ bgDisabled }) => `1px solid  ${bgDisabled}`};
    pointer-events: none;
    color: ${ColorService.GRAY};

    svg path {
      fill: ${ColorService.GRAY};
    }
  }

  :hover {
    background: ${({ bgHover }) => bgHover};
    border: ${({ colorBorderHover }) => `1px solid  ${colorBorderHover}`};
    color: ${({ colorHover }) => colorHover};
    cursor: pointer;

    svg path {
      fill: ${({ colorHover }) => colorHover};
    }
  }
`;
