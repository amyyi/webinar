import { DOMAttributes, FC, ReactNode } from 'react'
import styled from 'styled-components'
import {
  ColorProps,
  SpaceProps,
  TypographyProps,
  color,
  compose,
  space,
  system,
  typography,
} from 'styled-system'

export interface BasicTextProps extends SpaceProps, ColorProps, TypographyProps {
  align?: string
  decoration?: string
  children?: ReactNode
  onClick?: () => void
}

const StyledP = styled.p<BasicTextProps>(
  compose(space, typography, color),
  system({
    align: {
      property: 'textAlign',
    },
    decoration: {
      property: 'textDecorationLine',
    },
  }),
)

export const textTypography = {
  H2: { fontSize: 28, fontWeight: '500', letterSpacing: -0.5 },
  Body1: { fontSize: 18, fontWeight: '400', letterSpacing: 0.5 },
  Body2: { fontSize: 16, fontWeight: '400', letterSpacing: 0.5 },
  Body3: { fontSize: 14, fontWeight: '400', letterSpacing: 0.25 },
  Input: { fontSize: 16, fontWeight: '400', letterSpacing: 0.5 },
} as const

type TextSheet = Record<keyof typeof textTypography, FC<BasicTextProps>>

export const Texts: TextSheet = Object.entries(textTypography).reduce(
  (components, [name, typography]) => {
    const Component: FC<BasicTextProps> = ({ color, ...props }) => {
      return <StyledP {...typography} color={color || 'gray.0'} {...props} />
    }
    return {
      ...components,
      [name]: Component,
    }
  },
  {} as TextSheet,
)

export const Text = Texts.Body2

interface TextContentProps extends BasicTextProps, DOMAttributes<HTMLDivElement> {
  onClick?: () => void
}

export const TextContent: FC<TextContentProps> = (props) => {
  return <Texts.Body3 {...props} />
}
