const S18 = require('../models/S18');

// POST /api/s18 — Student submits form
const submitForm = async (req, res) => {
  try {
    const form = await S18.create({ ...req.body, student: req.user._id });
    res.status(201).json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/s18/my — Student sees own forms
const getMyForms = async (req, res) => {
  try {
    const forms = await S18.find({ student: req.user._id }).sort({ createdAt: -1 });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/s18/pending/tutor — Tutor sees pending forms
const getPendingForTutor = async (req, res) => {
  try {
    const forms = await S18.find({ status: 'pending' })
      .populate('student', 'name email registrationNo')
      .sort({ createdAt: -1 });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/s18/pending/hod — HOD sees tutor approved forms
const getPendingForHOD = async (req, res) => {
  try {
    const forms = await S18.find({ status: 'tutor_approved' })
      .populate('student', 'name email registrationNo')
      .populate('tutorApproval.approvedBy', 'name')
      .sort({ createdAt: -1 });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/s18/pending/proctor — Chief Proctor sees HOD approved forms
const getPendingForProctor = async (req, res) => {
  try {
    const forms = await S18.find({ status: 'hod_approved' })
      .populate('student', 'name email registrationNo')
      .populate('tutorApproval.approvedBy', 'name')
      .populate('hodApproval.approvedBy', 'name')
      .sort({ createdAt: -1 });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/s18/:id/tutor — Tutor approves/rejects
const tutorAction = async (req, res) => {
  try {
    const { action, remarks } = req.body;
    const form = await S18.findById(req.params.id);
    if (!form) return res.status(404).json({ message: 'Form not found' });

    form.tutorApproval = { approvedBy: req.user._id, approvedAt: new Date(), remarks, status: action };
    form.status = action === 'approved' ? 'tutor_approved' : 'rejected';
    if (action === 'rejected') form.rejectionReason = remarks;
    await form.save();
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/s18/:id/hod — HOD approves/rejects
const hodAction = async (req, res) => {
  try {
    const { action, remarks } = req.body;
    const form = await S18.findById(req.params.id);
    if (!form) return res.status(404).json({ message: 'Form not found' });

    form.hodApproval = { approvedBy: req.user._id, approvedAt: new Date(), remarks, status: action };
    form.status = action === 'approved' ? 'hod_approved' : 'rejected';
    if (action === 'rejected') form.rejectionReason = remarks;
    await form.save();
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/s18/:id/proctor — Chief Proctor final approval
const proctorAction = async (req, res) => {
  try {
    const { action, remarks, bonusAttendanceGranted } = req.body;
    const form = await S18.findById(req.params.id);
    if (!form) return res.status(404).json({ message: 'Form not found' });

    form.proctorApproval = {
      approvedBy: req.user._id, approvedAt: new Date(),
      remarks, status: action,
      bonusAttendanceGranted: action === 'approved' ? bonusAttendanceGranted : 0
    };
    form.status = action === 'approved' ? 'approved' : 'rejected';
    if (action === 'rejected') form.rejectionReason = remarks;
    await form.save();
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/s18/:id — Single form detail
const getFormById = async (req, res) => {
  try {
    const form = await S18.findById(req.params.id)
      .populate('student', 'name email registrationNo')
      .populate('tutorApproval.approvedBy', 'name')
      .populate('hodApproval.approvedBy', 'name')
      .populate('proctorApproval.approvedBy', 'name');
    if (!form) return res.status(404).json({ message: 'Form not found' });
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitForm, getMyForms, getPendingForTutor,
  getPendingForHOD, getPendingForProctor,
  tutorAction, hodAction, proctorAction, getFormById
};
