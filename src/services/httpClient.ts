import axios, { AxiosRequestConfig } from 'axios'
import { ENTITY, getItem } from './storage'

export const request = async <T, R>(
  option: AxiosRequestConfig<T> & { isNeedAuth?: boolean },
): Promise<R> => {
  const { url, method, data } = option
  const config: AxiosRequestConfig = {
    baseURL: '/api',
    timeout: 10000,
    url,
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(option.isNeedAuth && {
        Authorization: `Bearer ${getItem(ENTITY.AUTHORIZATION)}`,
      }),
    },
    data: data ? JSON.stringify(data) : undefined,
  }

  return axios(config)
    .then((response) => {
      return Promise.resolve(response.data)
    })
    .catch((error) => {
      if (typeof error.response.data !== 'object') {
        // api server is down
        return Promise.reject({
          code: error.response.status,
          message: error.response.data,
        })
      }
      // custom error from api server
      return Promise.reject(error.response.data)
    }).finally(() => Promise.resolve('123'))
}

