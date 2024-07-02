import { FC } from 'react'
import { Box, BoxProps } from './Box'
import { BasicTextProps, Texts } from './Text'
import { Loading } from './Loading'
import styled from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
import { border, color, flexbox, layout, position, space } from 'styled-system'

export interface BasicButtonProps extends BoxProps {
  textProps?: BasicTextProps
  title?: string
  loading?: boolean
  disabled?: boolean
  onClick: () => void
}

const StyledButton = styled('button').withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<BoxProps>`
  display: flex;
  background: none repeat scroll 0 0 transparent;
  text-decoration: none;
  border: medium none;
  border-spacing: 0;
  flex-direction: row;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  &:hover {
    background: ${({ theme }) => theme.colors.gray[2]};
  }
  &:disabled {
    background: ${({ theme }) => theme.colors.disabled[0]};
    cursor: not-allowed;
  }
  ${position};
  ${layout};
  ${flexbox};
  ${space};
  ${color};
  ${border};
`

const StyledButtonText = styled(Texts.Body2)`
  ${color};
  ${StyledButton}: hover & {
    color: ${({ theme }) => theme.colors.white[0]};
  }
  ${StyledButton}: disabled & {
    color: ${({ theme }) => theme.colors.disabled[1]};
  }
`

export const Button: FC<BasicButtonProps> = ({ textProps, title, loading, onClick, ...rest }) => {
  return (
    <StyledButton onClick={onClick} {...rest}>
      {loading && (
        <Box mr="8px">
          <Loading />
        </Box>
      )}
      {!!title && <StyledButtonText {...textProps}>{title}</StyledButtonText>}
    </StyledButton>
  )
}
