import { Api } from "@/services/base"
import { request } from "@/services/httpClient"

export interface RespPost {
  id: number
  title: string
  content: string
  created_at: string
  favourited: boolean
}

export interface RespPosts {
  data: RespPost[]
  meta: {
    pagination: {
      total: number
      count: number
      pre_page: number
      current_page: number
      total_pages: number
    }
  }
}

interface ParamsFavoritePosts {
  id: number
}

export const apiFavoritePosts: Api<ParamsFavoritePosts, void> = (payload) =>
  request({
    url: `/favourites/posts/${payload.id}`,
    method: 'POST',
    isNeedAuth: true,
  })

export const apiGetUrl = async (url: [string, number]) => {
  // ['/posts?per_page=12&page=1', 1]
  console.log('url', url)
  const response = await request<string, RespPosts>({
    url: url[0],
    method: 'GET',
    isNeedAuth: true,
  })
  return response
}

// export const apiGetUrl = async (url: string) => {
//   // ['/posts?per_page=12&page=1', 1]
//   console.log('url', url)
//   const response = await request<string, RespPosts>({
//     url,
//     method: 'GET',
//     isNeedAuth: true,
//   })
//   return response
// }

export const apiFavouritePosts = async (url: string) => {
  const response = await request<string, RespPosts>({
    url,
    method: 'GET',
    isNeedAuth: true,
  })
  return response
}

export const apiUnFavourite: Api<ParamsFavoritePosts, void> = (payload) =>
  request({
    url: `/favourites/posts/${payload.id}`,
    method: 'DELETE',
    isNeedAuth: true,
  })