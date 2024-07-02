import { FC, ReactNode } from 'react'
import { Box, Texts } from '@/components'

export type FieldProps = {
  label?: string
  footnote?: string
  children?: ReactNode
}

export const Field: FC<FieldProps> = ({ label, footnote, children }) => {
  return (
    <Box width="60%" mb="20px">
      {!!label && (
        <Box mb="8px">
          <Texts.Body2 color="gray.4">{label}</Texts.Body2>
        </Box>
      )}
      {children}
      {!!footnote && (
        <Texts.Body3 color="warning.0" mt="4px">
          {footnote}
        </Texts.Body3>
      )}
    </Box>
  )
}
