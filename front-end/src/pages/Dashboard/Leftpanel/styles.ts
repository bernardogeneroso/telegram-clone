import styled, { css } from 'styled-components'

import backgroundUrl from '../../../assets/background-url.jpg'

interface ContainerInterface {
  drawerWidth: number
}

interface ContentGroupInterface {
  selected?: boolean;
}

export const Container = styled.div<ContainerInterface>`
  width: ${props => props.drawerWidth}px;
  position: relative;

  background-image: url(${backgroundUrl});

  transition: all ease 0.4s;
`

export const Header = styled.div`
  height: 54px;
  padding: 10px 10px 10px 0;

  flex: 1;
  display: flex;
  align-items: center;
  align-content: center;
`

export const HeaderSearchContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  width: 100%;
  height: 100%;
  margin-left: 6px;

  input {
    width: 100%;

    padding-left: 12px;
    padding-right: 33px;

    border: 0;
    border-radius: 3px;
    background-color: #f1f1f1;
  }

  input:focus {
    background-color: transparent;
    border: 2px solid #79d0fc;
  }

  svg {
    position: absolute;
    right: 6px;
    top: 8px;
    opacity: 0.8;
  }
`

export const HeaderDrawerMenu = styled.div`
  height: 120px;

  padding: 22px;
  background: rgba(59,157,218,1);

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  p {
    margin-top: 16px;

    color: #fff;
    font-weight: 500;
  }
`

export const ContainerGroup = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 6px!important;
    height: 6px!important;
  }
  & .dark ::-webkit-scrollbar-thumb {
      background-color: hsla(0,0%,100%,.16);
  }
  ::-webkit-scrollbar-thumb {
      background-color: rgba(0,0,0,.2);
  }
  & .dark ::-webkit-scrollbar-track {
      background-color: initial;
  }
  ::-webkit-scrollbar-track {
      background: hsla(0,0%,100%,.1);
  }
`

export const ContentGroup = styled.div<ContentGroupInterface>`
  height: 85px;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 6px 12px 6px 12px;

  cursor: pointer;

  color: ${props => props.selected ? '#fff' : 'rgba(120, 120, 120, 0.8)'};
  background-color: ${props => props.selected ? '#3B9DDA' : '#fff'};

  ${props => !props.selected ? css`
    &:hover {
      background-color: rgba(190, 190, 190, 0.2);
    }
  ` : ''}

  div:nth-child(1) {
    img {
      width: 60px;
      height: 60px;
    }
  }

  div:nth-child(2) {
    width: 100%;

    margin-left: 8px;

    header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      span {
        color: ${props => props.selected ? '#fff' : '#000'};
        font-weight: 500;
      }
    }

    p {
      span {
        color: ${props => props.selected ? '#fff' : '#4299cf'};
        font-weight: 500;
      }
    }
  }
`

export const AvatarProfile = styled.div`
  height: 40px;
  border-radius: 50%;

  img {
    height: 40px;
    width: 45px;
    border-radius: 50%;
  }
`