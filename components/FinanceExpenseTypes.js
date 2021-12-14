import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
   expenseCategoryTypes,
   selectedTransactionCategory,
} from '../libs/transactionState'
import { classNames } from '../utils/helper'
import Http from '../utils/Http'
import ExpenseType from './ExpenseType'

function FinanceExpenseTypes() {
   const selectedCategory = useRecoilValue(selectedTransactionCategory)
   const setExpenseCategoryTypes = useSetRecoilState(expenseCategoryTypes)
   const expenseCategories = useRecoilValue(expenseCategoryTypes)
   const setSelectedCategory = useSetRecoilState(selectedTransactionCategory)
   const [isLoading, setIsLoading] = useState(true)
   const handleSelect = (category) => {
      setSelectedCategory(category)
   }
   useEffect(() => {
      const fetchCategories = async () => {
         await Http()
            .get(`/expense_categories`)
            .then((response) => {
               const categories = response.data.data.expense_categories.map(
                  (e) => {
                     return { id: e.id, name: e.name, icon: e.icon, count: null }
                  }
               )
               const newTypes = [...expenseCategories, ...categories]
               setExpenseCategoryTypes([])
               setExpenseCategoryTypes(newTypes)
            })
      }
      fetchCategories()
   }, [])
   return (
      <>
         {/** Mobile */}
         <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
               Select a tab
            </label>
            {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
            <select
               id="tabs"
               name="tabs"
               className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
               defaultValue={
                  expenseCategories.find(
                     (expenseCategories) =>
                        expenseCategories.name == selectedCategory.name
                  ).name
               }
               onChange={(e) => {
                  const selectedCat = e.target.value
                  
                   handleSelect(
                      expenseCategories.find(
                         (expenseCategories) =>
                            expenseCategories.name == selectedCat
                      )
                   )
                   
               }}
            >
               {expenseCategories.map((expenseType) => (
                  <ExpenseType
                     handleSelect={handleSelect}
                     mobile={true}
                     expenseType={expenseType}
                  />
               ))}
            </select>
         </div>
         {/** Desktop */}
         <div className="hidden sm:block w-full">
            <div className="border-b border-gray-200">
               <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {expenseCategories.map((expenseType) => (
                     <ExpenseType
                        handleSelect={handleSelect}
                        expenseType={expenseType}
                     />
                  ))}
               </nav>
            </div>
         </div>
      </>
   )
}

export default FinanceExpenseTypes
