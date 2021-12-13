import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { getUri } from '../../../utils/helper'

function ShowFinance() {
   const router = useRouter()
   const { walletId } = router.query

   useEffect(() => {
      console.log(getUri())
   }, [])

   return (<div>{pid}</div>)
}

export default ShowFinance
