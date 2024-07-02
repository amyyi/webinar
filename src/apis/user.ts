import { Api } from '@/services/base'
import { request } from '@/services/httpClient'

export interface ParamsLogin {
  email: string
  password: string
}

export interface RespUser {
  id: number
  name: string
  username: string
  email: string
  password: string
}

export interface RespLogin {
  user: RespUser
  token: string
}

export const apiAuthEmailLogin: Api<ParamsLogin, RespLogin> = (payload) =>
  request({
    url: `/auth/email/login`,
    method: 'POST',
    data: payload,
  })

export const apiAuthMe = () =>
  request<void, void>({
    url: '/auth/me',
    method: 'POST',
    isNeedAuth: true
  })

// API not found
export const apiAuthLogout = () =>
  request<void, void>({
    url: '/auth/logout',
    method: 'POST',
    isNeedAuth: true
  })

