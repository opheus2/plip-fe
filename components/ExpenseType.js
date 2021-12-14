import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { selectedTransactionCategory } from '../libs/transactionState'
import { classNames } from '../utils/helper'

function ExpenseType({ mobile, expenseType, handleSelect }) {
   const selectedCategory = useRecoilValue(selectedTransactionCategory)
   
   if (mobile) {
      return (
         <option key={expenseType.name}>
            {expenseType.name}
         </option>
      )
   }

    return (
        <a
            key={expenseType.name}
            href="#"
            className={classNames(
                expenseType.name == selectedCategory.name
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
                'whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm'
            )}
            aria-current={
                expenseType.name == selectedCategory.name ? 'page' : undefined
            }
            onClick={() => handleSelect(expenseType)}
      >
         {expenseType.name}
         {expenseType.count ? (
            <span
               className={classNames(
                  expenseType.name == selectedCategory.name
                     ? 'bg-indigo-100 text-indigo-600'
                     : 'bg-gray-100 text-gray-900',
                  'hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block'
               )}
            >
               {expenseType.count}
            </span>
         ) : null}
      </a>
   )
}

export default ExpenseType
