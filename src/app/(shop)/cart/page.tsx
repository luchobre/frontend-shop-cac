import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useProductFetcher from '@/fetch/fetch';
import { MoonLoader } from 'react-spinners';
import QuantitySelector from '@/components/Product/quantity-selector/QuantitySelector';
import Title from '@/components/Ui/title/Title';

export default function Cart() {
  const { products, isLoading } = useProductFetcher();

  if (isLoading) {
    return <MoonLoader />;
  }

  // Asegúrate de que products tenga el tipo adecuado, incluyendo slug
  const productsInCart = products.slice(0, 3);

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Carrito" subtitle="" className="" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregas más items</span>
            <Link href="/" className="underline mb-5">
              Continúa comprando
            </Link>

            {/* Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={product.images[0]}
                  width={100}
                  height={100}
                  alt={product.title}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{product.title}</p>
                  <p>{product.price}</p>
                  <div className="flex">
                    <QuantitySelector quantity={3} />
                    <button className="underline mt-2 ml-10">Remover</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className=" bg-white rounded-xl shadow-xl p-10 h-fit">
            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2 ">
              <span>N° Productos</span>
              <span className="text-right">3 Articulos</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Impuestos(15%)</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-right text-2xl">$ 200</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <Link className="flex btn-primary justify-center" href="/checkout/adress">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
