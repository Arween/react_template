import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { ColorService } from '../../../services/ColorService';
import { getFontFamily } from '../../../services/FontService';

interface IInput {
  value: string;
  type: 'password' | 'text';
  error: string;
  labelText: string;
  placeholder: string;
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

export const Input = ({
  value,
  type,
  error,
  labelText,
  placeholder,
  disabled,
  onChange,
  onBlur,
}: IInput) => (
  <LabelStyled>
    {labelText}
    <InputStyled
      value={value}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      hasError={Boolean(error?.length)}
      onBlur={onBlur}
    />
    {error && <TextError>{error}</TextError>}
  </LabelStyled>
);

const LabelStyled = styled.label`
  color: ${ColorService.SECONDARY};
  font-family: ${getFontFamily('semibold')};
  font-size: 16px;
  line-height: 20px;
  text-align: left;
`;

const InputStyled = styled.input<{ hasError: boolean }>`
  width: 100%;
  padding: 18px 20px;
  background: ${ColorService.WHITE};
  border: ${({ hasError }) => `2px solid ${hasError ? ColorService.ERROR : ColorService.WHITE}`};
  border-radius: 2px;
  font-size: 16px;
  line-height: 20px;
  outline: none;
  margin: 8px 0 0;

  ::placeholder,
  ::-webkit-input-placeholder,
  :-ms-input-placeholder {
    color: ${ColorService.GRAY};
  }

  :focus {
    border: 2px solid ${ColorService.MEDIUM};
  }

  :disabled {
    background: ${ColorService.LIGHT};
    border: 2px solid ${ColorService.LIGHT};
  }
`;

const TextError = styled.span`
  color: ${ColorService.ERROR};
  font-family: ${getFontFamily()};
  font-size: 16px;
  line-height: 20px;
  display: block;
  margin: 16px 0 0;
`;
