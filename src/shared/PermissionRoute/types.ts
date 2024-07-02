import { RespPost } from "@/apis/post"

export interface PostItem extends RespPost {
  current_Page: number
}
export type ConvertedPost = PostItem[]
