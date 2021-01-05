import styled, { css } from 'styled-components';

import Tooltip from './../Tooltip/index';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fafafa;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #fafafa;
  color: #666360;

  & + div {
    margin-top: 8px;
  }

  display: flex;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #259BD7;
      border-color: #259BD7;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #259BD7;
    `}

    

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #666360;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
