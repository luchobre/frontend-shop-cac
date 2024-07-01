'use client'
import { notFound } from "next/navigation";
import { initialData } from "@/seed/seed";
import Title from "@/components/Ui/title/Title";
import ProductGrid from "@/components/Products/product-grid/ProductGrid";
import { Category } from "@/interfaces";
import ProductFetcher from "@/fetch/fetch";

interface Props {
  params: {
    id: Category;
  };
}


export default function ({ params }: Props) {
  const { id } = params;
  const {products, isLoading} = ProductFetcher();

  const filterProducts = products.filter((product) => product.gender === id);
  
  if (id !== "men" && id !== "women" && id !== "kid") {
    notFound();
  }

  const labels: Record<Category, string>  = {
    'men' : 'para hombres',
    'women' : 'para mujeres',
    'kid' : 'para niños',
    'unisex' : 'para todos'
    
  }

  return (
    <>
      <Title title={`Articulos ${(labels as any) [id]}`} subtitle={``} className="mb-2" />
      <ProductGrid products={filterProducts} />
    </>
  );
}
