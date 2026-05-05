import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
// import API from '../utils/api'; // Using mock for now
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle } from 'lucide-react';

const ProctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('final-approval'); // 'final-approval' | 'post-participation'
  
  // Tab 1 States
  const [forms, setForms] = useState([]);
  const [loadingForms, setLoadingForms] = useState(true);
  const [bonusDays, setBonusDays] = useState({});
  const [remarks, setRemarks] = useState({});
  const [actionLoading, setActionLoading] = useState({ id: null, type: null });

  // Tab 2 States
  const [postForms, setPostForms] = useState([]);
  const [loadingPostForms, setLoadingPostForms] = useState(true);
  const [checklists, setChecklists] = useState({});
  const [postActionLoading, setPostActionLoading] = useState(null);

  useEffect(() => {
    if (activeTab === 'final-approval') {
      fetchPendingForms();
    } else {
      fetchPostParticipationForms();
    }
  }, [activeTab]);

  const fetchPendingForms = async () => {
    try {
      setLoadingForms(true);
      // const { data } = await API.get('/s18/pending/proctor');
      // setForms(data);
      
      // Mock Data
      setTimeout(() => {
        setForms([
          {
            id: '1',
            studentName: 'Rahul Kumar',
            registrationNo: '2023PUCS0123',
            branch: 'Computer Science',
            activityName: 'National Hackathon 2026',
            organizingInstitution: 'IIT Delhi',
            activityType: 'Hackathon',
            fromDate: '2026-05-12',
            toDate: '2026-05-15',
            cumulativeAttendance: 78,
            teamMembersCount: 2,
            tutorApproval: { approvedBy: { name: 'Dr. Ramesh Singh' }, date: '02 May 2026' },
            hodApproval: { approvedBy: { name: 'Dr. S. K. Jain' }, date: '04 May 2026' },
            brochureLink: 'https://example.com/brochure',
            activityDetailsLink: 'https://example.com/details'
          }
        ]);
        setLoadingForms(false);
      }, 1500);
    } catch (error) {
      toast.error('Failed to fetch pending forms');
      setLoadingForms(false);
    }
  };

  const fetchPostParticipationForms = async () => {
    try {
      setLoadingPostForms(true);
      // const { data } = await API.get('/s18/my'); // Filter in API or here
      // const filtered = data.filter(f => f.status === 'approved' && f.postParticipation?.finalBonusGranted === false);
      // setPostForms(filtered);
      
      // Mock Data
      setTimeout(() => {
        setPostForms([
          {
            id: '101',
            studentName: 'Sneha Gupta',
            activityName: 'AI Seminar',
            fromDate: '2026-04-10',
            toDate: '2026-04-11',
            preApprovedBonus: 10
          }
        ]);
        
        // Initialize checklists state for the fetched forms
        const initialChecklists = {};
        [{ id: '101' }].forEach(f => {
          initialChecklists[f.id] = { hardCopy: false, softCopy: false };
        });
        setChecklists(initialChecklists);
        
        setLoadingPostForms(false);
      }, 1500);
    } catch (error) {
      toast.error('Failed to fetch post-participation forms');
      setLoadingPostForms(false);
    }
  };

  // Tab 1 Handlers
  const handleBonusDaysChange = (id, value) => {
    setBonusDays(prev => ({ ...prev, [id]: value }));
  };

  const handleRemarkChange = (id, text) => {
    setRemarks(prev => ({ ...prev, [id]: text }));
  };

  const calculateMaxBonus = (fromDate, toDate) => {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const durationDays = Math.max(1, (end - start) / (1000 * 60 * 60 * 24) + 1);
    return durationDays * 5;
  };

  const handleGrantPermission = async (id) => {
    const currentBonus = parseInt(bonusDays[id] || 0);
    if (currentBonus <= 0 || isNaN(currentBonus)) {
      toast.error('Bonus Attendance Days must be greater than 0 to grant permission');
      return;
    }
    
    setActionLoading({ id, type: 'grant' });
    try {
      // await API.put(`/s18/${id}/proctor`, { action: 'approved', remarks: remarks[id] || '', bonusAttendanceGranted: currentBonus });
      
      setTimeout(() => {
        toast.success('Approved! Attendance credit ho gayi.');
        setForms(forms.filter(form => form.id !== id));
        setActionLoading({ id: null, type: null });
      }, 1000);
    } catch (error) {
      toast.error('Failed to grant permission');
      setActionLoading({ id: null, type: null });
    }
  };

  const handleDeny = async (id) => {
    const currentRemarks = remarks[id] || '';
    if (!currentRemarks.trim()) {
      toast.error('Deny karne ke liye remarks required hai');
      return;
    }

    setActionLoading({ id, type: 'deny' });
    try {
      // await API.put(`/s18/${id}/proctor`, { action: 'rejected', remarks: currentRemarks, bonusAttendanceGranted: 0 });
      
      setTimeout(() => {
        toast.success('Denied. Student ko notify kar diya.');
        setForms(forms.filter(form => form.id !== id));
        setActionLoading({ id: null, type: null });
      }, 1000);
    } catch (error) {
      toast.error('Failed to deny');
      setActionLoading({ id: null, type: null });
    }
  };

  // Tab 2 Handlers
  const handleCheck = (id, field) => {
    setChecklists(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: !prev[id]?.[field]
      }
    }));
  };

  const handleVerifyFinal = async (id) => {
    setPostActionLoading(id);
    try {
      // await API.put(`/s18/${id}/proctor/post`);
      
      setTimeout(() => {
        toast.success('Final Bonus Attendance Verified & Granted!');
        setPostForms(postForms.filter(f => f.id !== id));
        setPostActionLoading(null);
      }, 1000);
    } catch (error) {
      toast.error('Failed to verify final attendance');
      setPostActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* TABS */}
        <div className="flex gap-6 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('final-approval')}
            className={`pb-3 font-semibold text-sm transition-colors ${
              activeTab === 'final-approval'
                ? 'border-b-2 border-[#3C3489] text-[#3C3489]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Final Approval
          </button>
          <button
            onClick={() => setActiveTab('post-participation')}
            className={`pb-3 font-semibold text-sm transition-colors ${
              activeTab === 'post-participation'
                ? 'border-b-2 border-[#3C3489] text-[#3C3489]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Post Participation
          </button>
        </div>

        {/* TAB 1 CONTENT */}
        {activeTab === 'final-approval' && (
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Final Approval</h1>
            <p className="text-sm text-gray-500 mt-1 mb-6">HOD recommended forms — Chief Proctor final decision</p>

            {loadingForms ? (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl h-32 animate-pulse shadow-sm border border-gray-100"></div>
                <div className="bg-white rounded-2xl h-32 animate-pulse shadow-sm border border-gray-100"></div>
                <div className="bg-white rounded-2xl h-32 animate-pulse shadow-sm border border-gray-100"></div>
              </div>
            ) : forms.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <CheckCircle className="w-40 h-40 text-gray-300" />
                <p className="text-gray-400 text-sm mt-3">Koi pending forms nahi hain</p>
              </div>
            ) : (
              <div className="space-y-4">
                {forms.map(form => {
                  const attendanceColor = form.cumulativeAttendance >= 75 ? 'text-green-600' : 'text-red-600';
                  const maxBonus = calculateMaxBonus(form.fromDate, form.toDate);
                  const durationDays = maxBonus / 5;
                  const isGrantLoading = actionLoading.id === form.id && actionLoading.type === 'grant';
                  const isDenyLoading = actionLoading.id === form.id && actionLoading.type === 'deny';
                  const isAnyLoading = actionLoading.id === form.id;

                  return (
                    <div key={form.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
                      {/* TOP ROW */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-800">{form.studentName}</h3>
                          <p className="text-sm text-gray-500">{form.registrationNo} • {form.branch}</p>
                        </div>
                        <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full font-semibold">
                          HOD Recommended ✓
                        </span>
                      </div>

                      {/* MIDDLE ROW */}
                      <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Event: </span>
                          <span className="font-medium text-gray-800">{form.activityName}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Organizer: </span>
                          <span className="text-gray-800">{form.organizingInstitution}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Activity Type: </span>
                          <span className="text-gray-800">{form.activityType}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Dates: </span>
                          <span className="text-gray-800">{form.fromDate} to {form.toDate}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Attendance: </span>
                          <span className={`font-semibold ${attendanceColor}`}>{form.cumulativeAttendance}%</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Team Members: </span>
                          <span className="text-gray-800">{form.teamMembersCount}</span>
                        </div>
                      </div>

                      {/* APPROVAL CHAIN BOX */}
                      <div className="mt-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <h4 className="text-xs font-semibold text-gray-400 uppercase mb-3">Approval Chain</h4>
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">Tutor: {form.tutorApproval?.approvedBy?.name}</span>
                          <span className="text-xs text-gray-400 ml-2">{form.tutorApproval?.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">HOD: {form.hodApproval?.approvedBy?.name}</span>
                          <span className="text-xs text-gray-400 ml-2">{form.hodApproval?.date}</span>
                        </div>
                      </div>

                      {/* PROOF LINKS */}
                      {(form.brochureLink || form.activityDetailsLink) && (
                        <div className="mt-3 flex gap-4 text-sm">
                          {form.brochureLink && (
                            <a href={form.brochureLink} target="_blank" rel="noreferrer" className="text-[#3C3489] underline font-medium">
                              Brochure
                            </a>
                          )}
                          {form.activityDetailsLink && (
                            <a href={form.activityDetailsLink} target="_blank" rel="noreferrer" className="text-[#3C3489] underline font-medium">
                              Activity Details
                            </a>
                          )}
                        </div>
                      )}

                      {/* BONUS ATTENDANCE INPUT */}
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Bonus Attendance Days to Grant</label>
                        <p className="text-xs text-gray-400 mb-2">Max 5 per day. Event was {durationDays} days long.</p>
                        <input
                          type="number"
                          min="0"
                          max={maxBonus}
                          value={bonusDays[form.id] || ''}
                          onChange={(e) => handleBonusDaysChange(form.id, e.target.value)}
                          className="w-32 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3C3489] bg-white"
                          disabled={isAnyLoading}
                        />
                      </div>

                      {/* REMARKS INPUT */}
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Chief Proctor Remarks (optional)</label>
                        <input
                          type="text"
                          value={remarks[form.id] || ''}
                          onChange={(e) => handleRemarkChange(form.id, e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3C3489] bg-white"
                          disabled={isAnyLoading}
                        />
                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="mt-4 flex gap-3 flex-wrap">
                        <button
                          onClick={() => handleGrantPermission(form.id)}
                          disabled={isAnyLoading}
                          className="bg-[#3C3489] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#26215C] transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isGrantLoading ? (
                            <span className="flex items-center gap-2">
                              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                              Granting...
                            </span>
                          ) : (
                            "Grant Permission & Credit Attendance"
                          )}
                        </button>
                        <button
                          onClick={() => handleDeny(form.id)}
                          disabled={isAnyLoading}
                          className="bg-red-50 text-red-600 border border-red-200 px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isDenyLoading ? (
                            <span className="flex items-center gap-2">
                              <svg className="animate-spin h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                              Denying...
                            </span>
                          ) : (
                            "Deny"
                          )}
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2 CONTENT */}
        {activeTab === 'post-participation' && (
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Post Participation</h1>
            <p className="text-sm text-gray-500 mt-1 mb-6">Verify reports and grant final bonus attendance</p>

            {loadingPostForms ? (
               <div className="space-y-4">
                <div className="bg-white rounded-2xl h-32 animate-pulse shadow-sm border border-gray-100"></div>
                <div className="bg-white rounded-2xl h-32 animate-pulse shadow-sm border border-gray-100"></div>
               </div>
            ) : postForms.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                Koi post-participation verification pending nahi hai
              </div>
            ) : (
              <div className="space-y-4">
                {postForms.map(form => {
                  const check = checklists[form.id] || {};
                  const isCheckedBoth = check.hardCopy && check.softCopy;
                  const isPostLoading = postActionLoading === form.id;

                  return (
                    <div key={form.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
                      {/* TOP ROW */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-800">{form.studentName} • {form.activityName}</h3>
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
                          Pre-Approved
                        </span>
                      </div>

                      {/* MIDDLE */}
                      <div className="mt-3 text-sm text-gray-600">
                        <p>Dates: {form.fromDate} to {form.toDate}</p>
                        <p className="mt-1">Pre-Approved Bonus: <span className="font-semibold">{form.preApprovedBonus} days</span></p>
                      </div>

                      {/* VERIFICATION CHECKLIST */}
                      <div className="mt-4 space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 text-[#3C3489] rounded border-gray-300 focus:ring-[#3C3489]"
                            checked={check.hardCopy || false}
                            onChange={() => handleCheck(form.id, 'hardCopy')}
                            disabled={isPostLoading}
                          />
                          <span className="text-sm text-gray-700">Hard copy report submitted to HOD/Dy.HOD</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 text-[#3C3489] rounded border-gray-300 focus:ring-[#3C3489]"
                            checked={check.softCopy || false}
                            onChange={() => handleCheck(form.id, 'softCopy')}
                            disabled={isPostLoading}
                          />
                          <span className="text-sm text-gray-700">Soft copy + photos emailed to pic@poornima.org (CC to HOD)</span>
                        </label>
                      </div>

                      {/* GRANT BUTTON */}
                      <div className="mt-4">
                        <button
                          onClick={() => handleVerifyFinal(form.id)}
                          disabled={!isCheckedBoth || isPostLoading}
                          className="bg-[#3C3489] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#26215C] transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isPostLoading ? (
                            <span className="flex items-center gap-2">
                              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                              Verifying...
                            </span>
                          ) : (
                            "Verify & Grant Final Bonus Attendance"
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default ProctorDashboard;
