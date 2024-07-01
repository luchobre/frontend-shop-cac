'use client'
import Title from "@/components/Ui/title/Title";
import Image from "next/image";
import Link from "next/link";
import useProductFetcher from "@/fetch/fetch";
import { MoonLoader } from "react-spinners";

const CheckoutPage = () => {

  const {products, isLoading} = useProductFetcher();

  if (isLoading) {
    return <MoonLoader />;
  }

  const productsInCart = products.slice(0, 3);
  

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] ">
        <Title title="Verificar orden" subtitle="" className="" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Editar items</span>
            <Link href="/" className="underline mb-5">
              Editar
            </Link>

            {/* Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`${product.images[0]}`}
                  width={100}
                  height={100}
                  alt={product.title}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{product.title}</p>
                  <p>{product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-10 h-fit">

            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
                <p>Luciano Bregoli</p>
                <p>Calle falsa 123</p>
                <p>Lujan</p>
                <p>Buenos Aires</p>
                <p>Cp 8000</p>
            </div>

            {/* Divider */}
            <div
            className="w-full h-0.5 rounded bg-gray-200 mb-10"
            />



            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2 ">
              <span> N° Productos</span>
              <span className="text-right"> 3 Articulos</span>

              <span> Subtotal</span>
              <span className="text-right">$ 100</span>

              <span> Impuestos(15%) </span>
              <span className="text-right"> $ 100</span>

              <span className="mt-5 text-2xl"> Total: </span>
              <span className="mt-5 text-right text-2xl"> $ 200</span>
            </div>

            <div className="mt-5 mb-2 w-full">
                <p className="mb-5">
                <span className="text-xs">
                Al hacer click en " Colocar orden", aceptas nuestros <a href="#" className="underline">Terminos y Condiciones</a> y <a href="#" className="underline">Política de privacidad.</a>
                </span>
                </p>

              <Link
                className="flex btn-primary justify-center"
                href="/orders/123"
              >
                Colocar orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default CheckoutPage;