const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// One storage per document type — keeps Cloudinary folders clean
const makeStorage = (folder) =>
  new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      // PDFs must be uploaded as 'raw', images as 'image'
      const isPdf = file.mimetype === 'application/pdf';
      return {
        folder: `s18/${folder}`,
        resource_type: isPdf ? 'raw' : 'image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'pdf'],
        public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`,
      };
    },
  });

const uploadBrochure     = multer({ storage: makeStorage('brochures') });
const uploadPhoto        = multer({ storage: makeStorage('photos') });
const uploadCertificate  = multer({ storage: makeStorage('certificates') });

// Generic single-file uploader (used when uploading one at a time)
const uploadSingle = (fieldName, folder) =>
  multer({ storage: makeStorage(folder) }).single(fieldName);

module.exports = { cloudinary, uploadBrochure, uploadPhoto, uploadCertificate, uploadSingle };
