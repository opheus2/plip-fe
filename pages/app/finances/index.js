import React, { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import DashboardNav from '../../../components/DashboardNav'
import { navigation } from '../../../libs/appMenu'
import Http from '../../../utils/Http'
import {
   selectedWalletState,
   walletTransactionState,
} from '../../../libs/walletState'
import {
   expenseCategoryTypes,
   selectedTransactionCategory,
} from '../../../libs/transactionState'
import FinanceTransactionsList from '../../../components/FinanceTransactionsList'
import FinanceExpenseTypes from '../../../components/FinanceExpenseTypes'


function Finances() {
   const wallet = useRecoilValue(selectedWalletState)

   navigation.map((n) => {
      n.current = false
      if (n.key == 'finances') {
         n.current = true
      }
   })

   return (
      wallet && (
         <div>
            <>
               <div className="min-h-full">
                  <DashboardNav />

                  {/* // */}
                  <main className="-mt-32">
                     <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
                           <div className="min-h-96 border-4 border-dashed border-gray-200 py-6 px-6 rounded-lg flex flex-col">
                              <div className="flex flex-col text-sm leading-6 font-medium text-gray-900 pb-4">
                                 <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-3 lg:grid-cols-3">
                                    <p>
                                       Account Number:{' '}
                                       <span className="font-normal">
                                          {wallet.accountNumber}
                                       </span>
                                    </p>
                                    <p>
                                       Account Name:{' '}
                                       <span className="font-normal">
                                          {wallet.name}
                                       </span>
                                    </p>
                                    <p>
                                       Account Balance:{' '}
                                       <span className="font-normal">
                                          <span className="text-xs">
                                             &#8358;
                                          </span>
                                          {wallet.balance}
                                       </span>
                                    </p>
                                 </div>
                                 <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-3 lg:grid-cols-3">
                                    <p>
                                       Total Annual Transactions:{' '}
                                       <span className="font-normal">
                                          {wallet.transactions_count}
                                       </span>
                                    </p>
                                    <p>
                                       Total Credits:{' '}
                                       <span className="font-normal">
                                          {wallet.total_credits}
                                       </span>
                                    </p>
                                    <p>
                                       Total Debits:{' '}
                                       <span className="font-normal">
                                          {wallet.total_debits}
                                       </span>
                                    </p>
                                 </div>
                              </div>
                              <div className="flex flex-col lg:flex-row gap-4 justify-start">
                                 <div className="flex flex-col w-full">
                                    <FinanceExpenseTypes />
                                    <FinanceTransactionsList />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </main>
               </div>
            </>
         </div>
      )
   )
}

export default Finances
