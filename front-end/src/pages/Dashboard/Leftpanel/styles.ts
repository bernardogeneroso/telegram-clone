import styled, { css } from 'styled-components'

interface ContentGroupInterface {
  selected?: boolean;
}

export const Container = styled.div`
  max-width: 500px;
  width: 100%;
`

export const Header = styled.div`
  height: 55px;
  padding: 10px 12px 10px 12px;

  flex: 1;
  display: flex;
  align-items: center;
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

export const ContainerGroup = styled.div`
  height: calc(100% - 55px);
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex: 1;
  flex-direction: inherit;
  flex-wrap: wrap;
`

export const ContentGroup = styled.div<ContentGroupInterface>`
  height: auto;
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