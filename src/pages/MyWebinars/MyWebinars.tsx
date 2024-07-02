import { RespPost, RespPosts, apiFavouritePosts, apiUnFavourite } from '@/apis/post'
import { Box, Posts } from '@/components'
import { ConvertedPost } from '@/shared/PermissionRoute/types'
import { useUserStore } from '@/stores/user'
import { FC, useEffect, useState } from 'react'
import useSWR from 'swr'

export const MyWebinars: FC = () => {
  const {
    state: { user },
  } = useUserStore()
  const { data, mutate } = useSWR<RespPosts>(
    `/posts?favourited?favourited=1&author=${user.id}`,
    apiFavouritePosts,
  )
  const [posts, setPosts] = useState<ConvertedPost>([])

  useEffect(() => {
    const a = async () => {
      await apiFavouritePosts(`/posts?favourited`).then((data) => console.log(data))
    }
    a()
    if (!data?.data) {
      return
    }
    const unFavouritedDate = data.data.reduce(
      (all, current) => {
        // TODO favourited is false at all. I comment the code to implement UI.
        // if (!current.favourited) return all
        return all.concat({
          ...current,
          current_Page: data.meta.pagination.current_page,
        })
      },
      [] as (RespPost & { current_Page: number })[],
    )
    setPosts((prev) => prev.concat(unFavouritedDate))
  }, [data?.data])

  const updateItemStatus = async (id: number, mutatePage: number) => {
    apiUnFavourite({ id })
      .then(() => {
        mutate(data, true)
      })
      .catch((error) => console.error(error))
  }

  return (
    <Box>
      <Posts posts={posts} onClick={updateItemStatus} />
    </Box>
  )
}
