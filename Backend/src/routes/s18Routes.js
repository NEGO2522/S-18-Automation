const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const {
  submitForm, getMyForms, getTutorActed, getHODActed, getPendingForTutor,
  getPendingForHOD, getPendingForProctor,
  tutorAction, hodAction, proctorAction, getFormById
} = require('../controllers/s18Controller');

// Student
router.post('/', protect, authorizeRoles('student'), submitForm);
router.get('/my', protect, authorizeRoles('student'), getMyForms);

// Tutor
router.get('/tutor/acted', protect, authorizeRoles('tutor'), getTutorActed);
router.get('/pending/tutor', protect, authorizeRoles('tutor'), getPendingForTutor);
router.put('/:id/tutor', protect, authorizeRoles('tutor'), tutorAction);

// HOD
router.get('/hod/acted', protect, authorizeRoles('hod'), getHODActed);
router.get('/pending/hod', protect, authorizeRoles('hod'), getPendingForHOD);
router.put('/:id/hod', protect, authorizeRoles('hod'), hodAction);

// Chief Proctor
router.get('/pending/proctor', protect, authorizeRoles('chief_proctor'), getPendingForProctor);
router.put('/:id/proctor', protect, authorizeRoles('chief_proctor'), proctorAction);

// Common
router.get('/:id', protect, getFormById);

module.exports = router;
