import { ParamsLogin, apiAuthEmailLogin, apiAuthMe } from '@/apis/user'
import { removeAllItem } from '@/services/storage'
import { Dispatch } from 'react'
import { ACTION_TYPES, Action, State } from '@/stores/user'

export type BindDispatchState = (dispatch: Dispatch<Action>, state: State) => void
export type Dispatcher<P> = (payload: P) => BindDispatchState

export const initUserStore: Dispatcher<void> = () => (dispatch, state) => {
  const initState = {
    ...state,
  }
  dispatch({ type: ACTION_TYPES.INIT_STORE, payload: initState })
}

export const loginAuth: Dispatcher<ParamsLogin> = (payload) => async (dispatch) => {
  dispatch({ type: ACTION_TYPES.USER_REQUEST })
  await apiAuthEmailLogin(payload)
    .then((resp) => {
      dispatch({ type: ACTION_TYPES.SIGN_IN_SUCCESS, payload: resp })
    })
    .catch((error) => dispatch({ type: ACTION_TYPES.USER_FAILURE, payload: error }))
}

export const getUserStatus: Dispatcher<void> = () => async (dispatch) => {
  dispatch({ type: ACTION_TYPES.USER_REQUEST })
  await apiAuthMe()
    .then(() => dispatch({ type: ACTION_TYPES.GET_USER_STATUS_SUCCESS }))
    .catch((error) => dispatch({ type: ACTION_TYPES.USER_FAILURE, payload: error }))
}

export const signOut: Dispatcher<void> = () => async (dispatch) => {
  dispatch({ type: ACTION_TYPES.USER_REQUEST })

  // workaround: api not found
  removeAllItem()
  dispatch({ type: ACTION_TYPES.SIGN_OUT_SUCCESS })

  // TODO: API NOT FOUND
  // apiAuthLogout()
  //   .then(() => dispatch({ type: ACTION_TYPES.SIGN_OUT_SUCCESS }))
  //   .catch((error) => dispatch({ type: ACTION_TYPES.USER_FAILURE, payload: error }))
}

