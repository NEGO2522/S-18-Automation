import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
// import API from '../utils/api'; // Using fetch logic directly or mock for now as API may not be fully set up
import toast, { Toaster } from 'react-hot-toast';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('new'); // 'new' | 'my-requests'

  // Form State
  const [formData, setFormData] = useState({
    studentName: user?.name || '',
    registrationNo: '',
    campus: '',
    year: '',
    branch: '',
    email: user?.email || '',
    mobileNo: '',
    activityName: '',
    organizingInstitution: '',
    activityType: '',
    startDate: '',
    endDate: '',
  });

  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If we switch to 'my-requests', we would fetch from the API here
    if (activeTab === 'my-requests') {
      fetchMyRequests();
    }
  }, [activeTab]);

  const fetchMyRequests = async () => {
    // Mocking fetch logic for now
    // try {
    //   const { data } = await API.get('/s18/my-requests');
    //   setMyRequests(data);
    // } catch (error) {
    //   toast.error('Failed to fetch requests');
    // }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success('S18 Request submitted successfully!');
      setLoading(false);
      setActiveTab('my-requests');
      // Adding it to mock list just for UI demonstration
      setMyRequests([
        { activityName: formData.activityName, status: 'Pending', date: new Date().toLocaleDateString() },
        ...myRequests
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* TABS */}
        <div className="flex gap-6 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('new')}
            className={`pb-3 font-semibold text-sm transition-colors ${
              activeTab === 'new'
                ? 'border-b-2 border-[#3C3489] text-[#3C3489]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            New S18 Request
          </button>
          <button
            onClick={() => setActiveTab('my-requests')}
            className={`pb-3 font-semibold text-sm transition-colors ${
              activeTab === 'my-requests'
                ? 'border-b-2 border-[#3C3489] text-[#3C3489]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            My Requests
          </button>
        </div>

        {/* TAB CONTENT: NEW S18 REQUEST */}
        {activeTab === 'new' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* SECTION 1 — Student Details */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
                  Student Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#3C3489]/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration No</label>
                    <input
                      type="text"
                      name="registrationNo"
                      value={formData.registrationNo}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#3C3489]/50"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Campus</label>
                    <select
                      name="campus"
                      value={formData.campus}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#3C3489]/50 bg-white"
                      required
                    >
                      <option value="">Select Campus</option>
                      <option value="Poornima College of Engineering">Poornima College of Engineering</option>
                      <option value="Poornima University Main Campus">Poornima University Main Campus</option>
                      <option value="PIIT">PIIT</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#3C3489]/50 bg-white"
                      required
                    >
                      <option value="">Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#3C3489]/50 bg-white"
                      required
                    >
                      <option value="">Select Branch</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Civil">Civil</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#3C3489]/50 bg-gray-50"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No</label>
                    <input
                      type="text"
                      name="mobileNo"
                      value={formData.mobileNo}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#3C3489]/50"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2 — Activity Details */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
                  Activity Details
                </h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Activity Name</label>
                  <input
                    type="text"
                    name="activityName"
                    value={formData.activityName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#3C3489]/50"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organizing Institution</label>
                    <input
                      type="text"
                      name="organizingInstitution"
                      value={formData.organizingInstitution}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#3C3489]/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
                    <select
                      name="activityType"
                      value={formData.activityType}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#3C3489]/50 bg-white"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Hackathon">Hackathon</option>
                      <option value="Conference">Conference</option>
                      <option value="Seminar">Seminar</option>
                      <option value="Sports">Sports</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#3C3489]/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#3C3489]/50"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#3C3489] text-white px-8 py-2.5 rounded-lg font-medium hover:bg-[#2A2362] transition disabled:opacity-70"
                >
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB CONTENT: MY REQUESTS */}
        {activeTab === 'my-requests' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">My S18 Requests</h3>
            {myRequests.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-2">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-500">You have not submitted any S18 requests yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myRequests.map((req, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-sm transition-shadow">
                    <div>
                      <h4 className="font-semibold text-gray-800">{req.activityName}</h4>
                      <p className="text-sm text-gray-500 mt-1">Submitted on {req.date}</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
