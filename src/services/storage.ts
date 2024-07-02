export enum ENTITY {
  AUTHORIZATION = 'authorization',
  USER = 'user'
}

export const setItem = <T>(key: string, value: T) => {
  const strObj = JSON.stringify(value)
  localStorage.setItem(key, strObj)
}

export const getItem = <T>(key: string): T | null => {
  const strObj = localStorage.getItem(key)
  if(!strObj) return null
  const jsonStr = strObj.replace(/(\w+):/g, '"$1":')
  return JSON.parse(jsonStr)
}

export const removeAllItem = (): void => {
  localStorage.removeItem(ENTITY.AUTHORIZATION)
  localStorage.removeItem(ENTITY.USER)
}