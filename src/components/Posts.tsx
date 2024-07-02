import { FC, useEffect, useRef } from 'react'
import { styled } from 'styled-components'
import { Box } from './Box'
import { Card } from './Card'
import { ConvertedPost } from '@/shared/PermissionRoute/types'

const StyledScrollBox = styled(Box)`
  overflow: auto;
  background: #f2f2f2;
`

interface PostsProps {
  posts: ConvertedPost
  loadMoreItems?: () => void
  onClick?: (id: number, page: number) => void
}

export const Posts: FC<PostsProps> = ({ posts, loadMoreItems, onClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!scrollRef.current) return

    const handleScroll = () => {
      if (!scrollRef.current) return
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      if (scrollLeft + clientWidth >= scrollWidth - 1) {
        loadMoreItems?.()
      }
    }

    scrollRef.current.addEventListener('scrollend', handleScroll)
    return () => {
      scrollRef.current && scrollRef.current.removeEventListener('scrollend', handleScroll)
    }
  }, [loadMoreItems])

  return (
    <StyledScrollBox ref={scrollRef} xalign="center">
      <Box row width="60%">
        {!!posts.length &&
          posts.map((item) => {
            return <Card key={item.id} item={item} scrollTo={onClick} />
          })}
      </Box>
    </StyledScrollBox>
  )
}
