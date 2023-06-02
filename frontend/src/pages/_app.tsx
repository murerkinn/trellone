import { NextPage } from 'next'
import type { AppProps } from 'next/app'

import DefaultLayout from '@/layouts/default'
import { LayoutProps } from '@/layouts/types'
import QueryProvider from '@/lib/query-provider'

export type Page = NextPage & {
  Layout?: React.FC<LayoutProps>
}

interface MyAppProps extends AppProps {
  Component: Page
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const Layout = Component.Layout || DefaultLayout

  return (
    <QueryProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryProvider>
  )
}

export default MyApp
