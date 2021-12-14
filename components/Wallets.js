import { useRecoilValue } from 'recoil'
import { userWallets } from '../libs/walletState'
import Wallet from './Wallet'

function Wallets() {
   const wallets = useRecoilValue(userWallets)
   return (
      <div>
         <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-3">
            {wallets && wallets.map((item) => (
               <Wallet wallet={item} key={item.id} />
            ))}
         </dl>
      </div>
   )
}

export default Wallets
