import { API } from '@/lib/api'

import { Credentials, UserData } from './types'

const signUp = async (userData: UserData) => {
  const { data } = await API.post('/account', userData)

  return data
}

const signIn = async (credentials: Credentials) => {
  const { data } = await API.post('/account/session', credentials)

  return data
}

const signOut = async () => {
  const { data } = await API.delete('/account/session')

  return data
}

const AccountService = {
  signIn,
  signUp,
  signOut,
}

export default AccountService
