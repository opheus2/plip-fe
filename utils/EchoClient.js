import Echo from 'laravel-echo'
import Http from './Http'

export function EchoClient(authToken) {
   const auth = {}
   const options = {
      broadcaster: 'pusher',
      key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
      forceTLS: false,
      encrypted: false,
      authorizer: (channel, options) => {
         return {
            authorize: (socketId, callback) => {
               Http()
                  .post(
                     '/broadcasting/auth',
                     {
                        socket_id: socketId,
                        channel_name: channel.name,
                     },
                     {
                        headers: {
                           Authorization: `Bearer ${authToken}`,
                           'X-Socket-ID': socketId,
                        },
                     }
                  )
                  .then((response) => {
                     callback(false, response.data)
                  })
                  .catch((error) => {
                     callback(true, error)
                  })
            },
         }
      },
   }

   return new Echo(options)
}
