import { atom, selector, selectorFamily } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

const userTokenKey = 'plip.userToken'
const userKey = 'plip.user'

//Handle User Token
export const userTokenState = atom({
   key: userTokenKey,
   default: null,
   effects_UNSTABLE: [persistAtom],
})

export const userToken = selector({
   key: 'handleUserToken',
   get: ({ get }) => {
      return get(userTokenState)
   },
   set: ({ set }, token) => {
      set(userTokenState, token)
   },
})

//Handle User
export const userState = atom({
   key: userKey,
   default: null,
   effects_UNSTABLE: [persistAtom],
})

export const user = selector({
   key: 'handleUser',
   get: ({ get }) => {
      return get(userState)
   },
   set: ({ set }, user) => {
      set(userState, user)
   },
})

export const updateUserState = () => {
   const handleUser = (user) => {
      setUser(user)
      localStorage.setItem('tm.user', JSON.stringify(user))
   }

   const handleUserToken = (token) => {
      setUserToken(token)
      localStorage.setItem('tm.userToken', JSON.stringify(token))
   }
}
