import { FC, ForwardRefRenderFunction, ReactNode, Ref, forwardRef } from 'react'
import styled from 'styled-components'
import {
  BorderProps,
  ColorProps,
  FlexProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  TypographyProps,
  border,
  color,
  compose,
  flexbox,
  layout,
  position,
  space,
  system,
} from 'styled-system'
import isPropValid from '@emotion/is-prop-valid' // fix style-system does not recognize the flexDirection prop on a DOM element.

// export interface BoxProps
//   extends SpaceProps,
//     ColorProps,
//     TypographyProps,
//     PositionProps,
//     LayoutProps,
//     FlexProps,
//     BorderProps {
//   align?: string
//   decoration?: string
//   onPress?: () => void
// }

export interface BoxProps
  extends PositionProps,
    LayoutProps,
    FlexboxProps,
    SpaceProps,
    ColorProps,
    BorderProps {
  row?: boolean
  wrap?: boolean
  xalign?: 'flex-start' | 'center' | 'flex-end'
  yalign?: 'flex-start' | 'center' | 'flex-end'
  ratio?: number
  children?: ReactNode
  onClick?(): void
}

const StyledDiv = styled('div').withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<BoxProps>`
  display: flex;
  ${position};
  ${layout};
  ${flexbox};
  ${space};
  ${color};
  ${border};
`

// const StyledDiv = styled('div')(
//   compose(position, layout, flexbox, space, color, border),
//   system({
//     borderRadius: true,
//     borderWidth: {
//       property: 'borderWidth',
//       scale: 'lineWidths',
//     },
//     borderTopWidth: {
//       property: 'borderTopWidth',
//       scale: 'lineWidths',
//     },
//     borderBottomWidth: {
//       property: 'borderBottomWidth',
//       scale: 'lineWidths',
//     },
//     borderLeftWidth: {
//       property: 'borderLeftWidth',
//       scale: 'lineWidths',
//     },
//     borderRightWidth: {
//       property: 'borderRightWidth',
//       scale: 'lineWidths',
//     },
//   }),
// )

// const SDiv = styled.div<BoxProps>(
//   compose(position, layout, flexbox, space, color, border),
//   system({
//     borderRadius: true,
//     borderWidth: {
//       property: 'borderWidth',
//       scale: 'lineWidths',
//     },
//     borderTopWidth: {
//       property: 'borderTopWidth',
//       scale: 'lineWidths',
//     },
//     borderBottomWidth: {
//       property: 'borderBottomWidth',
//       scale: 'lineWidths',
//     },
//     borderLeftWidth: {
//       property: 'borderLeftWidth',
//       scale: 'lineWidths',
//     },
//     borderRightWidth: {
//       property: 'borderRightWidth',
//       scale: 'lineWidths',
//     },
//   }),
// )

// export const Box: FC<BoxProps> = (
//   { row, wrap, xalign, yalign, ratio, onClick, children, ...rest },
// ) => {
//   const boxProps: BoxProps & { aspectRatio?: number } = {
//     flexDirection: row ? 'row' : 'column',
//     flexWrap: wrap ? 'wrap' : 'nowrap',
//     alignItems: row ? yalign : xalign,
//     justifyContent: row ? xalign : yalign,
//     aspectRatio: ratio,
//     ...rest,
//   }

//   return <StyledDiv onClick={onClick} {...boxProps}> { children } </StyledDiv>
// }

const _Box: ForwardRefRenderFunction<HTMLDivElement, BoxProps> = ({
  row,
  wrap,
  xalign,
  yalign,
  ratio,
  onClick,
  ...rest
}, ref) => {
  const boxProps: BoxProps & { aspectRatio?: number } = {
    flexDirection: row ? 'row' : 'column',
    flexWrap: wrap ? 'wrap' : 'nowrap',
    alignItems: row ? yalign : xalign,
    justifyContent: row ? xalign : yalign,
    aspectRatio: ratio,
    ...rest,
  }

  return <StyledDiv onClick={onClick} ref={ref} {...boxProps} />
}

export const Box = forwardRef(_Box)
