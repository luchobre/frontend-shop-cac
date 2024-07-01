'use client'
import React from "react";
import ProductGrid from "@/components/Products/product-grid/ProductGrid";
import Title from "@/components/Ui/title/Title";
import useProductFetcher from "@/fetch/fetch";
import { MoonLoader } from "react-spinners";

export default function Home() {
  const {products, isLoading} = useProductFetcher();
  
  if (isLoading) {
    return <MoonLoader />;
  }

  return (

<>
<Title 
  title= "Tienda"
  subtitle= "Todos los productos" 
  className="mb-2"
/>
<ProductGrid 
products={products} 
/>
</>
  );
}
