import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

type ButtonProps = React.ComponentProps<typeof motion.button>
export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <motion.button
      whileTap={{
        x: 2,
        y: 2,
        boxShadow: 'none',
        transition: { type: 'spring', stiffness: 400, damping: 20 },
      }}
      className={cn(
        'w-full  py-3 bg-[#FDC800] border-1 border-black rounded font-bold text-lg shadow-[2px_2px_0px_rgba(0,0,0,0.9)] ',
        props.className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}
