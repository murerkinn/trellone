import type { AppProps } from 'next/app'

import QueryProvider from '@/lib/query-provider'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <Component {...pageProps} />
    </QueryProvider>
  )
}

export default MyApp
