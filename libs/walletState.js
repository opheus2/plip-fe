import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const userWallets = atom({
   key: 'userWalletsKey',
   default: [],
   effects_UNSTABLE: [persistAtom],
})

export const activeWallets = selector({
   key: 'handleUserWallets',
   get: ({ get }) => get(userWallets),
   set: ({ set }, wallets) => set(userWallets, wallets),
})

export const selectedWalletState = atom({
   key: 'showSingleWallet',
   default: null,
   effects_UNSTABLE: [persistAtom],
})

export const walletTransactionState = atom({
   key: 'walletTransactions',
   default: [],
})
