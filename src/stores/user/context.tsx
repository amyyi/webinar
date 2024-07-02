import { FC, ReactNode, Reducer, createContext, useContext, useEffect, useReducer } from 'react'
import { Action, BindDispatchState, getUserStatus, initUserStore } from '@/stores/user'
import { State, initialState, userReducer } from './reducers'
export type ProviderDispatch = (bind: BindDispatchState) => void

interface ContextProps {
  state: State
  dispatch: ProviderDispatch
}

const UserContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => {},
})

export const useUserStore = (): ContextProps => useContext(UserContext)

export const UserProvider: FC<{ children: ReactNode }> = (props) => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(userReducer, initialState)
  const providerDispatch: ProviderDispatch = (bind) => bind(dispatch, state)

  useEffect(() => {
    providerDispatch(initUserStore())
  }, [])

  useEffect(() => {
    state.isAuth && providerDispatch(getUserStatus())
  }, [state.isAuth])

  const contextValue = {
    state,
    dispatch: providerDispatch,
  }

  return <UserContext.Provider value={contextValue} {...props} />
}
