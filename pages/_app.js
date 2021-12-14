import '../styles/globals.css'
import { ToastContainer } from 'react-toastify'
import { RecoilRoot } from 'recoil'
import Pusher from 'pusher-js'

if (process.browser) {
   window.Pusher = require('pusher-js')
}

function MyApp({ Component, pageProps }) {
   return (
      <>
         <RecoilRoot>
            <Component {...pageProps} />

            <ToastContainer
               position="top-right"
               autoClose={2000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
            />
         </RecoilRoot>
      </>
   )
}

export default MyApp
