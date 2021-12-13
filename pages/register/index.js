import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Http from '../../utils/Http'
import { ClipLoader } from 'react-spinners'
import Link from '../../components/Link'
import { useSetRecoilState } from 'recoil'
import { emailState } from '../../libs/authState'

function Register() {
   const setEmail = useSetRecoilState(emailState)
   const [isLoading, setIsLoading] = useState(false)
   const [formErrors, setFormErrors] = useState({})
   //   const { saveUser, saveUserToken } = useUser();
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm()
   const router = useRouter()

   const handleEmail = async (form) => {
      setIsLoading(true)

      await Http()
         .post('/auth/email', form)
         .then((response) => {
            setEmail(form.email)
            setIsLoading(false)
            console.log(`Your verification code is ${response.data.data.token}`)
            alert(`Check console for your code`)
            router.replace('/register/verify')
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
               <h1 className="text-center text-3xl font-extrabold text-white">
                  <Link href="/">Plip.co</Link>
               </h1>
               <h2 className="mt-6 text-center text-2xl font-extrabold text-white">
                  Register your account
               </h2>
               <p className="mt-2 flex items-center justify-center text-center text-sm text-gray-600">
                  <a
                     href="#"
                     className=" w-2/3 font-medium text-indigo-600 hover:text-indigo-500 bg-white shadow-lg rounded-xl px-3"
                  >
                     A better future begins from here
                  </a>
               </p>
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
                     onSubmit={handleSubmit(handleEmail)}
                     method="POST"
                  >
                     <div>
                        <label
                           htmlFor="email"
                           className="block text-sm font-medium text-gray-700"
                        >
                           Email address
                        </label>
                        <div className="mt-1">
                           <input
                              type="email"
                              autoComplete="email"
                              {...register('email', {
                                 required: true,
                              })}
                              className="input-auth"
                              autoComplete="true"
                           />
                           {errors.email?.type === 'required' && (
                              <small className="text-red-500">
                                 Email address is required!
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
                           {!isLoading && `Register`}
                        </button>
                     </div>
                  </form>

                  <div className="mt-6">
                     <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                           <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                           <span className="px-2 bg-white text-gray-500">
                              Or continue with
                           </span>
                        </div>
                     </div>

                     <div className="mt-6 grid grid-cols-3 gap-3">
                        <div>
                           <a
                              href="#"
                              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                           >
                              <span className="sr-only">
                                 Sign in with Facebook
                              </span>
                              <svg
                                 className="w-5 h-5"
                                 aria-hidden="true"
                                 fill="currentColor"
                                 viewBox="0 0 20 20"
                              >
                                 <path
                                    fillRule="evenodd"
                                    d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                    clipRule="evenodd"
                                 />
                              </svg>
                           </a>
                        </div>

                        <div>
                           <a
                              href="#"
                              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                           >
                              <span className="sr-only">
                                 Sign in with Twitter
                              </span>
                              <svg
                                 className="w-5 h-5"
                                 aria-hidden="true"
                                 fill="currentColor"
                                 viewBox="0 0 20 20"
                              >
                                 <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                              </svg>
                           </a>
                        </div>

                        <div>
                           <a
                              href="#"
                              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                           >
                              <span className="sr-only">
                                 Sign in with GitHub
                              </span>
                              <svg
                                 className="w-5 h-5"
                                 aria-hidden="true"
                                 fill="currentColor"
                                 viewBox="0 0 20 20"
                              >
                                 <path
                                    fillRule="evenodd"
                                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                    clipRule="evenodd"
                                 />
                              </svg>
                           </a>
                        </div>
                     </div>
                     <div className="flex items-center justify-center font-normal text-sm leading-5 mt-4">
                        Already a member?
                        <span className="pl-1 text-blue-400 hover:text-blue-500 font-medium">
                           <Link
                              href="/login"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                           >
                              Login
                           </Link>
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
//

export default Register
