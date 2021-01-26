import styled, { css, keyframes } from 'styled-components'

interface ContainerMessageInterface {
  receive?: boolean;
  checked?: boolean;
}

export const Container = styled.div`
  width: 100%;
`

export const Header = styled.div`
  height: 55px;

  display: flex;
  flex-direction: row;
  padding: 6px 12px;

  font-size: 14px;

  align-items: center;

  div:nth-child(1) {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    p {
      color: rgba(120, 120, 120, 0.8);
    }
  }

  & .header-right-icons {
    margin-left: auto;
  }
`

export const ContainerMessages = styled.div`
  height: calc(100% - 110px);
  padding: 16px 18px 16px 18px;
  overflow-y: auto;
  
  background-color: rgba(59, 157, 218, 0.8);
`

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const ContainerMessage = styled.div<ContainerMessageInterface>`
  position: relative;
  width: fit-content;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-end;

  animation: ${props => props.receive ? appearFromLeft : appearFromRight} 0.8s;

  & + div {
    margin-top: 16px;
  }

  padding: 8px 10px 8px 10px;
  border-radius: 10px;

  ${props => props.receive ? css`
    border-bottom-right-radius: 0px !important;
    margin-left: auto;
    background-color: rgb(222,241,253, 0.5);
  `: css`
    border-bottom-left-radius: 0px !important;
    background-color: #f1f1f1;
  `}

  footer {
    width: 100%;

    font-size: 12px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    p {
      margin-right: 10px;

      color: rgb(0, 106, 163);
    }

    div {
      display: flex;
      align-items: flex-end;

      color: rgb(120, 120, 120, 0.8);

      svg {
        margin-left: 4px;
        ${props => props.checked && css`
          color: rgba(59, 157, 218, 1);
        `}
      }
    }

    
  }
`

export const MessageContent = styled.div`
  width: 100%;
  max-width: 250px;
  font-size: 14px;
  color: #000;
`

export const Footer = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 55px;

  .file:nth-child(1) {
    transform: rotate(-135deg);
  }

  input {
    flex: 1;
    height: 35px;
    border: none;
  }

  input::placeholder {
    padding-left: 6px;
  }
`

export const ContainerPicker = styled.div`
  position: absolute;
  right: 20px;
  bottom: 75px;
  z-index: 99;
`