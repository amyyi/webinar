import { RespPost, RespPosts, apiGetUrl } from '@/apis/post'
import { Box, Posts } from '@/components'
import { ConvertedPost } from '@/shared/PermissionRoute/types'
import { useUserStore } from '@/stores/user'
import throttle from 'lodash/throttle'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite'
import { Register } from './Register'

const PER_PAGE = 12

type ArgumentsTuple = [string, number]

const getKey: SWRInfiniteKeyLoader<ArgumentsTuple> = (index: number) => {
  return [`/posts?per_page=${PER_PAGE}&page=${index + 1}`, index + 1]
}

const WebinarPage: FC = () => {
  const {
    state: { isAuth },
  } = useUserStore()
  const registerRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(1)
  const { data, mutate, size, setSize } = useSWRInfinite<RespPosts>(getKey, apiGetUrl)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [posts, setPosts] = useState<ConvertedPost>([])
  const [selectedTitle, setSelectedTitle] = useState<string>()
  const currentPage = data ? data[page - 1] : null

  useEffect(() => {
    if (!currentPage) return

    const unFavouritedDate = currentPage.data.reduce(
      (all, current) => {
        if (current.favourited) return all
        return all.concat({
          ...current,
          current_Page: currentPage.meta.pagination.current_page,
        })
      },
      [] as (RespPost & { current_Page: number })[],
    )
    setPosts((prev) => prev.concat(unFavouritedDate))
  }, [currentPage])

  const loadMoreItems = useCallback(
    throttle(async () => {
      if (loading || !hasMore) return

      setLoading(true)
      try {
        setPage((prevPage) => prevPage + 1)
        setSize(size + 1)
        if (
          currentPage &&
          currentPage.meta.pagination.current_page === currentPage.meta.pagination.total_pages
        ) {
          setHasMore(false)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }, 200),
    [loading, hasMore, page, size, setSize],
  )

  const setTitle = (id: number, page?: number): void => {
    if (!!page) {
      setSelectedTitle(`${id},${page}`)
      return
    }
    const newSelected = posts?.find((item) => item.id !== id)
    newSelected && setSelectedTitle(`${newSelected.id},${newSelected.current_Page}`)
  }

  const scrollToRegister = (id: number, page: number) => {
    if (!registerRef.current) return
    registerRef.current.scrollIntoView({ behavior: 'smooth' })
    setTitle(id, page)
  }

  const updateItemStatus = async (id: number, mutatePage: number) => {
    mutate(data, {
      revalidate: (pageData, key) => {
        const [url, page] = key as ArgumentsTuple
        return page === mutatePage
      },
    })
    setTitle(id)
  }

  return (
    <Box>
      <Posts posts={posts} loadMoreItems={loadMoreItems} onClick={scrollToRegister} />
      {isAuth && (
        <Register
          updatePost={updateItemStatus}
          ref={registerRef}
          posts={posts}
          post={selectedTitle}
        />
      )}
    </Box>
  )
}

export default WebinarPage
