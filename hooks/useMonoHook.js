
   const monoConnect = useMemo(() => {
      if (document) {
         const monoInstance = new MonoConnect({
            onClose: () => console.log('Widget closed'),
            onLoad: () => console.log('Widget loaded successfully'),
            onSuccess: ({ code }) =>
               console.log(`Linked successfully: ${code}`),
            key: process.env.NEXT_PUBLIC_MONO_PUBLIC_KEY,
         })

         monoInstance.setup()

         return monoInstance
      }
   }, [])
