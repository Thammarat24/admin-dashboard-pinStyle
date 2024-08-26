"use client"; // Add this line at the top of the file
import React, { useState } from 'react';

export default function AddProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // เปลี่ยนจาก imageUrl เป็น image
  const [categoryId, setCategoryId] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // เก็บไฟล์ภาพในสถานะ
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('categoryId', categoryId);
    formData.append('isFeatured', isFeatured);
    if (image) {
      formData.append('image', image); // อัพโหลดไฟล์ภาพ
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData, // ส่งข้อมูลฟอร์มที่รวมถึงไฟล์
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const result = await response.json();
      setSuccess('Product added successfully');
      // Reset form fields
      setName('');
      setDescription('');
      setPrice('');
      setImage(null); // รีเซ็ตภาพ
      setCategoryId('');
      setIsFeatured(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white border rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category ID</label>
          <input
            type="number"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="mr-2"
          />
          <label className="text-gray-700">Featured</label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
