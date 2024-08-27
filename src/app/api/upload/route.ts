import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  // ตรวจสอบการอัปโหลดไฟล์
  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());

    const UPLOAD_DIR = "public/uploads";
    const filePath = path.resolve(UPLOAD_DIR, file.name);
    try {
      fs.writeFileSync(filePath, buffer);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเขียนไฟล์:", error);
      return NextResponse.json({
        success: false,
        message: "ข้อผิดพลาดในการเขียนไฟล์",
      });
    }

    return NextResponse.json({
      success: true,
      name: file.name,
      fileUrl: `/uploads/${file.name}`, // สมมุติว่าไฟล์สามารถให้บริการได้จากไดเรกทอรี 'public/uploads'
    });
  } else {
    return NextResponse.json({
      success: false,
      message: "ไม่มีไฟล์ที่อัปโหลด",
    });
  }
};
