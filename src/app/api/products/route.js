// Ensure you are using a middleware for multer if not already available

import Product from '../../model/Product';
import multer from 'multer';
import path from 'path';
import fs from 'fs';


// Configure multer for file upload
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(process.cwd(), 'public/uploads');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

// Handle file upload and create product
export async function POST(request) {
  return new Promise((resolve, reject) => {
    upload.single('image')(request, null, async (err) => {
      if (err) {
        console.error('Multer error:', err);
        return resolve(new Response(JSON.stringify({ error: 'Error uploading file' }), { status: 500 }));
      }

      // Parse the form data
      const { name, description, price, categoryId, isFeatured } = request.body;

      // Check and validate request body
      if (!name || !price || !categoryId) {
        return resolve(new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 }));
      }

      // Handle image URL
      const imageUrl = request.file ? `/uploads/${request.file.filename}` : null;

      try {
        // Create a new product
        const product = await Product.create({
          name,
          description,
          price,
          imageUrl,
          categoryId,
          isFeatured,
        });

        return resolve(new Response(JSON.stringify(product), { status: 201 }));
      } catch (error) {
        console.error('Database error:', error);
        return resolve(new Response(JSON.stringify({ error: 'Error creating product' }), { status: 500 }));
      }
    });
  });
}
