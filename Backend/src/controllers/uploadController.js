const UploadedFile = require('../models/UploadedFile');

/**
 * POST /api/upload/:type
 * type = brochure | certificate | photo
 *
 * Multer + Cloudinary middleware runs BEFORE this controller,
 * so by the time we reach here req.file is already uploaded to Cloudinary.
 *
 * Returns: { url, publicId, fileId } back to frontend
 */
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const { type } = req.params;

    // Save record to UploadedFile collection
    const record = await UploadedFile.create({
      uploadedBy:         req.user._id,
      fileType:           type,
      originalName:       req.file.originalname,
      mimeType:           req.file.mimetype,
      sizeBytes:          req.file.size,
      cloudinaryPublicId: req.file.filename,   // multer-storage-cloudinary sets this
      cloudinaryUrl:      req.file.path,        // secure_url from Cloudinary
      resourceType:       req.file.mimetype === 'application/pdf' ? 'raw' : 'image',
      attachedToForm:     false,
    });

    res.status(201).json({
      url:      record.cloudinaryUrl,
      publicId: record.cloudinaryPublicId,
      fileId:   record._id,
    });

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'File upload failed. Try again.' });
  }
};

/**
 * PATCH /api/upload/attach
 * Called after form submission to mark files as attached and link them to the form.
 * Body: { fileIds: [...], s18FormId: '...' }
 */
const attachFilesToForm = async (req, res) => {
  try {
    const { fileIds, s18FormId } = req.body;

    if (!fileIds?.length || !s18FormId) {
      return res.status(400).json({ message: 'fileIds and s18FormId required.' });
    }

    await UploadedFile.updateMany(
      { _id: { $in: fileIds }, uploadedBy: req.user._id },
      { $set: { attachedToForm: true, s18FormId } }
    );

    res.json({ message: 'Files linked to form.' });
  } catch (err) {
    console.error('Attach error:', err);
    res.status(500).json({ message: 'Could not attach files.' });
  }
};

module.exports = { uploadFile, attachFilesToForm };
