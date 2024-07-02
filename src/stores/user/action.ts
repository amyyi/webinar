import { WebError } from "@/services/base"
import { State } from "@/stores/user"
import { RespLogin } from "@/apis/user"

export enum ACTION_TYPES {
  INIT_STORE = 'USER/INIT_STORE',

  USER_REQUEST = 'USER/USER_REQUEST',
  USER_FAILURE = 'USER/USER_FAILURE',
  USER_CANCEL = 'USER/USER_CANCEL',

  SIGN_IN_SUCCESS = 'USER/SIGN_IN_SUCCESS',
  SIGN_OUT_SUCCESS = 'USER/SIGN_OUT_SUCCESS',

  GET_USER_STATUS_SUCCESS = 'USER/GET_USER_STATUS_SUCCESS',

}

export type Action =
  | { type: ACTION_TYPES.INIT_STORE; payload: State }
  | { type: ACTION_TYPES.USER_REQUEST }
  | { type: ACTION_TYPES.USER_FAILURE; payload: WebError }
  | { type: ACTION_TYPES.SIGN_IN_SUCCESS; payload: RespLogin }
  | { type: ACTION_TYPES.SIGN_OUT_SUCCESS }
  | { type: ACTION_TYPES.GET_USER_STATUS_SUCCESS; }