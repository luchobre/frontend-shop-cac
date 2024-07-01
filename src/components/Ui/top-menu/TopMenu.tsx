'use client'
import Link from "next/link"
import { titleFont } from "@/config/fonts"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"
import { useUIStore } from "@/store"

const TopMenu = () => {

  const openSideMenu = useUIStore(state =>state.openSideMenu);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
        {/* Logo */}
        <div>
            <Link
            href="/"
            >
            <span className={`${titleFont.className} antialiased font-bold`}> Codo a Codo</span>
            <span> | Shop</span>
            </Link>
        </div>
      {/* Center Name */}
      <div className="hidden sm:block">
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href='/category/men'>Hombres</Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href='/category/women'>Mujeres</Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href='/category/kid'>Niños</Link>
      </div>
      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        <Link href='/administrate' className="mx-2">
          Administrar productos
        </Link>
        <Link href='/search'>
          <IoSearchOutline className="w-5 h-5"/>
        </Link>
        <Link href='/cart' className="mx-2">
          <div className="relative">
            <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white ">
              3
            </span>
            <IoCartOutline className="w-5 h-5"/>
          </div>
        </Link>
        <button 
        className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        onClick={()=> openSideMenu()}
        >
          Menu
        </button>
      </div>
    </nav>
  )
}

export default TopMenu