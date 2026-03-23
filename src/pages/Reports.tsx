import React, { useState, useMemo } from 'react';
import { BarChart3, TrendingUp, Users, Calendar, Download, Filter, PieChart, Activity, Target, Award, User, CheckSquare, Clock, Star } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { mockAttendance, mockClasses, mockMembers } from '../data/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'members' | 'attendance'>('members');
  const [dateRange, setDateRange] = useState('last30days');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const membershipLevels = ['Arumbu Ani', 'Mottu Ani', 'Mugai Ani', 'Malar Ani'];

  // Member Analytics Data
  const memberAnalytics = useMemo(() => {
    // Group members by level
    const membersByLevel = mockMembers.reduce((acc: {[key: string]: any[]}, member) => {
      if (!acc[member.membershipLevel]) {
        acc[member.membershipLevel] = [];
      }
      acc[member.membershipLevel].push(member);
      return acc;
    }, {});

    // Calculate attendance for each member
    const memberAttendanceStats = mockMembers.map(member => {
      const memberAttendance = mockAttendance.filter(record => record.memberId === member.id);
      const totalClasses = memberAttendance.length;
      const avgRating = totalClasses > 0 ? 
        memberAttendance.reduce((sum, record) => sum + record.rating, 0) / totalClasses : 0;
      const totalDuration = memberAttendance.reduce((sum, record) => sum + record.duration, 0);
      
      return {
        ...member,
        totalClasses,
        avgRating: avgRating.toFixed(1),
        totalDuration,
        lastAttendance: memberAttendance.length > 0 ? 
          memberAttendance[memberAttendance.length - 1].date : 'Never'
      };
    });

    return {
      membersByLevel,
      memberAttendanceStats,
      totalMembers: mockMembers.length,
      activeMembers: mockMembers.filter(m => m.status === 'Active').length
    };
  }, []);

  // Attendance Analytics Data
  const attendanceAnalytics = useMemo(() => {
    // Group attendance by class
    const attendanceByClass = mockAttendance.reduce((acc: {[key: string]: any[]}, record) => {
      if (!acc[record.className]) {
        acc[record.className] = [];
      }
      acc[record.className].push(record);
      return acc;
    }, {});

    // Calculate stats for each class
    const classStats = Object.entries(attendanceByClass).map(([className, records]) => {
      const classInfo = mockClasses.find(cls => cls.title === className);
      const totalAttendance = records.length;
      const avgRating = records.reduce((sum, record) => sum + record.rating, 0) / totalAttendance;
      const avgDuration = records.reduce((sum, record) => sum + record.duration, 0) / totalAttendance;
      const attendanceRate = classInfo ? (totalAttendance / classInfo.capacity) * 100 : 0;

      return {
        className,
        totalAttendance,
        avgRating: avgRating.toFixed(1),
        avgDuration: Math.round(avgDuration),
        attendanceRate: Math.round(attendanceRate),
        instructor: classInfo?.instructor || 'Unknown',
        capacity: classInfo?.capacity || 0
      };
    });

    return {
      attendanceByClass,
      classStats,
      totalAttendance: mockAttendance.length
    };
  }, []);

  // Chart Data for Member Analytics
  const memberLevelData = {
    labels: Object.keys(memberAnalytics.membersByLevel),
    datasets: [
      {
        data: Object.values(memberAnalytics.membersByLevel).map(members => members.length),
        backgroundColor: [
          '#F25274',
          '#6CBFC4',
          '#F3E682',
          '#A78BFA',
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  // Chart Data for Attendance by Class
  const attendanceByClassData = {
    labels: attendanceAnalytics.classStats.map(stat => stat.className),
    datasets: [
      {
        label: 'Total Attendance',
        data: attendanceAnalytics.classStats.map(stat => stat.totalAttendance),
        backgroundColor: '#F25274',
        borderRadius: 4,
      },
      {
        label: 'Capacity',
        data: attendanceAnalytics.classStats.map(stat => stat.capacity),
        backgroundColor: '#6CBFC4',
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  // Filter functions
  const filteredMembers = selectedLevel 
    ? memberAnalytics.memberAttendanceStats.filter(member => member.membershipLevel === selectedLevel)
    : memberAnalytics.memberAttendanceStats;

  const filteredClassStats = selectedClass
    ? attendanceAnalytics.classStats.filter(stat => stat.className === selectedClass)
    : attendanceAnalytics.classStats;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Member analytics and attendance reports</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
          >
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="last3months">Last 3 Months</option>
            <option value="lastyear">Last Year</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('members')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'members'
                  ? 'border-[#F25274] text-[#F25274]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users size={16} />
                <span>Member Analytics</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'attendance'
                  ? 'border-[#F25274] text-[#F25274]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <CheckSquare size={16} />
                <span>Attendance Reports</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Member Analytics Tab */}
          {activeTab === 'members' && (
            <div className="space-y-6">
              {/* Member Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-[#F25274]/10 to-[#F25274]/5 rounded-lg p-6 border border-[#F25274]/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Members</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{memberAnalytics.totalMembers}</p>
                    </div>
                    <div className="bg-[#F25274] p-3 rounded-full">
                      <Users size={24} className="text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-lg p-6 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Members</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{memberAnalytics.activeMembers}</p>
                    </div>
                    <div className="bg-green-500 p-3 rounded-full">
                      <Activity size={24} className="text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#6CBFC4]/10 to-[#6CBFC4]/5 rounded-lg p-6 border border-[#6CBFC4]/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {Math.round(mockAttendance.length / memberAnalytics.totalMembers)}
                      </p>
                    </div>
                    <div className="bg-[#6CBFC4] p-3 rounded-full">
                      <TrendingUp size={24} className="text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-lg p-6 border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {(mockAttendance.reduce((sum, record) => sum + record.rating, 0) / mockAttendance.length).toFixed(1)}
                      </p>
                    </div>
                    <div className="bg-yellow-500 p-3 rounded-full">
                      <Star size={24} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Member Level Distribution Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Members by Level</h3>
                    <PieChart size={20} className="text-gray-400" />
                  </div>
                  <div className="h-64 flex items-center justify-center">
                    <Doughnut data={memberLevelData} options={chartOptions} />
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Level Statistics</h3>
                  <div className="space-y-4">
                    {Object.entries(memberAnalytics.membersByLevel).map(([level, members]) => (
                      <div key={level} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${
                            level === 'Arumbu Ani' ? 'bg-[#F25274]' :
                            level === 'Mottu Ani' ? 'bg-[#6CBFC4]' :
                            level === 'Mugai Ani' ? 'bg-[#F3E682]' : 'bg-[#A78BFA]'
                          }`}></div>
                          <span className="font-medium text-gray-900">{level}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-gray-900">{members.length}</span>
                          <span className="text-sm text-gray-500 ml-1">members</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Member Details Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Member Analytics Details</h3>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                  >
                    <option value="">All Levels</option>
                    {membershipLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Member
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Level
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Classes
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Avg Rating
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Duration
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Attendance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredMembers.map((member) => (
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
                                <div className="text-sm text-gray-500">{member.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              member.membershipLevel === 'Arumbu Ani' ? 'bg-pink-100 text-pink-800' :
                              member.membershipLevel === 'Mottu Ani' ? 'bg-teal-100 text-teal-800' :
                              member.membershipLevel === 'Mugai Ani' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {member.membershipLevel}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {member.totalClasses}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Star size={16} className="text-yellow-400 mr-1" />
                              <span className="text-sm text-gray-900">{member.avgRating}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {member.totalDuration} min
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {member.lastAttendance}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Attendance Reports Tab */}
          {activeTab === 'attendance' && (
            <div className="space-y-6">
              {/* Attendance Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-[#F25274]/10 to-[#F25274]/5 rounded-lg p-6 border border-[#F25274]/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Attendance</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{attendanceAnalytics.totalAttendance}</p>
                    </div>
                    <div className="bg-[#F25274] p-3 rounded-full">
                      <CheckSquare size={24} className="text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#6CBFC4]/10 to-[#6CBFC4]/5 rounded-lg p-6 border border-[#6CBFC4]/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Classes</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{mockClasses.length}</p>
                    </div>
                    <div className="bg-[#6CBFC4] p-3 rounded-full">
                      <Calendar size={24} className="text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg p-6 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Duration</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {Math.round(mockAttendance.reduce((sum, record) => sum + record.duration, 0) / mockAttendance.length)} min
                      </p>
                    </div>
                    <div className="bg-blue-500 p-3 rounded-full">
                      <Clock size={24} className="text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-lg p-6 border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {(mockAttendance.reduce((sum, record) => sum + record.rating, 0) / mockAttendance.length).toFixed(1)}
                      </p>
                    </div>
                    <div className="bg-yellow-500 p-3 rounded-full">
                      <Star size={24} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Attendance by Class Chart */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Attendance by Classes</h3>
                  <BarChart3 size={20} className="text-gray-400" />
                </div>
                <div className="h-80">
                  <Bar data={attendanceByClassData} options={chartOptions} />
                </div>
              </div>

              {/* Class Details Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Class Attendance Details</h3>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                  >
                    <option value="">All Classes</option>
                    {attendanceAnalytics.classStats.map(stat => (
                      <option key={stat.className} value={stat.className}>{stat.className}</option>
                    ))}
                  </select>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Class Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Instructor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Attendance
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Attendance Rate
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Avg Rating
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Avg Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredClassStats.map((stat) => (
                        <tr key={stat.className} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{stat.className}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{stat.instructor}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{stat.totalAttendance}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-[#F25274] h-2 rounded-full" 
                                  style={{ width: `${Math.min(stat.attendanceRate, 100)}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600">{stat.attendanceRate}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Star size={16} className="text-yellow-400 mr-1" />
                              <span className="text-sm text-gray-900">{stat.avgRating}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {stat.avgDuration} min
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;