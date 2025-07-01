import React from 'react'

import { cn } from '@/lib/utils'

export const MAX_MOBILE_SCREEN_WIDTH = 440

type MainLayoutProps = {
  width?: number
} & React.ComponentProps<'div'>

export const MobileOnlyLayout = ({ className, style, children, ...props }: MainLayoutProps) => {
  return (
    <main
      className={cn(
        'mx-auto h-full bg-[#EEEDDE] border-l-1 border-r-1 border-gray-800 ',
        className,
      )}
      style={{
        maxWidth: MAX_MOBILE_SCREEN_WIDTH,
        ...style,
      }}
      {...props}
    >
      {children}
    </main>
  )
}
