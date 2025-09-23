import React, { useState } from 'react';
import { mockAttendance, mockClasses, mockMembers } from '../data/mockData';
import { CheckSquare, Clock, Star, Filter, Download, Calendar, Users, Plus, Eye, Edit, X, Save, Search, UserCheck, MapPin, Video } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  classId: string;
  className: string;
  date: string;
  memberId: string;
  memberName: string;
  checkIn: string;
  checkOut: string;
  duration: number;
  type: 'Online' | 'In-Person' | 'Hybrid';
  feedback: string;
  rating: number;
  status: 'Present' | 'Absent' | 'Late';
}

interface Member {
  id: string;
  name: string;
  membershipLevel: string;
  status: string;
}

const Attendance: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [attendanceFilter, setAttendanceFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'overview' | 'mark' | 'classView'>('overview');
  const [selectedClassForAttendance, setSelectedClassForAttendance] = useState<any>(null);
  const [selectedClassForView, setSelectedClassForView] = useState<any>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(mockAttendance as AttendanceRecord[]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mark Attendance State
  const [markAttendanceData, setMarkAttendanceData] = useState<{[key: string]: {
    status: 'Present' | 'Absent' | 'Late';
    checkIn: string;
    checkOut: string;
    rating: number;
    feedback: string;
  }}>({});

  const filteredAttendance = attendanceRecords.filter(record => {
    const matchesClass = selectedClass === '' || record.classId === selectedClass;
    const matchesDate = selectedDate === '' || record.date === selectedDate;
    const matchesSearch = searchTerm === '' || 
      record.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.className.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesDate && matchesSearch;
  });

  const getAttendanceStats = () => {
    const totalRecords = filteredAttendance.length;
    const avgDuration = filteredAttendance.reduce((sum, record) => sum + record.duration, 0) / totalRecords || 0;
    const avgRating = filteredAttendance.reduce((sum, record) => sum + record.rating, 0) / totalRecords || 0;
    const onlineCount = filteredAttendance.filter(record => record.type === 'Online').length;
    
    return {
      totalRecords,
      avgDuration: Math.round(avgDuration),
      avgRating: avgRating.toFixed(1),
      onlinePercentage: Math.round((onlineCount / totalRecords) * 100) || 0
    };
  };

  const handleMarkAttendance = (classItem: any) => {
    setSelectedClassForAttendance(classItem);
    setViewMode('mark');
    
    // Initialize attendance data for all enrolled members
    const initialData: {[key: string]: any} = {};
    mockMembers.slice(0, classItem.enrolled || 10).forEach((member: any) => {
      initialData[member.id] = {
        status: 'Present',
        checkIn: classItem.time,
        checkOut: '',
        rating: 5,
        feedback: ''
      };
    });
    setMarkAttendanceData(initialData);
  };

  const handleViewClassAttendance = (classItem: any) => {
    setSelectedClassForView(classItem);
    setViewMode('classView');
  };

  const saveAttendance = () => {
    if (!selectedClassForAttendance) return;

    const newRecords: AttendanceRecord[] = [];
    Object.entries(markAttendanceData).forEach(([memberId, data]) => {
      if (data.status === 'Present') {
        const member = mockMembers.find((m: any) => m.id === memberId);
        if (member) {
          const duration = data.checkOut ? 
            (new Date(`2025-01-01 ${data.checkOut}`).getTime() - new Date(`2025-01-01 ${data.checkIn}`).getTime()) / (1000 * 60) :
            selectedClassForAttendance.duration;

          newRecords.push({
            id: `A${String(attendanceRecords.length + newRecords.length + 1).padStart(3, '0')}`,
            classId: selectedClassForAttendance.id,
            className: selectedClassForAttendance.title,
            date: selectedClassForAttendance.date,
            memberId: member.id,
            memberName: member.name,
            checkIn: data.checkIn,
            checkOut: data.checkOut || '',
            duration: Math.round(duration),
            type: selectedClassForAttendance.type,
            feedback: data.feedback,
            rating: data.rating,
            status: data.status
          });
        }
      }
    });

    setAttendanceRecords([...attendanceRecords, ...newRecords]);
    setViewMode('overview');
    setSelectedClassForAttendance(null);
    setMarkAttendanceData({});
  };

  const updateAttendanceData = (memberId: string, field: string, value: any) => {
    setMarkAttendanceData(prev => ({
      ...prev,
      [memberId]: {
        ...prev[memberId],
        [field]: value
      }
    }));
  };

  const getClassAttendanceRecords = (classId: string) => {
    return attendanceRecords.filter(record => record.classId === classId);
  };

  const stats = getAttendanceStats();

  // Get today's and upcoming classes for quick attendance marking
  const todaysClasses = mockClasses.filter((cls: any) => {
    const today = new Date().toISOString().split('T')[0];
    return cls.date === today && cls.status === 'Scheduled';
  });

  const upcomingClasses = mockClasses.filter((cls: any) => {
    const today = new Date();
    const classDate = new Date(cls.date);
    return classDate >= today && cls.status === 'Scheduled';
  }).slice(0, 5);

  if (viewMode === 'mark' && selectedClassForAttendance) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewMode('overview')}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <X size={16} />
              <span>Back to Overview</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mark Attendance</h1>
              <p className="text-gray-600 mt-1">{selectedClassForAttendance.title} - {selectedClassForAttendance.date}</p>
            </div>
          </div>
          <button
            onClick={saveAttendance}
            className="flex items-center space-x-2 px-4 py-2 bg-[#F25274] text-white rounded-lg hover:bg-[#F25274]/90"
          >
            <Save size={16} />
            <span>Save Attendance</span>
          </button>
        </div>

        {/* Class Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <Calendar size={20} className="text-[#F25274]" />
              <div>
                <p className="text-sm text-gray-600">Date & Time</p>
                <p className="font-medium">{selectedClassForAttendance.date} at {selectedClassForAttendance.time}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <UserCheck size={20} className="text-[#6CBFC4]" />
              <div>
                <p className="text-sm text-gray-600">Instructor</p>
                <p className="font-medium">{selectedClassForAttendance.instructor}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Video size={20} className="text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Type</p>
                <p className="font-medium">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock size={20} className="text-[#F3E682]" />
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-medium">{selectedClassForAttendance.duration} minutes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Marking */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Mark Attendance for Members</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check In
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check Out
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Feedback
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockMembers.slice(0, selectedClassForAttendance.enrolled || 10).map((member: any) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[#6CBFC4] rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {member.name.split(' ').map((n: string) => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.membershipLevel}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={markAttendanceData[member.id]?.status || 'Present'}
                        onChange={(e) => updateAttendanceData(member.id, 'status', e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Late">Late</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="time"
                        value={markAttendanceData[member.id]?.checkIn || selectedClassForAttendance.time}
                        onChange={(e) => updateAttendanceData(member.id, 'checkIn', e.target.value)}
                        disabled={markAttendanceData[member.id]?.status === 'Absent'}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#F25274] focus:border-transparent disabled:bg-gray-100"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="time"
                        value={markAttendanceData[member.id]?.checkOut || ''}
                        onChange={(e) => updateAttendanceData(member.id, 'checkOut', e.target.value)}
                        disabled={markAttendanceData[member.id]?.status === 'Absent'}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#F25274] focus:border-transparent disabled:bg-gray-100"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={markAttendanceData[member.id]?.rating || 5}
                        onChange={(e) => updateAttendanceData(member.id, 'rating', parseInt(e.target.value))}
                        disabled={markAttendanceData[member.id]?.status === 'Absent'}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#F25274] focus:border-transparent disabled:bg-gray-100"
                      >
                        <option value={5}>5 - Excellent</option>
                        <option value={4}>4 - Good</option>
                        <option value={3}>3 - Average</option>
                        <option value={2}>2 - Below Average</option>
                        <option value={1}>1 - Poor</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={markAttendanceData[member.id]?.feedback || ''}
                        onChange={(e) => updateAttendanceData(member.id, 'feedback', e.target.value)}
                        disabled={markAttendanceData[member.id]?.status === 'Absent'}
                        placeholder="Optional feedback..."
                        className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#F25274] focus:border-transparent disabled:bg-gray-100"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'classView' && selectedClassForView) {
    const classAttendanceRecords = getClassAttendanceRecords(selectedClassForView.id);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewMode('overview')}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <X size={16} />
              <span>Back to Overview</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Class Attendance</h1>
              <p className="text-gray-600 mt-1">{selectedClassForView.title} - {selectedClassForView.date}</p>
            </div>
          </div>
          <button
            onClick={() => handleMarkAttendance(selectedClassForView)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#F25274] text-white rounded-lg hover:bg-[#F25274]/90"
          >
            <Plus size={16} />
            <span>Mark Attendance</span>
          </button>
        </div>

        {/* Class Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <Calendar size={20} className="text-[#F25274]" />
              <div>
                <p className="text-sm text-gray-600">Date & Time</p>
                <p className="font-medium">{selectedClassForView.date} at {selectedClassForView.time}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <UserCheck size={20} className="text-[#6CBFC4]" />
              <div>
                <p className="text-sm text-gray-600">Instructor</p>
                <p className="font-medium">{selectedClassForView.instructor}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users size={20} className="text-[#F3E682]" />
              <div>
                <p className="text-sm text-gray-600">Attendance</p>
                <p className="font-medium">{classAttendanceRecords.length}/{selectedClassForView.enrolled}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Star size={20} className="text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="font-medium">
                  {classAttendanceRecords.length > 0 
                    ? (classAttendanceRecords.reduce((sum, record) => sum + record.rating, 0) / classAttendanceRecords.length).toFixed(1)
                    : 'N/A'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Records */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Attendance Records</h3>
          </div>
          {classAttendanceRecords.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check In/Out
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Feedback
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {classAttendanceRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-[#6CBFC4] rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              {record.memberName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{record.memberName}</div>
                            <div className="text-sm text-gray-500">{record.memberId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{record.checkIn} - {record.checkOut}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{record.duration} min</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < record.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">{record.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">{record.feedback}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <CheckSquare size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Attendance Records</h3>
              <p className="text-gray-600 mb-4">No attendance has been marked for this class yet.</p>
              <button
                onClick={() => handleMarkAttendance(selectedClassForView)}
                className="flex items-center space-x-2 px-4 py-2 bg-[#F25274] text-white rounded-lg hover:bg-[#F25274]/90 mx-auto"
              >
                <Plus size={16} />
                <span>Mark Attendance</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-600 mt-1">Track and manage class attendance</p>
        </div>
        <div className="flex items-center space-x-3">
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Records</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalRecords}</p>
            </div>
            <div className="bg-[#F25274] p-3 rounded-full">
              <CheckSquare size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Duration</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.avgDuration}m</p>
            </div>
            <div className="bg-[#6CBFC4] p-3 rounded-full">
              <Clock size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.avgRating}</p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-full">
              <Star size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Online Classes</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.onlinePercentage}%</p>
            </div>
            <div className="bg-[#F3E682] p-3 rounded-full">
              <Users size={24} className="text-gray-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions - Today's Classes */}
      {todaysClasses.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Today's Classes - Quick Attendance</h2>
            <Calendar size={20} className="text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todaysClasses.map((classItem: any) => (
              <div key={classItem.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{classItem.title}</h3>
                    <p className="text-sm text-gray-600">{classItem.time} - {classItem.instructor}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${'bg-blue-100 text-blue-800'}`}>
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{classItem.enrolled} enrolled</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewClassAttendance(classItem)}
                      className="flex items-center space-x-1 px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <Eye size={14} />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => handleMarkAttendance(classItem)}
                      className="flex items-center space-x-1 px-3 py-1 text-sm bg-[#F25274] text-white rounded-md hover:bg-[#F25274]/90"
                    >
                      <CheckSquare size={14} />
                      <span>Mark</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Classes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Classes</h2>
          <Calendar size={20} className="text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingClasses.map((classItem: any) => (
            <div key={classItem.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{classItem.title}</h3>
                  <p className="text-sm text-gray-600">{classItem.date} at {classItem.time}</p>
                  <p className="text-sm text-gray-500">{classItem.instructor}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${'bg-blue-100 text-blue-800'}`}>
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{classItem.enrolled} enrolled</span>
                <button
                  onClick={() => handleViewClassAttendance(classItem)}
                  className="flex items-center space-x-1 px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <Eye size={14} />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by member or class..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
          >
            <option value="">All Classes</option>
            {mockClasses.map((classItem: any) => (
              <option key={classItem.id} value={classItem.id}>{classItem.title}</option>
            ))}
          </select>
          
          <div className="flex items-center space-x-2">
            <Calendar size={16} className="text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
            />
          </div>
          
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter size={16} />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Attendance Records</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class & Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Feedback
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAttendance.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{record.className}</div>
                    <div className="text-sm text-gray-500">{record.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.memberName}</div>
                    <div className="text-sm text-gray-500">{record.memberId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.checkIn} - {record.checkOut}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.duration} min</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      record.type === 'Online' 
                        ? 'bg-blue-100 text-blue-800' 
                        : record.type === 'In-Person'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {record.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < record.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{record.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{record.feedback}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;