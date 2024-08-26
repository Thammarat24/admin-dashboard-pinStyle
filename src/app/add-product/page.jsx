// src/app/add-product/page.jsx

import AddProductForm from '../components/AddProductForm';


export default function AddProduct() {
  return (
    <div className="h-screen">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Add Product</h1>
        <AddProductForm />
      </div>
    </div>
  );
}
