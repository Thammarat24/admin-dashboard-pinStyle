// src/app/components/Navbar.jsx

"use client"; // Make this a client component

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/" className="hover:underline">
            Admin Dashboard
          </Link>
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link href="/add-product" className="hover:underline">
              Add Product
            </Link>
          </li>
          <li>
            <Link href="/manage-products" className="hover:underline">
              Manage Products
            </Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </div>
    </nav>
  );
}
