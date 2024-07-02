import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routes from '@/routes'
import PermissionRoute from '@/shared/PermissionRoute/PermissionRoute'
import { UserProvider } from '@/stores/user'
import { ThemeProvider } from 'styled-components'
import theme from '@/styles/theme'
import { Header } from '@/components'

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UserProvider>
          <Header />
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <PermissionRoute {...route}>
                    <route.component />
                  </PermissionRoute>
                }
              />
            ))}
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
