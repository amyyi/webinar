import { ForwardRefRenderFunction, InputHTMLAttributes, forwardRef } from 'react'
import { styled } from 'styled-components'
import { SpaceProps, space } from 'styled-system'

const StyledInput = styled.input`
  ${space};
  border-radius: 4px;
  border-color: ${({ theme }) => theme.colors.gray[1]};
  border-width: 1px;
  background-color: ${({ theme }) => theme.colors.white[0]};
  font-size: 14px;
  padding: 8px 16px;
`

export interface TextInputProps extends SpaceProps, InputHTMLAttributes<HTMLInputElement> {
  maxLength?: number
}

const _Input: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = (
  { maxLength = 20000, ...props },
  ref,
) => {
  return <StyledInput ref={ref} maxLength={maxLength} {...props} />
}

export const Input = forwardRef(_Input)
