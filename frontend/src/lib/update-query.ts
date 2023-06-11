import router from 'next/router'
import { ParsedUrlQuery } from 'querystring'

export default function updateQuery(newQueryParams: ParsedUrlQuery) {
  const query = { ...router.query }

  for (const key in newQueryParams) {
    if (!newQueryParams[key]) {
      delete query[key]
      continue
    }

    query[key] = newQueryParams[key]
  }

  if (JSON.stringify(query) == JSON.stringify(router.query)) return false

  router.push({ query }, undefined, { shallow: true })

  return true
}
