'use client'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Swal from 'sweetalert2';

const BASEURL = 'https://luchobre.pythonanywhere.com/';

type ValidSizes = 'XS' | 'S' | 'M' | 'L' | 'XL';
type ValidTypes = 'shirts' | 'pants' | 'accessories';

interface Product {
  id?: number;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ValidSizes[];
  slug: string;
  tags: string[];
  title: string;
  type: ValidTypes;
  gender: 'men' | 'women' | 'kid' | 'unisex';
}

async function fetchData<t>(url: string, method: string, data: object | null = null) {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : null,
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    Swal.fire({
      title: 'Error!',
      text: 'Un error ocurrió realizando el fetching de datos. Por favor intente nuevamente.',
      icon: 'error',
      confirmButtonText: 'Cerrar'
    });
  }
}

const ShopProductForm: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>({
    id: undefined,
    description: '',
    images: ['https://imgur.com/'],
    inStock: 0,
    price: 0,
    sizes: ['M'],
    slug: '',
    tags: [''],
    title: '',
    type: 'shirts',
    gender: 'unisex'
  });

  useEffect(() => {
    fetchData(`${BASEURL}/products`, 'GET')
      .then(data => setProducts(data))
      .catch(error => console.error('Error realizando el fetch de productos:', error));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleArrayChange = (e: ChangeEvent<HTMLInputElement>, fieldName: 'images' | 'sizes' | 'tags') => {
    const { value } = e.target;
    setForm({ ...form, [fieldName]: value.split(',') });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let data: Product | undefined; // Aquí defines el tipo explícitamente, ajusta 'Product' según corresponda
  
      if (form.id) {
        data = await fetchData<Product>(`${BASEURL}/products/${form.id}`, 'PUT', form);
        if (data) {
          setProducts(products.map(product => (product.id === form.id ? data! : product)));
          Swal.fire({
            title: 'Actualizado!',
            text: 'Producto actualizado correctamente.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
          });
        }
      } else {
        data = await fetchData<Product>(`${BASEURL}/products`, 'POST', form);
        if (data) {
          setProducts([...products, data]);
          Swal.fire({
            title: 'Agregado!',
            text: 'Producto agregado correctamente.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
          });
        }
      }
      resetForm();
    } catch (error) {
      console.error('Error actualizando producto:', error);
    }
  };

  const resetForm = () => {
    setForm({
      id: undefined,
      description: '',
      images: [''],
      inStock: 0,
      price: 0,
      sizes: ['M'],
      slug: '',
      tags: [''],
      title: '',
      type: 'shirts',
      gender: 'unisex'
    });
  };

  const handleEdit = (id: number) => {
    const product = products.find(product => product.id === id);
    if (product) {
      setForm(product);
    }
  };

  const handleDelete = (id: number) => {
    fetchData(`${BASEURL}/products/${id}`, 'DELETE')
      .then(() => {
        setProducts(products.filter(product => product.id !== id));
        Swal.fire({
          title: 'Eliminado!',
          text: 'Producto eliminado correctamente',
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Agregar Producto</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Título</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Descripción</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Precio</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inStock">Stock</label>
          <input
            type="number"
            name="inStock"
            value={form.inStock}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="inStock"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">Imágenes (separadas por comas)</label>
          <input
            type="text"
            name="images"
            value={form.images.join(',')}
            onChange={(e) => handleArrayChange(e, 'images')}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="images"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sizes">Tamaños (separados por comas)</label>
          <input
            type="text"
            name="sizes"
            value={form.sizes.join(',')}
            onChange={(e) => handleArrayChange(e, 'sizes')}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="sizes"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="slug">Slug</label>
          <input
            type="text"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="slug"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">Etiquetas (separadas por comas)</label>
          <input
            type="text"
            name="tags"
            value={form.tags.join(',')}
            onChange={(e) => handleArrayChange(e, 'tags')}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="tags"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">Tipo</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="type"
          >
            <option value="remeras">Remeras</option>
            <option value="pantalones">Pantalones</option>
            <option value="accesorios">Accesorios</option>
            <option value="vestidos">Vestidos</option>
            <option value="buzos">Buzos</option>
            <option value="camperas">Camperas</option>
            <option value="zapatillas">Zapatillas</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Género</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="gender"
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {form.id ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
      </form>
      <div>
        <h2 className="text-2xl font-bold mb-4">Lista de Productos</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="w-1/3 text-left py-3 px-4">Título</th>
              <th className="w-1/3 text-left py-3 px-4">Precio</th>
              <th className="w-1/3 text-left py-3 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td className="text-left py-3 px-4">{product.title}</td>
                <td className="text-left py-3 px-4">${product.price}</td>
                <td className="text-left py-3 px-4">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2"
                    onClick={() => handleEdit(product.id!)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                    onClick={() => handleDelete(product.id!)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShopProductForm;
