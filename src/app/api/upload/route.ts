import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

// ตั้งค่า Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (file) {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());

      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result as UploadApiResponse);
            }
          }
        );
        uploadStream.end(buffer);
      });

      return NextResponse.json({
        success: true,
        name: file.name,
        fileUrl: result.secure_url, // URL ของไฟล์ที่อัปโหลดไปยัง Cloudinary
      }, { status: 200 });
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอัปโหลดไฟล์:", error);
      return NextResponse.json({
        success: false,
        message: "ข้อผิดพลาดในการอัปโหลดไฟล์",
      }, { status: 500 });
    }
  } else {
    return NextResponse.json({
      success: false,
      message: "ไม่มีไฟล์ที่อัปโหลด",
    }, { status: 400 });
  }
};
