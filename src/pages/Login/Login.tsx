import { Field, Form, Input } from '@/components'
import { PATHS } from '@/constants/path'
import { useUserStore } from '@/stores/user'
import { loginAuth } from '@/stores/user'
import { FC, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login: FC = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const {
    state: { isAuth, error },
    dispatch,
  } = useUserStore()
  const redirect = useNavigate()
  const [errorMsg, setErrorMsg] = useState<string>()

  useEffect(() => {
    if (emailRef.current?.value.length && passwordRef.current?.value.length) {
      setErrorMsg(error?.message)
    }
  }, [error])

  useEffect(() => {
    isAuth && redirect(PATHS.WEBINAR)
  }, [isAuth])

  const handleSubmit = (): void => {
    if (!emailRef.current?.value.length) {
      emailRef.current && emailRef.current.focus()
      return
    }
    if (!passwordRef.current?.value.length) {
      passwordRef.current && passwordRef.current.focus()
      return
    }
    dispatch(
      loginAuth({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
    )
  }
  return (
    <Form
      title="Login for a Webinar now"
      subtitle="Please fill in the form below."
      errorMessage={errorMsg}
      buttonProps={{
        title: 'Login',
        borderWidth: '1px',
        borderColor: 'blue.0',
        borderStyle: 'solid',
        onClick: handleSubmit,
      }}
    >
      <Field label="Email">
        <Input ref={emailRef} />
      </Field>
      <Field label="Password">
        <Input ref={passwordRef} />
      </Field>
    </Form>
  )
}
