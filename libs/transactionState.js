import { atom, selector } from 'recoil'
import Http from '../utils/Http'

export const selectedTransactionCategory = atom({
   key: 'selectedTransactionCategory',
   default: {
      id: null,
      name: 'Latest',
      count: null,
   },
})

export const expenseCategoryTypes = atom({
   key: 'expenseCategories',
   default: [
      {
         id: null,
         name: 'Latest',
         count: null,
      },
   ],
})
