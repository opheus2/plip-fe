import { ArrowSmUpIcon, ArrowSmDownIcon } from '@heroicons/react/solid'
import React from 'react'
import { formatDate } from '../utils/helper'

function SingleFinanceTransaction({ transaction }) {
    return (
      <li className="py-4">
         <div className="flex space-x-3">
            {transaction.type === 'credit' ? (
               <ArrowSmUpIcon
                  className="self-center flex-shrink-0 h-5 w-5 text-green-500"
                  aria-hidden="true"
               />
            ) : (
               <ArrowSmDownIcon
                  className="self-center flex-shrink-0 h-5 w-5 text-red-500"
                  aria-hidden="true"
               />
            )}
            <div className="flex-1 space-y-1">
               <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">
                     <span className="text-xs">&#8358;</span>
                     {transaction.amount}
                  </h3>
                  <p className="text-sm text-gray-500">
                     {formatDate(transaction.date)}
                  </p>
               </div>
               <p className="text-sm text-gray-500">{transaction.narration}</p>
            </div>
         </div>
      </li>
   )
}

export default React.memo(SingleFinanceTransaction)
