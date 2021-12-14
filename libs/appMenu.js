import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist
export const navigation = [
   { name: 'Overview', href: '/app', current: true, key: 'app' },
   { name: 'Finances', href: '/app/finances', current: false, key: 'finances' },
   { name: 'Goals', href: '#', current: false, key: 'goals' },
   { name: 'Badges', href: '#', current: false, key: 'badges' },
]
export const userNavigation = [
   { name: 'Your Profile', href: '#' },
   { name: 'Settings', href: '#' },
]




export const navMenuState = atom({
   key: 'navMenu',
   default: [
      { name: 'Overview', href: '/app', current: true, key: 'app' },
      { name: 'Finances', href: '#', current: false, key: 'finances' },
      { name: 'Goals', href: '#', current: false, key: 'goals' },
      { name: 'Badges', href: '#', current: false, key: 'badges' },
   ],
   effects_UNSTABLE: [persistAtom],
})

export const userNavState = atom({
   key: 'userNav',
   default: [
      { name: 'Your Profile', href: '#' },
      { name: 'Settings', href: '#' },
      { name: 'Sign out', href: '#' },
   ],
   effects_UNSTABLE: [persistAtom],
})

export const activeMenuState = atom({
   key: 'navMenu',
   default: { name: 'Overview', href: '#', current: true, key: 'app' },
   effects_UNSTABLE: [persistAtom],
})
