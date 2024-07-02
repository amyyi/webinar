import { PATHS } from '@/constants/path'
import { useUserStore } from '@/stores/user'
import { FC } from 'react'
import { Navigate } from 'react-router-dom'

interface Props {
  needLogin: boolean
  children?: React.ReactNode
}

const PermissionRoute: FC<Props> = ({ children, needLogin, ...rest }) => {
  const {
    state: { isAuth, isReady },
  } = useUserStore()

  if (needLogin && !isReady) return null
  if (needLogin && !isAuth) {
    return (
      <Navigate
        to={{
          pathname: PATHS.LOGIN,
        }}
        replace={true}
      />
    )
  }
  return <>{children}</>
}

export default PermissionRoute
