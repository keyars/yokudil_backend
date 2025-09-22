import React, { useState, useMemo } from 'react';
import { BarChart3, TrendingUp, Users, Calendar, Download, Filter, PieChart, Activity, Target, Award } from 'lucide-react';
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
  const [dateRange, setDateRange] = useState('last30days');
  const [reportType, setReportType] = useState('attendance');

  // Calculate comprehensive analytics
  const analytics = useMemo(() => {
    const totalAttendance = mockAttendance.length;
    const totalClasses = mockClasses.length;
    const totalMembers = mockMembers.length;
    const activeMembers = mockMembers.filter(m => m.status === 'Active').length;
    
    // Attendance by date and level for trend chart
    const attendanceByDateAndLevel = mockAttendance.reduce((acc: {[key: string]: {[key: string]: number}}, record) => {
      const member = mockMembers.find(m => m.id === record.memberId);
      const level = member?.membershipLevel || 'Unknown';
      
      if (!acc[record.date]) {
        acc[record.date] = {};
      }
      acc[record.date][level] = (acc[record.date][level] || 0) + 1;
      return acc;
    }, {});

    // Get last 30 days for trend
    const last30Days = [];
    const membershipLevels = ['Arumbu Ani', 'Mottu Ani', 'Mugai Ani', 'Malar Ani'];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayData: {[key: string]: number} = {};
      membershipLevels.forEach(level => {
        dayData[level] = attendanceByDateAndLevel[dateStr]?.[level] || 0;
      });
      last30Days.push({
        date: dateStr,
        label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        ...dayData
      });
    }

    // Instructor class distribution
    const instructorClasses = mockClasses.reduce((acc: {[key: string]: number}, cls) => {
      acc[cls.instructor] = (acc[cls.instructor] || 0) + 1;
      return acc;
    }, {});

    // Membership level distribution for members
    const membershipLevelDistribution = mockMembers.reduce((acc: {[key: string]: number}, member) => {
      acc[member.membershipLevel] = (acc[member.membershipLevel] || 0) + 1;
      return acc;
    }, {});

    // Instructor performance
    const instructorStats = mockClasses.reduce((acc: {[key: string]: {classes: number, totalEnrolled: number}}, cls) => {
      if (!acc[cls.instructor]) {
        acc[cls.instructor] = { classes: 0, totalEnrolled: 0 };
      }
      acc[cls.instructor].classes += 1;
      acc[cls.instructor].totalEnrolled += cls.enrolled;
      return acc;
    }, {});

    // Average ratings
    const avgRating = mockAttendance.reduce((sum, record) => sum + record.rating, 0) / totalAttendance;
    
    // Average duration
    const avgDuration = mockAttendance.reduce((sum, record) => sum + record.duration, 0) / totalAttendance;

    // Retention rate calculation
    const retentionRate = (activeMembers / totalMembers) * 100;

    // Monthly growth (simulated)
    const monthlyGrowth = 12.5;

    return {
      totalAttendance,
      totalClasses,
      totalMembers,
      activeMembers,
      avgRating: avgRating.toFixed(1),
      avgDuration: Math.round(avgDuration),
      retentionRate: retentionRate.toFixed(1),
      monthlyGrowth,
      last30Days,
      instructorClasses,
      membershipLevelDistribution,
      instructorStats
    };
  }, []);

  // Chart configurations
  const attendanceTrendData = {
    labels: analytics.last30Days.map(day => day.label),
    datasets: [
      {
        label: 'Arumbu Ani',
        data: analytics.last30Days.map(day => day['Arumbu Ani']),
        borderColor: '#F25274',
        backgroundColor: 'rgba(242, 82, 116, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Mottu Ani',
        data: analytics.last30Days.map(day => day['Mottu Ani']),
        borderColor: '#6CBFC4',
        backgroundColor: 'rgba(108, 191, 196, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Mugai Ani',
        data: analytics.last30Days.map(day => day['Mugai Ani']),
        borderColor: '#F3E682',
        backgroundColor: 'rgba(243, 230, 130, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Malar Ani',
        data: analytics.last30Days.map(day => day['Malar Ani']),
        borderColor: '#A78BFA',
        backgroundColor: 'rgba(167, 139, 250, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const attendanceTrendOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Daily Attendance Trend by Membership Level (Last 30 Days)',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const instructorClassData = {
    labels: Object.keys(analytics.instructorClasses),
    datasets: [
      {
        data: Object.values(analytics.instructorClasses),
        backgroundColor: [
          '#F25274',
          '#6CBFC4',
          '#F3E682',
          '#A78BFA',
          '#10B981',
          '#F59E0B',
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const membershipLevelData = {
    labels: Object.keys(analytics.membershipLevelDistribution),
    datasets: [
      {
        data: Object.values(analytics.membershipLevelDistribution),
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

  const instructorPerformanceData = {
    labels: Object.keys(analytics.instructorStats),
    datasets: [
      {
        label: 'Classes Taught',
        data: Object.values(analytics.instructorStats).map(stat => stat.classes),
        backgroundColor: '#F25274',
        borderRadius: 4,
      },
      {
        label: 'Total Enrolled Students',
        data: Object.values(analytics.instructorStats).map(stat => stat.totalEnrolled),
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights and analytics for your yoga community</p>
        </div>
        <div className="flex items-center space-x-3">
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
          >
            <option value="attendance">Attendance Report</option>
            <option value="members">Member Analytics</option>
            <option value="classes">Class Performance</option>
            <option value="instructors">Instructor Performance</option>
          </select>
          
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
          >
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="last3months">Last 3 Months</option>
            <option value="last6months">Last 6 Months</option>
            <option value="lastyear">Last Year</option>
          </select>
          
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter size={16} />
            <span>Custom Range</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Attendance</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.totalAttendance}</p>
              <p className="text-sm text-green-600 mt-1">+{analytics.monthlyGrowth}% from last month</p>
            </div>
            <div className="bg-[#F25274] p-3 rounded-full">
              <Activity size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Duration</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.avgDuration}m</p>
              <p className="text-sm text-green-600 mt-1">+5.2% from last month</p>
            </div>
            <div className="bg-[#6CBFC4] p-3 rounded-full">
              <TrendingUp size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Members</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.activeMembers}</p>
              <p className="text-sm text-green-600 mt-1">+8 new this month</p>
            </div>
            <div className="bg-[#F3E682] p-3 rounded-full">
              <Users size={24} className="text-gray-800" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.avgRating}</p>
              <p className="text-sm text-green-600 mt-1">+0.3 from last month</p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-full">
              <Award size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="h-80">
            <Line data={attendanceTrendData} options={attendanceTrendOptions} />
          </div>
        </div>

        {/* Class Type Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Classes by Instructor</h3>
            <PieChart size={20} className="text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center">
            <Pie data={instructorClassData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Membership Level Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Membership Levels</h3>
            <Target size={20} className="text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center">
            <Doughnut data={membershipLevelData} options={chartOptions} />
          </div>
        </div>

        {/* Instructor Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Instructor Performance</h3>
            <BarChart3 size={20} className="text-gray-400" />
          </div>
          <div className="h-64">
            <Bar data={instructorPerformanceData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Detailed Analytics Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Classes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Classes</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Rating
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockClasses.slice(0, 5).map((classItem) => {
                  const attendanceRate = Math.round((classItem.enrolled / classItem.capacity) * 100);
                  const avgRating = (Math.random() * 2 + 3).toFixed(1); // Mock rating between 3-5
                  
                  return (
                    <tr key={classItem.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{classItem.title}</div>
                        <div className="text-sm text-gray-500">{classItem.instructor}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-[#F25274] h-2 rounded-full" 
                              style={{ width: `${attendanceRate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{attendanceRate}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {avgRating}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Member Engagement */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Member Engagement</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">High Engagement (90%+)</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">65%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Medium Engagement (60-89%)</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">25%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Low Engagement (&lt;60%)</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <Calendar size={32} className="mx-auto text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-900">Classes Conducted</h4>
            <p className="text-2xl font-bold text-blue-600 mt-1">{analytics.totalClasses}</p>
            <p className="text-sm text-gray-600 mt-1">This month</p>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <Users size={32} className="mx-auto text-green-600 mb-2" />
            <h4 className="font-medium text-gray-900">Total Participants</h4>
            <p className="text-2xl font-bold text-green-600 mt-1">{analytics.totalAttendance}</p>
            <p className="text-sm text-gray-600 mt-1">Across all classes</p>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <TrendingUp size={32} className="mx-auto text-purple-600 mb-2" />
            <h4 className="font-medium text-gray-900">Growth Rate</h4>
            <p className="text-2xl font-bold text-purple-600 mt-1">+{analytics.monthlyGrowth}%</p>
            <p className="text-sm text-gray-600 mt-1">Month over month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;