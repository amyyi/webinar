import { Box, Button, Texts } from '@/components'
import { PATHS } from '@/constants/path'
import { useUserStore } from '@/stores/user'
import { FC } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { signOut } from '@/stores/user'

const logo = require('../assets/logoCN.png').default

const Logo = styled.img`
  width: 98px;
`

export const Header: FC = () => {
  const {
    state: { isAuth, user, isLoading },
    dispatch,
  } = useUserStore()
  const location = useLocation()
  const redirect = useNavigate()

  const logout = () => {
    dispatch(signOut())
  }

  const renderButton = () => {
    if (location.pathname === PATHS.LOGIN) return null

    return (
      <Button
        width="100px"
        py="4px"
        title={isAuth ? 'Logout' : 'Login'}
        textProps={{ color: 'blue.0' }}
        bg="white.0"
        borderWidth="1px"
        borderColor="blue.2"
        borderStyle="solid"
        onClick={() => (isAuth ? logout() : redirect(PATHS.LOGIN))}
        loading={isLoading}
        disabled={isLoading}
      />
    )
  }

  return (
    <Box row py="12px" bg="white.0" xalign="center">
      <Box row justifyContent="space-between" width="calc(60% - 20px)">
        <Link to={PATHS.WEBINAR}>
          <Logo src={logo} alt="website logo" />
        </Link>
        <Box row yalign="center">
          {isAuth && <Texts.Body2>Hi {user.username}</Texts.Body2>}
          {isAuth && (
            <Button
              width="120px"
              mx={4}
              py="4px"
              title="My Webinars"
              bg="blue.0"
              textProps={{ color: 'white.0' }}
              onClick={() => redirect(PATHS.My_WEBINARS)}
            />
          )}
          {renderButton()}
        </Box>
      </Box>
    </Box>
  )
}
