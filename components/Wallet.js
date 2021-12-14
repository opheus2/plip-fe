import React from 'react'
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'
import {
   CursorClickIcon,
   MailOpenIcon,
   UsersIcon,
   CreditCardIcon,
} from '@heroicons/react/outline'
import { BarLoader, ClipLoader, DotLoader } from 'react-spinners'
import { classNames } from '../utils/helper'
import { useSetRecoilState } from 'recoil'
import { selectedWalletState } from '../libs/walletState'
import { useRouter } from 'next/router'

function Wallet({ wallet }) {
   const router = useRouter()
   const setSelectedWallet = useSetRecoilState(selectedWalletState)
   const handleViewTransactions = () => {
      setSelectedWallet(wallet)
      router.push('/app/finances')
   }
   return wallet.status == 'AVAILABLE' ? (
      <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
         <dt>
            <div className="absolute bg-indigo-500 rounded-md p-3">
               <CreditCardIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
               />
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">
               {wallet.account_number}
            </p>
         </dt>
         <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-xl font-semibold text-gray-900">
               <span className="text-sm">&#8358;</span>
               {wallet.balance}
            </p>
            <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
               <div className="text-sm">
                  <a
                     href="#"
                     className="font-medium text-indigo-600 hover:text-indigo-500"
                     onClick={handleViewTransactions}
                  >
                     {' '}
                     View Transactions
                     <span className="sr-only">
                        {' '}
                        {wallet.accountNumber} stats
                     </span>
                  </a>
               </div>
            </div>
         </dd>
      </div>
   ) : (
      <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
         <dt>
            <div className="absolute bg-indigo-500 rounded-md p-3">
               <CreditCardIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
               />
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">
               Wallet Name
            </p>
         </dt>
         <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">status</p>
            <p
               className={classNames(
                  'text-green-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
               )}
            >
               <ArrowSmDownIcon
                  className="self-center flex-shrink-0 h-5 w-5 text-red-500"
                  aria-hidden="true"
               />
               <span className="sr-only">Increased by</span>
               Increased by
            </p>
            <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
               <div className="text-sm">
                  <a
                     href="#"
                     className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                     {' '}
                     View Transactions
                     <span className="sr-only"> stats</span>
                  </a>
               </div>
            </div>
         </dd>
         <div className="absolute inset-0 bg-slate-200 flex flex-col items-center justify-center gap-3">
            <p className="text-sm">Synchronizing...</p>
            <BarLoader color="#007aff" />
         </div>
      </div>
   )
}

export default Wallet
