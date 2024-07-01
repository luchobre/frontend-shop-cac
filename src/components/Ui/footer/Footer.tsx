import { titleFont } from '@/config/fonts'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex w-full justify-center text-xs mb-10'>
      <Link
      href='/'
      >
        <span className={`${titleFont.className} antialiased font-bold`}>Codo a Codo</span>
        <span> | Shop </span>
        <span>{new Date().getFullYear()}</span>
      </Link>
      <Link href='/' className='mx-3'>Privacidad y Legal</Link>
      <Link href='/' className='mx-3'>Ubicaciones</Link>
    </div>
  )
}

export default Footer