import dynamic from 'next/dynamic'

import CardModal from '@/modules/board/components/card-modal'
import useBoard from '@/modules/board/hooks/use-board'

const Board = dynamic(() => import('@/modules/board/components/board'), {
  ssr: false,
})

const BoardPage = () => {
  const { board, isLoading } = useBoard()

  return (
    <>
      <main
        style={{
          backgroundImage:
            'url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/079fe7f3e39a61d7c72eb58398ae8cfa/photo-1682001426601-c7fdc9ea5b4e.jpg)',
          backgroundSize: 'cover',
        }}
      >
        <Board data={board} isLoading={isLoading} />
        <CardModal />
      </main>
    </>
  )
}

export default BoardPage
