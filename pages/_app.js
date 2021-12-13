import '../styles/globals.css'
import { ToastContainer } from 'react-toastify'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }) {
   return (
      <>
         <RecoilRoot>
            <div className="min-h-full">
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
            </div>
         </RecoilRoot>
      </>
   )
}

export default MyApp
