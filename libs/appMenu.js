import { atom } from 'recoil'

export const navigation = [
   { name: 'Overview', href: '#', current: true },
   { name: 'Finances', href: '#', current: false },
   { name: 'Goals', href: '#', current: false },
   { name: 'Badges', href: '#', current: false },
   { name: 'Accounts', href: '#', current: false },
]
export const userNavigation = [
   { name: 'Your Profile', href: '#' },
   { name: 'Settings', href: '#' },
   { name: 'Sign out', href: '#' },
]

export const navMenuState = atom({
   key: 'navMenu',
   default: navigation,
})

export const userNavState = atom({
   key: 'userNav',
   default: userNavigation,
})
