import ProductsView from "@/components/ProductsView";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import Image from "next/image";
import { Category } from '../../sanity.types';
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";

export default async function Home(){
  const products = await getAllProducts();
  const categories = await getAllCategories();

 /*nsole.log(
    crypto.randomUUID().slice(0, 5)*
     '>>> Rerendered the home page cache with ${products.length} products and ${categories.length} categories'
  );*/

  return (
    <div>
      <h1>hello world 123</h1>

      {/* render all the product*/}
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}