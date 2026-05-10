import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
// import API from '../utils/api'; // Using fetch logic directly or mock for now
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle } from 'lucide-react';

const TutorDashboard = () => {
  const [activeView, setActiveView] = useState('pending');
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [expandedForms, setExpandedForms] = useState({});
  const [remarks, setRemarks] = useState({});
  const [rejectingForms, setRejectingForms] = useState({});
  const [actionLoading, setActionLoading] = useState({ id: null, type: null });
  const activityLog = [
    {
      id: 'h1',
      studentName: 'Aarav Mehta',
      registrationNo: '2023PUCS0108',
      activityName: 'Robotics Workshop',
      decision: 'Approved',
      date: '08 May 2026',
      remarks: 'Forwarded to HOD'
    },
    {
      id: 'h2',
      studentName: 'Nisha Verma',
      registrationNo: '2024PUIT0321',
      activityName: 'Design Sprint',
      decision: 'Rejected',
      date: '06 May 2026',
      remarks: 'Parent consent missing'
    }
  ];

  useEffect(() => {
    fetchPendingForms();
  }, []);

  const fetchPendingForms = async () => {
    try {
      setLoading(true);
      // Mock API call
      // const { data } = await API.get('/s18/pending/tutor');
      // setForms(data);
      
      setTimeout(() => {
        setForms([
          {
            id: '1',
            studentName: 'Rahul Kumar',
            registrationNo: '2023PUCS0123',
            activityName: 'National Hackathon 2026',
            organizingInstitution: 'IIT Delhi',
            fromDate: '12 May 2026',
            toDate: '15 May 2026',
            cumulativeAttendance: 78,
            brochureLink: 'https://example.com/brochure',
            activityDetailsLink: 'https://example.com/details',
            parentConsent: 'Yes',
            parentMobile: '+91-9876543210',
            teamMembers: 'Amit, Sneha',
            lastParticipation: 'TechFest 2025'
          },
          {
            id: '2',
            studentName: 'Priya Sharma',
            registrationNo: '2024PUIT0456',
            activityName: 'AI Seminar',
            organizingInstitution: 'BITS Pilani',
            fromDate: '20 Jun 2026',
            toDate: '21 Jun 2026',
            cumulativeAttendance: 65,
            brochureLink: '',
            activityDetailsLink: 'https://example.com/ai-seminar',
            parentConsent: 'No',
            parentMobile: '+91-8765432109',
            teamMembers: 'None',
            lastParticipation: 'None'
          }
        ]);
        setLoading(false);
      }, 1500);
    } catch (error) {
      toast.error('Failed to fetch pending forms');
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedForms(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleRemarkChange = (id, text) => {
    setRemarks(prev => ({
      ...prev,
      [id]: text
    }));
  };

  const handleApprove = async (id) => {
    const currentRemarks = remarks[id] || '';
    
    setActionLoading({ id, type: 'approve' });
    try {
      // await API.put(`/s18/${id}/tutor`, { action: 'approved', remarks: currentRemarks });
      
      setTimeout(() => {
        toast.success('Approved! HOD ko forward kar diya.');
        setForms(forms.filter(form => form.id !== id));
        setActionLoading({ id: null, type: null });
      }, 1000);
    } catch (error) {
      toast.error('Failed to approve');
      setActionLoading({ id: null, type: null });
    }
  };

  const handleReject = async (id) => {
    const currentRemarks = remarks[id] || '';
    if (!currentRemarks.trim()) {
      setRejectingForms(prev => ({ ...prev, [id]: true }));
      toast.error('Rejection ke liye remarks required hai');
      return;
    }

    setActionLoading({ id, type: 'reject' });
    try {
      // await API.put(`/s18/${id}/tutor`, { action: 'rejected', remarks: currentRemarks });
      
      setTimeout(() => {
        toast.success('Rejected. Student ko notify kar diya.');
        setForms(forms.filter(form => form.id !== id));
        setRejectingForms(prev => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
        setActionLoading({ id: null, type: null });
      }, 1000);
    } catch (error) {
      toast.error('Failed to reject');
      setActionLoading({ id: null, type: null });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* PAGE HEADING */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Pending Verifications</h1>
            <p className="text-sm text-gray-500 mt-1">Tutor se approval baaki hai</p>
          </div>
          {activeView === 'pending' && !loading && forms.length > 0 && (
            <span className="bg-yellow-100 text-yellow-700 text-sm font-semibold px-3 py-1 rounded-full">
              {forms.length} Pending
            </span>
          )}
        </div>

        <div className="mb-6 inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveView('pending')}
            className={`min-w-28 rounded-md px-4 py-2 text-sm font-semibold transition ${
              activeView === 'pending'
                ? 'bg-[#3C3489] text-white shadow-sm'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            Pending
          </button>
          <button
            type="button"
            onClick={() => setActiveView('activity-log')}
            className={`min-w-28 rounded-md px-4 py-2 text-sm font-semibold transition ${
              activeView === 'activity-log'
                ? 'bg-[#3C3489] text-white shadow-sm'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            Activity Log
          </button>
        </div>

        {/* LOADING STATE */}
        {activeView === 'pending' && loading && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl h-32 animate-pulse shadow-sm border border-gray-100"></div>
            <div className="bg-white rounded-2xl h-32 animate-pulse shadow-sm border border-gray-100"></div>
            <div className="bg-white rounded-2xl h-32 animate-pulse shadow-sm border border-gray-100"></div>
          </div>
        )}

        {/* EMPTY STATE */}
        {activeView === 'pending' && !loading && forms.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <CheckCircle className="w-40 h-40 text-gray-300" />
            <p className="text-gray-400 text-sm mt-3">Koi pending forms nahi hain</p>
          </div>
        )}

        {/* FORM CARDS */}
        {activeView === 'pending' && !loading && forms.length > 0 && (
          <div className="space-y-4">
            {forms.map(form => {
              const isExpanded = !!expandedForms[form.id];
              const attendanceColor = form.cumulativeAttendance >= 75 ? 'text-green-600' : 'text-red-600';
              const isLoadingApprove = actionLoading.id === form.id && actionLoading.type === 'approve';
              const isLoadingReject = actionLoading.id === form.id && actionLoading.type === 'reject';
              const isAnyLoading = actionLoading.id === form.id;

              return (
                <div key={form.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  
                  {/* TOP ROW */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{form.studentName}</h3>
                      <p className="text-sm text-gray-500">{form.registrationNo}</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-semibold">
                      Pending Review
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
                      <span className="text-gray-500">Dates: </span>
                      <span className="text-gray-800">{form.fromDate} to {form.toDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Attendance: </span>
                      <span className={`font-semibold ${attendanceColor}`}>
                        {form.cumulativeAttendance}%
                      </span>
                    </div>
                  </div>

                  {/* PROOF LINKS ROW */}
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

                  {/* EXPAND BUTTON */}
                  <div 
                    className="text-sm text-[#3C3489] font-medium cursor-pointer mt-3 select-none"
                    onClick={() => toggleExpand(form.id)}
                  >
                    {isExpanded ? 'Hide ▴' : 'View Full Details ▾'}
                  </div>

                  {/* EXPANDED SECTION */}
                  {isExpanded && (
                    <div className="bg-gray-50 rounded-xl p-4 mt-3 text-sm grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <span className="text-gray-500 block text-xs">Parent Consent</span>
                        <span className="font-medium text-gray-800">{form.parentConsent}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-xs">Parent Mobile</span>
                        <span className="font-medium text-gray-800">{form.parentMobile}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-xs">Team Members</span>
                        <span className="font-medium text-gray-800">{form.teamMembers}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-xs">Last Participation (this sem)</span>
                        <span className="font-medium text-gray-800">{form.lastParticipation}</span>
                      </div>
                    </div>
                  )}

                  {rejectingForms[form.id] && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Remarks (required if rejecting)
                      </label>
                      <input
                        type="text"
                        value={remarks[form.id] || ''}
                        onChange={(e) => handleRemarkChange(form.id, e.target.value)}
                        placeholder="Add your remarks here..."
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#3C3489] bg-white"
                        disabled={isAnyLoading}
                        autoFocus
                      />
                    </div>
                  )}

                  {/* ACTION BUTTONS ROW */}
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => handleApprove(form.id)}
                      disabled={isAnyLoading}
                      className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoadingApprove ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          Approving...
                        </span>
                      ) : (
                        "Approve & Forward to HOD"
                      )}
                    </button>
                    <button
                      onClick={() => handleReject(form.id)}
                      disabled={isAnyLoading}
                      className="bg-red-50 text-red-600 border border-red-200 px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoadingReject ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          Rejecting...
                        </span>
                      ) : (
                        "Reject"
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {activeView === 'activity-log' && (
          <div className="space-y-4">
            {activityLog.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.studentName}</h3>
                    <p className="text-sm text-gray-500">{item.registrationNo} • {item.activityName}</p>
                    <p className="text-sm text-gray-500 mt-2">{item.remarks}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      item.decision === 'Approved'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {item.decision}
                    </span>
                    <p className="text-xs text-gray-400 mt-2">{item.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorDashboard;
