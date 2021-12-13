import React from 'react'

function AvatarComponent({ name, className, src }) {
   const imgSrc = !src
      ? `https://ui-avatars.com/api/?bold=true&&font-size=0.3&&name=${name}`
      : src
   const classes = className ?? `rounded-full h-10 w-10`
   return (
      <>
         <img alt="profile_image" className={classes} src={imgSrc} />
      </>
   )
}

export default React.memo(AvatarComponent)
