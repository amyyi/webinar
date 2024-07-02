import { BasicButtonProps, Box, Button, Texts } from '@/components'
import { FC, ReactNode } from 'react'
import styled from 'styled-components'

const Container = styled(Box)`
  width: 60%;
  background: ${({ theme }) => theme.colors.white[0]};
  border: 1px solid #dbdbdb;
  box-shadow: 0px 4px 14px rgba(132, 132, 132, 0.5);
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
`
interface FormProps {
  title: string
  subtitle: string
  errorMessage?: string
  buttonProps: BasicButtonProps
  children?: ReactNode
}

export const Form: FC<FormProps> = ({
  title,
  subtitle,
  errorMessage,
  buttonProps: { title: buttonText, onClick, ...rest },
  children,
}) => {
  return (
    <Box m="auto" mt="16px" xalign="center" yalign="center">
      <Container>
        <Texts.H2 mb="20px" color="blue.1">
          {title}
        </Texts.H2>
        <Texts.Body2 mb="40px" color="gray.3">
          {subtitle}
        </Texts.Body2>
        {children}
        <Button
          title={buttonText}
          textProps={{ color: 'white.0' }}
          bg="blue.0"
          width="60%"
          py="8px"
          onClick={onClick}
          {...rest}
        />
        <Texts.Body3 mt="20px" color="warning.0">
          {errorMessage}
        </Texts.Body3>
      </Container>
    </Box>
  )
}
