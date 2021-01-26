import styled from 'styled-components';

interface ContainerProps {
  zIndexMessageShow: boolean
}

export const Container = styled.div<ContainerProps>`
  position: absolute;
  right: 0;
  top: 0;
  padding: 30px;
  overflow: hidden;
  z-index: ${props => props.zIndexMessageShow ? 9999999 : -1};
`;
