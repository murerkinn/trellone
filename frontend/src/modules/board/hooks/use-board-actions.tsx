import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import BoardService from '../board-service'
import { Board, MoveCardToColumnRequest } from '../types'

const useBoardActions = () => {
  const queryClient = useQueryClient()

  const { mutate: moveCardToColumn, isLoading: isMoveActionLoading } =
    useMutation<Board, AxiosError, MoveCardToColumnRequest>(
      data =>
        BoardService.moveCardToColumn(
          data.boardId,
          data.columnFromId,
          data.columnToId,
          data.cardId,
          data.position
        ),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['board'])
        },
      }
    )

  return {
    actions: {
      moveCardToColumn,
    },
    isLoading: isMoveActionLoading,
  }
}

export default useBoardActions
