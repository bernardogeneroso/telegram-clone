import styled, { keyframes } from 'styled-components'
import { shade } from 'polished';

import backgroundUrl from '../../assets/background-url.jpg'

export const Container = styled.div`
  display: flex;
  height: 100vh;
  place-content: center;
  align-items: stretch;

  background-image: url(${backgroundUrl});
  background-repeat: repeat;
  background-position: center;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  width: 100%;
`

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: ${appearFromLeft} 1s;

  img {
    width: 160px;
    height: 160px;
  }

  form {
    margin: 40px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;

      color: ${shade(0.2, '#259BD7')};
      opacity: 0.8;
    }

    a {
      color: #259BD7;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#259BD7')};
      }
    }
  }

  > a {
    color: #259BD7;
    display: block;
    margin-top: 4px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#259BD7')};
    }
  }
`