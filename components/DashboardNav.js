import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { activeMenuState, navigation, userNavigation } from '../libs/appMenu'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userState, userTokenState } from '../libs/userState'
import AvatarComponent from './AvatarComponent'
import { classNames, getUri, isEmptyObj } from '../utils/helper'
import Http from '../utils/Http'
import { useRouter } from 'next/router'
import Link from './Link'

function DashboardNav() {
   const router = useRouter()
   const [user, setUser] = useRecoilState(userState)
   const [token, setToken] = useRecoilState(userTokenState)

   useEffect(() => {
      // const
   }, [])

   const handleLogout = async (e) => {
      e.preventDefault()
      await Http()
         .post('/auth/logout')
         .then(() => {
            setUser(null)
            setToken(null)

            router.replace('/login')
            return
         })
   }
   return (
      !isEmptyObj(user) && (
         <div className="bg-indigo-600 pb-32 auth-bg">
            <Disclosure
               as="nav"
               className="auth-bg border-b border-indigo-300 border-opacity-25 lg:border-none"
            >
               {({ open }) => (
                  <>
                     <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                        <div className="relative h-16 flex items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
                           <div className="px-2 flex items-center lg:px-0">
                              <div className="flex-shrink-0">
                                 <p className="text-3xl font-extrabold text-white">
                                    Plip
                                 </p>
                              </div>
                              <div className="hidden lg:block lg:ml-10">
                                 <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                       <Link
                                          key={item.name}
                                          href={item.href}
                                          className={classNames(
                                             item.current
                                                ? 'bg-indigo-500 text-white'
                                                : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                                             'rounded-md py-2 px-3 text-sm font-medium'
                                          )}
                                          aria-current={
                                             item.current ? 'page' : undefined
                                          }
                                       >
                                          {item.name}
                                       </Link>
                                    ))}
                                 </div>
                              </div>
                           </div>
                           <div className="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">
                              <div className="max-w-lg w-full lg:max-w-xs">
                                 <label htmlFor="search" className="sr-only">
                                    Search
                                 </label>
                                 <div className="relative text-gray-400 focus-within:text-gray-600">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                       <SearchIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                       />
                                    </div>
                                    <input
                                       id="search"
                                       className="block w-full bg-white py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white focus:border-white sm:text-sm"
                                       placeholder="Search"
                                       type="search"
                                       name="search"
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className="flex lg:hidden">
                              {/* Mobile menu button */}
                              <Disclosure.Button className="bg-indigo-600 p-2 rounded-md inline-flex items-center justify-center text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                                 <span className="sr-only">Open main menu</span>
                                 {open ? (
                                    <XIcon
                                       className="block h-6 w-6"
                                       aria-hidden="true"
                                    />
                                 ) : (
                                    <MenuIcon
                                       className="block h-6 w-6"
                                       aria-hidden="true"
                                    />
                                 )}
                              </Disclosure.Button>
                           </div>
                           <div className="hidden lg:block lg:ml-4">
                              <div className="flex items-center">
                                 <button
                                    type="button"
                                    className="bg-indigo-600 flex-shrink-0 rounded-full p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
                                 >
                                    <span className="sr-only">
                                       View notifications
                                    </span>
                                    <BellIcon
                                       className="h-6 w-6"
                                       aria-hidden="true"
                                    />
                                 </button>

                                 {/* Profile dropdown */}
                                 <Menu
                                    as="div"
                                    className="ml-3 relative flex-shrink-0"
                                 >
                                    <div>
                                       <Menu.Button className="bg-indigo-600 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                                          <span className="sr-only">
                                             Open user menu
                                          </span>
                                          <AvatarComponent
                                             className="rounded-full h-8 w-8"
                                             name={user.full_name}
                                          />
                                       </Menu.Button>
                                    </div>
                                    <Transition
                                       as={Fragment}
                                       enter="transition ease-out duration-100"
                                       enterFrom="transform opacity-0 scale-95"
                                       enterTo="transform opacity-100 scale-100"
                                       leave="transition ease-in duration-75"
                                       leaveFrom="transform opacity-100 scale-100"
                                       leaveTo="transform opacity-0 scale-95"
                                    >
                                       <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                          {userNavigation.map((item) => (
                                             <Menu.Item key={item.name}>
                                                {({ active }) => (
                                                   <Link
                                                      href={item.href}
                                                      className={classNames(
                                                         active
                                                            ? 'bg-gray-100'
                                                            : '',
                                                         'block py-2 px-4 text-sm text-gray-700'
                                                      )}
                                                   >
                                                      {item.name}
                                                   </Link>
                                                )}
                                             </Menu.Item>
                                          ))}
                                          <Menu.Item key="logout_desktop">
                                             {({ active }) => (
                                                <Link
                                                    key="logout"
                                                   href="#"
                                                   onClick={handleLogout}
                                                   className={classNames(
                                                      active
                                                         ? 'bg-gray-100'
                                                         : '',
                                                      'block py-2 px-4 text-sm text-gray-700'
                                                   )}
                                                >
                                                   Logout
                                                </Link>
                                             )}
                                          </Menu.Item>
                                       </Menu.Items>
                                    </Transition>
                                 </Menu>
                              </div>
                           </div>
                        </div>
                     </div>

                     <Disclosure.Panel className="lg:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                           {navigation.map((item) => (
                              <Disclosure.Button
                                 as="button"
                                 aria-current={
                                    item.current ? 'page' : undefined
                                 }
                              >
                                 <Link
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                       item.current
                                          ? 'bg-indigo-700 text-white'
                                          : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                                       'block rounded-md py-2 px-3 text-base font-medium'
                                    )}
                                 >
                                    {item.name}
                                 </Link>
                              </Disclosure.Button>
                           ))}
                        </div>
                        <div className="pt-4 pb-3 border-t border-indigo-700">
                           <div className="px-5 flex items-center">
                              <div className="flex-shrink-0">
                                 <AvatarComponent
                                    className="rounded-full h-10 w-10"
                                    name={user.full_name}
                                 />
                              </div>
                              <div className="ml-3">
                                 <div className="text-base font-medium text-white">
                                    {user.full_name}
                                 </div>
                                 <div className="text-sm font-medium text-indigo-300">
                                    {user.email}
                                 </div>
                              </div>
                              <button
                                 type="button"
                                 className="ml-auto bg-indigo-600 flex-shrink-0 rounded-full p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
                              >
                                 <span className="sr-only">
                                    View notifications
                                 </span>
                                 <BellIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                 />
                              </button>
                           </div>
                           <div className="mt-3 px-2 space-y-1">
                              {userNavigation.map((item) => (
                                 <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className="block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
                                 >
                                    {item.name}
                                 </Disclosure.Button>
                              ))}

                              <Disclosure.Button
                                 key="logout_mobile"
                                 as="a"
                                 onClick={handleLogout}
                                 className="block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
                              >
                                 Logout
                              </Disclosure.Button>
                           </div>
                        </div>
                     </Disclosure.Panel>
                  </>
               )}
            </Disclosure>
            <header className="py-10">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h1 className="text-3xl font-bold text-white">
                     {navigation.map((n) => {
                        if (n.current === true) {
                           return n.name
                        }
                     })}
                  </h1>
               </div>
            </header>
         </div>
      )
   )
}

export default DashboardNav
