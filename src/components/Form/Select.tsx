import { ForwardRefRenderFunction, ReactNode, SelectHTMLAttributes, forwardRef } from 'react'
import { styled } from 'styled-components'
import { space, SpaceProps } from 'styled-system'

const StyledSelect = styled.select`
  ${space};
  border-radius: 4px;
  border-color: ${({ theme }) => theme.colors.gray[1]};
  border-width: 1px;
  background-color: ${({ theme }) => theme.colors.white[0]};
  color: ${({ theme }) => theme.colors.gray[2]};
  font-size: 14px;
  padding: 8px 36px 4px 12px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 5'%3E%3Cpath fill='none' stroke='%23000' stroke-width='1' d='M0 0l5 5 5-5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 10px;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.blue[0]};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
  option {
    padding: 8px;
  }
`
interface SelectProps extends SpaceProps, SelectHTMLAttributes<HTMLSelectElement> {
  children?: ReactNode
}

const _Select: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { children, ...rest },
  ref,
) => {
  return (
    <StyledSelect ref={ref} {...rest}>
      {children}
    </StyledSelect>
  )
}

export const Select = forwardRef(_Select)
