import { FC } from "react"
import styled from "styled-components"
import { Box, BoxProps } from './Box'

const StyledBox = styled(Box)`
  width: 15px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid;
  border-color: ${({theme}) => `${theme.colors.blue[0]} ${theme.colors.white[0]}`};
  animation: l1 1s infinite;
  @keyframes l1 {to{transform: rotate(.5turn)}}
`

export const Loading: FC = () => {
  return (<StyledBox />)
}