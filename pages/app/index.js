import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import MonoConnect from '@mono.co/connect.js'
import DashboardNav from '../../components/DashboardNav'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { userState, userTokenState } from '../../libs/userState'
import { userWallets, activeWallets } from '../../libs/walletState'
import { useRouter } from 'next/router'
import { isEmptyObj } from '../../utils/helper'
import Http from '../../Utils/Http'
import { ClipLoader } from 'react-spinners'
import Wallets from '../../components/Wallets'

export default function App() {
   const router = useRouter()
   const user = useRecoilValue(userState)
   const userToken = useRecoilValue(userTokenState)
   const wallets = useRecoilValue(userWallets)
   const setWallets = useSetRecoilState(activeWallets)
   const [loadingWallets, setLoadingWallets] = useState(true)

   const monoInstance = useMemo(() => {
      return new MonoConnect({
         onSuccess: async ({ code }) => {
            const walletsClone = [...wallets]
            console.log(walletsClone)
            await Http()
               .post(`/wallets/connect`, {
                  code: code,
               })
               .then((response) => {
                  const newWallet = response.data.data.wallet
                  setWallets((oldWallets) => [...oldWallets, newWallet])
                  setLoadingWallets(false)
               })
         },
         key: process.env.NEXT_PUBLIC_MONO_PUBLIC_KEY,
      })
   }, [])

   useEffect(() => {
      if (isEmptyObj(user)) {
         router.push('/login')
      }

      const fetchWallets = async () => {
         await Http()
            .get(`/wallets`)
            .then((response) => {
               setWallets(response.data.data.wallets)
               setLoadingWallets(false)
            })
      }

      monoInstance.setup()

      fetchWallets()
   }, [user])

   return (
      <>
         <DashboardNav />

         {/* // */}
         <main className="-mt-32">
            <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
               <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
                  <div className="min-h-96 border-4 border-dashed border-gray-200 py-6 px-6 rounded-lg flex flex-col">
                     <h3 className="text-lg leading-6 font-medium text-gray-900 pb-4">
                        Cards & Accounts
                     </h3>
                     <div className="flex flex-col lg:flex-row gap-4 justify-start">
                        <div className="flex items-center justify-center">
                           <button
                              className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              onClick={() => monoInstance.open()}
                              disabled={loadingWallets}
                           >
                              Connect an account
                           </button>
                        </div>
                        <div className="flex items-center">
                           <ClipLoader
                              color="#007aff"
                              loading={loadingWallets}
                              size={20}
                           />
                           {!loadingWallets && <Wallets />}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </>
   )
}
