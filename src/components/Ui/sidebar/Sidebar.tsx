"use client";
import { useUIStore } from "@/store";
import clsx from "clsx";
import Link from "next/link";
import {
  IoCloseOutline,
  IoCreateOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShareOutline,
  IoTicketOutline,
} from "react-icons/io5";

const Sidebar = () => {

  const isSideMenuOpen = useUIStore(state =>state.isSideMenuOpen);
  const closeSideMenu = useUIStore(state =>state.closeSideMenu);

  return (
    <div>
      {/* background black */}
      {
        isSideMenuOpen && (
          <div 
          className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" 
          />
        )
      }
      {/* blur */}
      {
        isSideMenuOpen && (
          <div 
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" 
          onClick={()=> closeSideMenu()}
          />
        )
      }
      {/* sidemenu */}

      <nav className={
        clsx(
          "fixed p-5 right-0 top-0 w-[300px] sm:w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            'translate-x-full': !isSideMenuOpen
          }
        )
      }>
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeSideMenu()}
        />

        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar.."
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 foucs:outline-none focus:border-blue-500"
          />
        </div>
        {/* Menu */}
        <Link
          href="/"
          className="flex items-center mt-2 sm:mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoPersonOutline size={30} />
          <span className="ml-3 text-xl">Perfil</span>
        </Link>
        <Link
          href="/"
          className="flex items-center mt-2 sm:mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoTicketOutline size={30} />
          <span className="ml-3 text-xl">Ordenes</span>
        </Link>
        <Link
          href="/"
          className="flex items-center mt-2 sm:mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoLogInOutline size={30} />
          <span className="ml-3 text-xl">Ingresar</span>
        </Link>
        <Link
          href="/"
          className="flex items-center mt-2 sm:mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoLogOutOutline size={30} />
          <span className="ml-3 text-xl">Salir</span>
        </Link>

        {/* Line separator */}
        <div className="w-full h-px bg-gray-200 my-10 rounded" />

        <Link
          href="/"
          className="flex items-center mt-2 sm:mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoShareOutline size={30} />
          <span className="ml-3 text-xl">Productos</span>
        </Link>
        <Link
          href="/"
          className="flex items-center mt-2 sm:mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoTicketOutline size={30} />
          <span className="ml-3 text-xl">Ordenes</span>
        </Link>
        <Link
          href="/"
          className="flex items-center mt-2 sm:mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoPeopleOutline size={30} />
          <span className="ml-3 text-xl">Usuarios</span>
        </Link>
        <Link
          href="/administrate"
          className="flex items-center mt-2 sm:mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoCreateOutline size={30} />
          <span className="ml-3 text-xl">Administrar</span>
        </Link>

      </nav>
    </div>
  );
};

export default Sidebar;
