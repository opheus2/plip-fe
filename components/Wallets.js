import {
   CursorClickIcon,
   MailOpenIcon,
   UsersIcon,
} from '@heroicons/react/outline'
import { CreditCardIcon } from '@heroicons/react/solid'
import { useRecoilValue } from 'recoil'
import { userWallets } from '../libs/walletState'
import Wallet from './Wallet'

const walletFaker = [
   {
      id: 1,
      name: 'Total Subscribers',
      stat: '71,897',
      icon: CreditCardIcon,
      change: '122',
      changeType: 'increase',
      status: 'NOT AVAILABLE',
   },
   {
      id: 2,
      name: 'Avg. Open Rate',
      stat: '58.16%',
      icon: CreditCardIcon,
      change: '5.4%',
      changeType: 'increase',
      status: 'AVAILABLE',
   },
   {
      id: 3,
      name: 'Avg. Click Rate',
      stat: '24.57%',
      icon: CreditCardIcon,
      change: '3.2%',
      changeType: 'decrease',
      status: 'NOT AVAILABLE',
   },
]

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
