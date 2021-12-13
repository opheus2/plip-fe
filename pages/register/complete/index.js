import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import Link from '../../../components/Link'
import { emailState, emailVerifiedState } from '../../../libs/authState'
import { userState, userTokenState } from '../../../libs/userState'
import Http from '../../../utils/Http'

function complete() {
   const router = useRouter()
   const email = useRecoilValue(emailState)
   const emailVerified = useRecoilValue(emailVerifiedState)
   const setUser = useSetRecoilState(userState)
   const setUserToken = useSetRecoilState(userTokenState)
   const [isLoading, setIsLoading] = useState(false)
   const [formErrors, setFormErrors] = useState({})
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm()
   useEffect(() => {
      if (!email || !emailVerified) {
          router.replace('/')
          return
      }
   }, [])

   const handleRegistration = async (form) => {
      setIsLoading(true)
       const formData = {
           ...form,
           email: email,
           device_name: 'web'
       }

      await Http()
         .post('/auth/register', formData)
         .then((response) => {
            setUserToken(response.data.data.token)
            setUser(response.data.data.user)
            setIsLoading(false)
            router.push('/app')
         })
         .catch((error) => {
            setIsLoading(false)
            if (error.response) {
               toast.error(error.response.data.message)
               setFormErrors(error.response.data.errors)
            }
         })
   }

   return (
      <>
         <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 auth-bg">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
               <h2 className="mt-6 text-center text-2xl font-extrabold text-white">
                  Final step
               </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
               <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                  {formErrors &&
                     Object.keys(formErrors).map((error, index) => (
                        <p
                           key={index}
                           className="text-center text-sm text-red-500 mb-3"
                        >
                           {formErrors[error][0]}
                        </p>
                     ))}
                  <form
                     className="space-y-6"
                     onSubmit={handleSubmit(handleRegistration)}
                     method="POST"
                  >
                     <div>
                        <label
                           htmlFor="nick_name"
                           className="block text-sm font-medium text-gray-700"
                        >
                           Nick Name
                        </label>
                        <div className="mt-1">
                           <input
                              type="text"
                              {...register('nick_name', {
                                 required: true,
                              })}
                              className="input-auth"
                              autoComplete="nickname"
                              autoFocus
                           />
                           {errors.nick_name?.type === 'required' && (
                              <small className="text-red-500">
                                 Nick Name is required!
                              </small>
                           )}
                        </div>
                     </div>
                     <div>
                        <label
                           htmlFor="first_name"
                           className="block text-sm font-medium text-gray-700"
                        >
                           First name
                        </label>
                        <div className="mt-1">
                           <input
                              type="text"
                              {...register('first_name', {
                                 required: true,
                              })}
                              className="input-auth"
                              autoComplete="given-name"
                           />
                           {errors.first_name?.type === 'required' && (
                              <small className="text-red-500">
                                 First name is required!
                              </small>
                           )}
                        </div>
                     </div>
                     <div>
                        <label
                           htmlFor="middle_name"
                           className="block text-sm font-medium text-gray-700"
                        >
                           Middle name
                        </label>
                        <div className="mt-1">
                           <input
                              type="text"
                              {...register('middle_name', {
                                 required: false,
                              })}
                              className="input-auth"
                              autoComplete="additional-name"
                           />
                        </div>
                     </div>
                     <div>
                        <label
                           htmlFor="last_name"
                           className="block text-sm font-medium text-gray-700"
                        >
                           Last name
                        </label>
                        <div className="mt-1">
                           <input
                              type="text"
                              {...register('last_name', {
                                 required: true,
                              })}
                              className="input-auth"
                              autoComplete="family-name"
                           />
                           {errors.last_name?.type === 'required' && (
                              <small className="text-red-500">
                                 Last name is required!
                              </small>
                           )}
                        </div>
                     </div>
                     <div>
                        <label
                           htmlFor="password"
                           className="block text-sm font-medium text-gray-700"
                        >
                           Password
                        </label>
                        <div className="mt-1">
                           <input
                              type="password"
                              autoComplete="new-password"
                              {...register('password', {
                                 required: true,
                              })}
                              className="input-auth"
                           />
                           {errors.password?.type === 'required' && (
                              <small className="text-red-500">
                                 Password is required!
                              </small>
                           )}
                        </div>
                     </div>

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
                           {!isLoading && `Complete`}
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </>
   )
}

export default complete
