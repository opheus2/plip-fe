import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { useDeepCompareEffect } from 'react-use'
import { useRecoilValue } from 'recoil'
import { selectedTransactionCategory } from '../libs/transactionState'
import { selectedWalletState } from '../libs/walletState'
import Http from '../utils/Http'
import SingleFinanceTransaction from './SingleFinanceTransaction'

function FinanceTransactionsList() {
   const selectedCategory = useRecoilValue(selectedTransactionCategory)
   const wallet = useRecoilValue(selectedWalletState)
   const [isLoading, setIsLoading] = useState(false)
   const [transactions, setTransactions] = useState([])
   const [transactionsPayload, setTransactionsPayload] = useState([])
   const [currentPage, setCurrentPage] = useState(1)

   useEffect(() => {
      const fetchTransactions = async () => {
         setIsLoading(true)
         await Http()
            .get(
               `/wallets/${
                  wallet.account_id
               }/transactions?page=${currentPage}&category=${
                  selectedCategory.id ? selectedCategory.id : ''
               }`
            )
            .then((response) => {
               console.log(response.data)
               setTransactions(response.data.data.transactions.data)
               setTransactionsPayload(response.data.data.transactions)
               setIsLoading(false)
            })
            .catch((error) => {})
      }

      fetchTransactions()
   }, [selectedCategory])

   return (
      <div className="w-full">
         {isLoading ? (
            <div className="flex items-center justify-center mt-6">
               <div>
                  <ClipLoader color="#007aff" loading={isLoading} size={20} />
               </div>
            </div>
         ) : (
            <ul role="list" className="divide-y divide-gray-200">
               {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                     <SingleFinanceTransaction
                        transaction={transaction}
                        key={transaction.id}
                     />
                  ))
               ) : (
                  <div className="px-2 py-6">
                     You have no expense in this category
                  </div>
               )}
               <div className="items-center justify-center space-x-3 pt-4 hidden">
                  <div className="bg-indigo-500 text-white px-2 py-1 rounded-md cursor-pointer">
                     {' '}
                     Prev Page
                  </div>
                  <div className="bg-indigo-500 text-white px-2 py-1 rounded-md cursor-pointer">
                     {' '}
                     Next Page
                  </div>
               </div>
            </ul>
         )}
      </div>
   )
}

export default React.memo(FinanceTransactionsList)
