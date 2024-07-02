import { WebError } from "@/services/base"
import { ACTION_TYPES, Action } from "@/stores/user"
import { RespUser } from "@/apis/user"
import { ENTITY, getItem, removeAllItem, setItem } from "@/services/storage"

export interface State {
  user: RespUser
  error?: WebError
  isLoading: boolean
  isAuth: boolean
  isReady: boolean
}

export const initialState: State = {
  user: {
    id: 0,
    name: '',
    username: '',
    email: '',
    password: '',
  },
  error: undefined,
  isLoading: false,
  isAuth: false,
  isReady: false,
}

const successState = {
  error: undefined,
  isLoading: false,
  isReady: true,
}

export const userReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION_TYPES.INIT_STORE: {
      const user = getItem<RespUser>(ENTITY.USER)
      const auth = getItem(ENTITY.AUTHORIZATION)
      return {
        ...action.payload,
        user: user || initialState.user,
        isAuth: !!auth,
        isReady: !auth,
      }
    }
    case ACTION_TYPES.USER_REQUEST: {
      return { ...state, error: undefined, isLoading: true }
    }
    case ACTION_TYPES.USER_FAILURE: {
      removeAllItem()
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isAuth: false,
        isReady: true,
      }
    }
    case ACTION_TYPES.SIGN_IN_SUCCESS: {
      setItem(ENTITY.USER, action.payload.user)
      setItem(ENTITY.AUTHORIZATION, action.payload.token)
      return {
        ...state,
        ...successState,
        user: action.payload.user,
        isAuth: true,
      }
    }
    case ACTION_TYPES.SIGN_OUT_SUCCESS: {
      removeAllItem()
      return {
        ...initialState,
        ...successState,
        isAuth: false,
      }
    }
    case ACTION_TYPES.GET_USER_STATUS_SUCCESS: {
      return {
        ...state,
        ...successState,
        isReady: true,
      }
    }
    default:
      throw new Error()
  }
}