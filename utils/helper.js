export function replaceItemAtIndex(arr, index, newValue) {
   return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)]
}

export function removeItemAtIndex(arr, index) {
   return [...arr.slice(0, index), ...arr.slice(index + 1)]
}

export function isEmptyObj(obj) {
   for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
         return false
      }
   }

   return JSON.stringify(obj) !== JSON.stringify({})
}

export function isObject(obj) {
   return obj != null && obj.constructor.name === 'Object'
}

export function findInObj(data, callback) {
   if (Array.isArray(data)) {
      const array = [...data]
      const found = array.find(callback)

      return found
   }

   if (isObject(data)) {
      const array = { ...data }
      const found = Object.values(data).find(callback)

      return found
   }

   return null
}

export const getUri = (href = '') => {
   if (href) {
      return href.split('/').pop()
   }

   return window.location.href.split('/').pop()
}

export const classNames = (...classes) => {
   return classes.filter(Boolean).join(' ')
}

export const formatDate = (dateString) => {
   const options = { year: 'numeric', month: 'long', day: 'numeric' }
   return new Date(dateString).toLocaleDateString(undefined, options)
}
