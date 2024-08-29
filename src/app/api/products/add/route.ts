import { type NextRequest, NextResponse } from "next/server";
import Product from '../../../models/Product'; // Adjust the import path if necessary

interface AddProduct {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  isFeatured: boolean;
  imageUrl: string;
  stock:number
}

export const POST = async (req: NextRequest) => {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }

  try {
    const { name, description, price, categoryId, isFeatured, imageUrl,stock } = await req.json() as AddProduct;

    // บันทึกข้อมูลสินค้าลงในฐานข้อมูล
    const newProduct = await Product.create({
      name,
      description,
      price,
      categoryId,
      isFeatured,
      imageUrl,
      stock
    });

    const responseBody = {
      message: 'Product added successfully!',
      product: newProduct // ส่งกลับข้อมูลสินค้าที่ถูกบันทึก
    };

    return NextResponse.json(responseBody, { status: 200 });

  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเพิ่มข้อมูลสินค้า:", error);
    return NextResponse.json({
      success: false,
      message: "เกิดข้อผิดพลาดในการเพิ่มข้อมูลสินค้า",
    }, { status: 500 });
  }
};
