import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Http from '../../../Utils/Http'
import { ClipLoader } from 'react-spinners'
import Link from '../../../components/Link'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { emailState, emailVerifiedState } from '../../../libs/authState'
import { replaceItemAtIndex } from '../../../utils/helper'

function verify() {
   const email = useRecoilValue(emailState)
   const setEmailVerified = useSetRecoilState(emailVerifiedState)
   const [isLoading, setIsLoading] = useState(false)
   const [formErrors, setFormErrors] = useState({})
   const router = useRouter()

   useEffect(() => {
      if (!email) {
         router.replace('/register')
         return
      }
      const inputs = document.querySelectorAll('.digit')
      inputs[0].focus()

      for (let i = 0; i < inputs.length; i++) {
         inputs[i].addEventListener('keydown', function (event) {
            if (event.key === 'Backspace') {
               if (inputs[i].value == '') {
                  if (i != 0) {
                     inputs[i - 1].focus()
                  }
               } else {
                  inputs[i].value = ''
               }
            } else if (event.key === 'ArrowLeft' && i !== 0) {
               inputs[i - 1].focus()
            } else if (event.key === 'ArrowRight' && i !== inputs.length - 1) {
               inputs[i + 1].focus()
            } else if (event.key != 'ArrowLeft' && event.key != 'ArrowRight') {
               // inputs[i].setAttribute('type', 'number')s
               inputs[i].value = '' // Bug Fix: allow user to change a random otp digit after pressing it
               // setTimeout(function() {
               //   inputs[i].setAttribute("type", "password");
               // }, 1000); // Hides the text after 1 sec
            }
         })
         inputs[i].addEventListener('input', function () {
            inputs[i].value = inputs[i].value.toUpperCase() // Converts to Upper case. Remove .toUpperCase() if conversion isn't required.
            if (i === inputs.length - 1 && inputs[i].value !== '') {
               return true
            } else if (inputs[i].value !== '') {
               inputs[i + 1].focus()
            }
         })
      }
      return () => {
         for (let i = 0; i < inputs.length; i++) {
            inputs[i].removeEventListener('keydown', function (event) {})
            inputs[i].removeEventListener('input', function () {})
         }
      }
   }, [])
   

   const handleEmailVerification = async (e) => {
      e.preventDefault()
      setFormErrors({})
      setIsLoading(true)
      console.log(window.history);

      const inputs = document.querySelectorAll('.digit')
      let otp = ''
      for (let i = 0; i < inputs.length; i++) {
         otp += inputs[i].value
      }
      const formData = {
         email: email,
         token: otp,
      }

      await Http()
         .post('/auth/email/verify', formData)
         .then(() => {
            setEmailVerified(true)
            setIsLoading(false)
            router.push('/register/complete')
            // moveToNextPageHack()
         })
         .catch((error) => {
            setIsLoading(false)
            if (error.response) {
               setFormErrors(error.response.data.errors)
            }
         })
   }

   return (
      <>
         {email && (
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 auth-bg">
               <div className="sm:mx-auto sm:w-full sm:max-w-md">
                  <h2 className="mt-6 text-center text-2xl font-extrabold text-white">
                     Verify your email
                  </h2>
               </div>

               <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                  <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                     <p className="mt-2 text-center text-sm text-gray-600">
                        Enter the 6 digit code sent to your email
                     </p>
                     <form
                        autoComplete="off"
                        className="space-y-6"
                        onSubmit={async (e) => {
                           await handleEmailVerification(e)
                        }}
                        method="POST"
                     >
                        <div className="w-full flex justify-center">
                           <div className="mt-6 grid grid-cols-3 sm:grid-cols-6 sm:grid-rows-1">
                              <input
                                 type="number"
                                 maxLength="1"
                                 autoComplete="false"
                                 required="required"
                                 className="mx-1 mt-2 rounded shadow-sm digit justify-self-end"
                              />
                              <input
                                 type="number"
                                 maxLength="1"
                                 autoComplete="false"
                                 required="required"
                                 className="mx-1 mt-2 rounded shadow-sm digit justify-self-center"
                              />
                              <input
                                 type="number"
                                 maxLength="1"
                                 autoComplete="false"
                                 required="required"
                                 className="mx-1 mt-2 rounded shadow-sm digit justify-self-start"
                              />
                              <input
                                 type="number"
                                 maxLength="1"
                                 autoComplete="false"
                                 required="required"
                                 className="mx-1 mt-2 rounded shadow-sm digit justify-self-end"
                              />
                              <input
                                 type="number"
                                 maxLength="1"
                                 autoComplete="false"
                                 required="required"
                                 className="mx-1 mt-2 rounded shadow-sm digit justify-self-center"
                              />
                              <input
                                 type="number"
                                 maxLength="1"
                                 autoComplete="false"
                                 required="required"
                                 className="mx-1 mt-2 rounded shadow-sm digit justify-self-start"
                              />
                           </div>
                        </div>
                        {formErrors &&
                           Object.keys(formErrors).map((error, index) => (
                              <p
                                 key={index}
                                 className="text-center text-sm text-red-500"
                              >
                                 {formErrors[error][0]}
                              </p>
                           ))}

                        <div>
                           <button
                              type="submit"
                              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              disabled={isLoading}
                           >
                              <ClipLoader
                                 color="#fff"
                                 loading={isLoading}
                                 size={20}
                              />
                              {!isLoading && `Verify`}
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         )}
      </>
   )
}

export default verify
