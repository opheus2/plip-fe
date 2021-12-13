import { atom } from 'recoil'

export const emailState = atom({
   key: 'email',
   default: null,
})

export const emailVerifiedState = atom({
   key: 'emailVerified',
   default: false,
})
