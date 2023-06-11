import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import updateQuery from '@/lib/update-query'

import BoardService from '../board-service'
import { CardWithColumn } from '../types'

const useCardModal = () => {
  const { query } = useRouter()
  const boardId = query.id as string
  const cardId = query.cardId as string

  const { data, isLoading } = useQuery<CardWithColumn>(
    ['card', query.cardId],
    () => BoardService.getCard(boardId, cardId),
    {
      enabled: Boolean(query.cardId) && Boolean(query.id),
    }
  )

  const isModalOpen = useMemo(
    () => Boolean(cardId) && Boolean(boardId) && Boolean(data),
    [boardId, cardId, data]
  )

  const closeModal = () => updateQuery({ cardId: '' })

  return {
    card: data,
    isModalOpen,
    isLoading,
    actions: {
      closeModal,
    },
  }
}

export default useCardModal
