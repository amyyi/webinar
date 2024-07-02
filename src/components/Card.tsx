import { Box, TextContent, Texts } from '@/components'
import { PATHS } from '@/constants/path'
import { PostItem } from '@/shared/PermissionRoute/types'
import { useUserStore } from '@/stores/user'
import day from '@/utils/day'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface CardProps {
  item: PostItem
  scrollTo?: (id: number, currentPage: number) => void
}

const StyledCard = styled(Box)`
  flex: 0 0 30%;
  width: 30%;
  margin: 10px;
  padding: 20px;
  background: ${({ theme }) => theme.colors.white[0]};
  border: 1px solid #d6d6d6;
  box-shadow: 1px 2px 6px rgba(219, 219, 219, 0.5);
  border-radius: 4px;
`

const StyledContent = styled(Box)`
  height: 186px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 7;
`

const StyledText = styled(Texts.Body3)`
  display: flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.colors.green[0]};
  cursor: pointer;
`

export const Card: FC<CardProps> = ({ item, scrollTo }) => {
  const {
    state: { isAuth },
  } = useUserStore()
  const redirect = useNavigate()

  const handleClick = (): void => {
    if (!isAuth) {
      redirect(PATHS.LOGIN)
      return
    }
    scrollTo?.(item.id, item.current_Page)
  }

  return (
    <StyledCard>
      <Texts.Body3 mb="20px" color="blue.1">
        {new day(item.created_at).format('DD/MM/YYYY')}
      </Texts.Body3>
      <Texts.Body2 mb="12px" color="blue.1">
        {item.title}
      </Texts.Body2>
      <StyledContent>
        <TextContent mb="20px" color="gray.3" dangerouslySetInnerHTML={{ __html: item.content }} />
      </StyledContent>
      <Texts.Body3 mb="20px" color="gray.3">
        {new day(item.created_at).setDay(10).format('YYYY/MM/dd hh:mm')}
      </Texts.Body3>
      <Box flex={1} yalign="flex-end">
        <StyledText onClick={handleClick}>
          {!item.favourited ? 'Register Now' : 'UnRegister'}
        </StyledText>
      </Box>
    </StyledCard>
  )
}
