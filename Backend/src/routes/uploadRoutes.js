const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { uploadFile, attachFilesToForm } = require('../controllers/uploadController');
const { uploadSingle } = require('../config/cloudinary');

/**
 * POST /api/upload/brochure
 * POST /api/upload/certificate
 * POST /api/upload/photo
 *
 * Only students can upload (they're the ones submitting forms).
 * Each route accepts a single file with the field name 'file'.
 */
router.post(
  '/brochure',
  protect,
  authorizeRoles('student'),
  uploadSingle('file', 'brochures'),
  uploadFile
);

router.post(
  '/certificate',
  protect,
  authorizeRoles('student'),
  uploadSingle('file', 'certificates'),
  uploadFile
);

router.post(
  '/photo',
  protect,
  authorizeRoles('student'),
  uploadSingle('file', 'photos'),
  uploadFile
);

/**
 * PATCH /api/upload/attach
 * Called after S18 form is submitted — links uploaded files to the form record.
 */
router.patch(
  '/attach',
  protect,
  authorizeRoles('student'),
  attachFilesToForm
);

module.exports = router;
