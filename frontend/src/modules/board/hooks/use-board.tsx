import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import BoardService from '../board-service'

const useBoard = () => {
  const { query } = useRouter()

  const { data, isLoading } = useQuery(
    ['board', query.id],
    () => BoardService.getBoard(query.id as string),
    {
      enabled: !!query.id,
    }
  )

  return {
    board: data,
    isLoading,
  }
}

export default useBoard
