import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
// import API from '../utils/api'; // Using mock for now
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle } from 'lucide-react';

const HODDashboard = () => {
  const [activeView, setActiveView] = useState('pending');
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [expandedForms, setExpandedForms] = useState({});
  const [remarks, setRemarks] = useState({});
  const [actionLoading, setActionLoading] = useState({ id: null, type: null });
  const activityLog = [
    {
      id: 'h1',
      studentName: 'Kabir Singh',
      registrationNo: '2023PUCS0156',
      branch: 'Computer Science',
      activityName: 'IoT Innovation Challenge',
      decision: 'Recommended',
      date: '08 May 2026',
      remarks: 'Sent to Chief Proctor'
    },
    {
      id: 'h2',
      studentName: 'Meera Jain',
      registrationNo: '2024PUIT0417',
      branch: 'Information Technology',
      activityName: 'Cybersecurity Bootcamp',
      decision: 'Returned',
      date: '05 May 2026',
      remarks: 'Clarification requested from tutor'
    }
  ];

  useEffect(() => {
    fetchPendingForms();
  }, []);

  const fetchPendingForms = async () => {
    try {
      setLoading(true);
      // const { data } = await API.get('/s18/pending/hod');
      // setForms(data);
      
      // Mock Data
      setTimeout(() => {
        setForms([
          {
            id: '1',
            studentName: 'Rahul Kumar',
            registrationNo: '2023PUCS0123',
            branch: 'Computer Science',
            year: '3rd Year',
            activityName: 'National Hackathon 2026',
            organizingInstitution: 'IIT Delhi',
            activityType: 'Hackathon',
            fromDate: '12 May 2026',
            toDate: '15 May 2026',
            cumulativeAttendance: 78,
            teamMembersCount: 2,
            tutorApproval: {
              approvedBy: { name: 'Dr. Ramesh Singh' },
              date: '02 May 2026',
              remarks: 'Student has good track record, recommended.'
            },
            brochureLink: 'https://example.com/brochure',
            activityDetailsLink: 'https://example.com/details',
            parentConsent: 'Yes',
            parentMobile: '+91-9876543210',
            teamMembers: 'Amit, Sneha',
            lastParticipation: 'TechFest 2025',
            email: 'rahul.2023@poornima.edu.in',
            mobile: '+91-9988776655'
          },
          {
            id: '2',
            studentName: 'Priya Sharma',
            registrationNo: '2024PUIT0456',
            branch: 'Information Technology',
            year: '2nd Year',
            activityName: 'AI Seminar',
            organizingInstitution: 'BITS Pilani',
            activityType: 'Seminar',
            fromDate: '20 Jun 2026',
            toDate: '21 Jun 2026',
            cumulativeAttendance: 65,
            teamMembersCount: 0,
            tutorApproval: {
              approvedBy: { name: 'Prof. Anita Desai' },
              date: '03 May 2026',
              remarks: 'Attendance is slightly low, but allowed as per rules.'
            },
            brochureLink: '',
            activityDetailsLink: 'https://example.com/ai-seminar',
            parentConsent: 'No',
            parentMobile: '+91-8765432109',
            teamMembers: 'None',
            lastParticipation: 'None',
            email: 'priya.2024@poornima.edu.in',
            mobile: '+91-8899776655'
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

  const handleRecommend = async (id) => {
    const currentRemarks = remarks[id] || '';
    
    setActionLoading({ id, type: 'recommend' });
    try {
      // await API.put(`/s18/${id}/hod`, { action: 'approved', remarks: currentRemarks });
      
      setTimeout(() => {
        toast.success('Recommended! Chief Proctor ko bhej diya.');
        setForms(forms.filter(form => form.id !== id));
        setActionLoading({ id: null, type: null });
      }, 1000);
    } catch (error) {
      toast.error('Failed to recommend');
      setActionLoading({ id: null, type: null });
    }
  };

  const handleReturn = async (id) => {
    const currentRemarks = remarks[id] || '';
    if (!currentRemarks.trim()) {
      toast.error('Return karne ke liye remarks required hai');
      return;
    }

    setActionLoading({ id, type: 'return' });
    try {
      // await API.put(`/s18/${id}/hod`, { action: 'rejected', remarks: currentRemarks });
      
      setTimeout(() => {
        toast.success('Tutor ko wapas bhej diya.');
        setForms(forms.filter(form => form.id !== id));
        setActionLoading({ id: null, type: null });
      }, 1000);
    } catch (error) {
      toast.error('Failed to return');
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
            <h1 className="text-2xl font-semibold text-gray-800">HOD Recommendations</h1>
            <p className="text-sm text-gray-500 mt-1">Tutor verified forms — HOD sign baaki hai</p>
          </div>
          {activeView === 'pending' && !loading && forms.length > 0 && (
            <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
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
              const isLoadingRecommend = actionLoading.id === form.id && actionLoading.type === 'recommend';
              const isLoadingReturn = actionLoading.id === form.id && actionLoading.type === 'return';
              const isAnyLoading = actionLoading.id === form.id;

              return (
                <div key={form.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  
                  {/* TOP ROW */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{form.studentName}</h3>
                      <p className="text-sm text-gray-500">
                        {form.registrationNo} • {form.branch} • {form.year}
                      </p>
                    </div>
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-semibold">
                      Tutor Verified ✓
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
                      <span className={`font-semibold ${attendanceColor}`}>
                        {form.cumulativeAttendance}%
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Team Members: </span>
                      <span className="text-gray-800">{form.teamMembersCount}</span>
                    </div>
                  </div>

                  {/* TUTOR APPROVAL INFO BOX */}
                  <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-700">
                        Tutor Verified by {form.tutorApproval?.approvedBy?.name}
                      </span>
                      <span className="text-xs text-green-600 ml-auto">
                        {form.tutorApproval?.date}
                      </span>
                    </div>
                    {form.tutorApproval?.remarks && (
                      <p className="text-xs text-gray-500 italic mt-1 pl-6">
                        "{form.tutorApproval.remarks}"
                      </p>
                    )}
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
                        <span className="text-gray-500 block text-xs">Last Participation</span>
                        <span className="font-medium text-gray-800">{form.lastParticipation}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-xs">Student Email</span>
                        <span className="font-medium text-gray-800">{form.email}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-xs">Student Mobile</span>
                        <span className="font-medium text-gray-800">{form.mobile}</span>
                      </div>
                    </div>
                  )}

                  {/* REMARKS INPUT */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      HOD Remarks (optional)
                    </label>
                    <input
                      type="text"
                      value={remarks[form.id] || ''}
                      onChange={(e) => handleRemarkChange(form.id, e.target.value)}
                      placeholder="Add your remarks here..."
                      className="border border-gray-300 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#3C3489] bg-white"
                      disabled={isAnyLoading}
                    />
                  </div>

                  {/* ACTION BUTTONS ROW */}
                  <div className="mt-4 flex gap-3 flex-wrap">
                    <button
                      onClick={() => handleRecommend(form.id)}
                      disabled={isAnyLoading}
                      className="bg-[#3C3489] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#26215C] transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoadingRecommend ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          Recommending...
                        </span>
                      ) : (
                        "Recommend & Send to Chief Proctor"
                      )}
                    </button>
                    <button
                      onClick={() => handleReturn(form.id)}
                      disabled={isAnyLoading}
                      className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-5 py-2 rounded-lg text-sm font-medium hover:bg-yellow-100 transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoadingReturn ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-yellow-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          Returning...
                        </span>
                      ) : (
                        "Return to Tutor"
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
                    <p className="text-sm text-gray-500">
                      {item.registrationNo} • {item.branch} • {item.activityName}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">{item.remarks}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      item.decision === 'Recommended'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
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

export default HODDashboard;
