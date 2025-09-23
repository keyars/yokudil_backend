import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, Calendar, Clock, TrendingUp, Activity, Star, Target, Heart, 
  Award, FileText, BarChart3, PieChart, MapPin, Gift 
} from 'lucide-react';

// Volunteer Dashboard Data
const volunteerWidgets = {
  dataInsights: [
    {
      title: "Volunteer Hours This Month",
      value: "28.5 hrs",
      trend: "+4.2 hrs",
      trendDirection: "up",
      description: "Total volunteer hours contributed this month",
      icon: "heart",
      color: "#F3E682"
    },
    {
      title: "Classes Supported",
      value: "19",
      trend: "+3",
      trendDirection: "up",
      description: "Number of classes you've assisted with this month",
      icon: "users",
      color: "#6CBFC4"
    },
    {
      title: "Members Interacted",
      value: "45",
      trend: "+7",
      trendDirection: "up",
      description: "Unique members you've helped or interacted with",
      icon: "user-check",
      color: "#F25274"
    },
    {
      title: "Support Impact Score",
      value: "4.6/5",
      trend: "+0.2",
      trendDirection: "up",
      description: "Average appreciation score from teachers and members",
      icon: "star",
      color: "#F3E682"
    }
  ],
  volunteerScheduleToday: [
    {
      time: "09:00 AM",
      class: "Morning Flow - Arumbu Ani",
      teacher: "Teacher Maya",
      role: "Assistant",
      duration: "90 min",
      status: "upcoming"
    },
    {
      time: "02:00 PM",
      class: "Beginner Basics - Arumbu Ani", 
      teacher: "Teacher John",
      role: "Support",
      duration: "60 min",
      status: "upcoming"
    }
  ],
  supportActivities: [
    {
      activity: "Assisted with new member orientation",
      class: "Beginner Basics",
      time: "2 hours ago",
      type: "support"
    },
    {
      activity: "Helped with attendance marking",
      class: "Morning Flow",
      time: "1 day ago", 
      type: "attendance"
    },
    {
      activity: "Added progress note for member improvement",
      class: "Evening Yoga",
      time: "2 days ago",
      type: "progress"
    }
  ],
  assignedClasses: [
    { day: "Mon", class: "Morning Flow", time: "09:00", teacher: "Maya" },
    { day: "Wed", class: "Beginner Basics", time: "14:00", teacher: "John" },
    { day: "Fri", class: "Evening Yoga", time: "18:00", teacher: "Sarah" },
    { day: "Sat", class: "Weekend Flow", time: "10:00", teacher: "Maya" }
  ],
  memberInteractions: [
    {
      member: "Lisa Chen",
      interaction: "Provided pose modification guidance",
      class: "Morning Flow",
      date: "2025-09-19"
    },
    {
      member: "David Wong",
      interaction: "Assisted with equipment setup", 
      class: "Beginner Basics",
      date: "2025-09-18"
    },
    {
      member: "Anna Kumar",
      interaction: "Helped with breathing technique",
      class: "Evening Yoga",
      date: "2025-09-17"
    }
  ],
  contributionSummary: {
    totalHours: "28.5",
    classesSupported: 19,
    membersHelped: 45,
    appreciationNotes: 12
  }
};

const teacherStats = [
  { title: 'My Classes', value: 8, icon: Calendar, color: 'bg-[#6CBFC4]' },
  { title: 'Students', value: 45, icon: Users, color: 'bg-[#F25274]' },
  { title: 'Feedback Score', value: '4.9', icon: Star, color: 'bg-yellow-500' }
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getRoleSpecificStats = () => {
    if (user?.role === 'super_admin') {
      return null; // Super admin uses widgets instead
    } else if (user?.role === 'teacher') {
      return teacherStats;
    }
  };

  const stats = getRoleSpecificStats();

  // Super Admin Widgets Data
  const superAdminWidgets = {
    memberOverview: {
      totalMembers: 245,
      newThisMonth: 18,
      activeMembers: 198,
      levels: {
        "Arumbu Ani": { total: 95, active: 82 },
        "Mottu Ani": { total: 78, active: 65 },
        "Mugai Ani": { total: 52, active: 38 },
        "Malar Ani": { total: 20, active: 13 }
      }
    },
    recentActivities: [
      { type: "member", message: "Sarah J. completed Mottu Ani level", time: "2 hours ago", icon: Award },
      { type: "class", message: "New Evening Flow class scheduled", time: "4 hours ago", icon: Calendar },
      { type: "teacher", message: "Teacher Maya logged 8 teaching hours", time: "6 hours ago", icon: Clock },
      { type: "system", message: "Monthly attendance report generated", time: "1 day ago", icon: FileText }
    ],
    healthMetrics: {
      healthCheckCompliance: { value: 78, label: "Health Checks Up-to-Date" },
      vitalMetricsUpdated: { value: 65, label: "Recent Vital Metrics" },
      medicalClearance: { value: 92, label: "Medical Clearance" },
      emergencyContacts: { value: 88, label: "Emergency Contacts" }
    },
    upcomingEvents: [
      { event: "International Yoga Day", date: "2025-06-21", type: "celebration" },
      { event: "Teacher Training Workshop", date: "2025-10-15", type: "training" },
      { event: "Quarterly Health Check", date: "2025-12-01", type: "health" },
      { event: "Annual Awards Ceremony", date: "2025-12-20", type: "awards" }
    ]
  };

  // Volunteer Dashboard
  if (user?.role === 'volunteer') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Volunteer Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {user.name}! Here's your volunteer activity overview.</p>
          </div>
        </div>

        {/* Data Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {volunteerWidgets.dataInsights.map((insight, index) => {
            const getIcon = (iconName: string) => {
              switch (iconName) {
                case 'heart': return Heart;
                case 'users': return Users;
                case 'user-check': return Users;
                case 'star': return Star;
                default: return TrendingUp;
              }
            };
            
            const IconComponent = getIcon(insight.icon);
            
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{insight.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{insight.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp size={16} className="text-green-500 mr-1" />
                      <span className="text-sm text-green-600">{insight.trend}</span>
                      <span className="text-sm text-gray-500 ml-1">from last month</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-full" style={{ backgroundColor: `${insight.color}20` }}>
                    <IconComponent size={24} style={{ color: insight.color }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Volunteer Schedule Today */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">My Volunteer Schedule Today</h2>
              <Calendar size={20} className="text-gray-400" />
            </div>
            <div className="space-y-4">
              {volunteerWidgets.volunteerScheduleToday.map((schedule, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-medium text-[#F25274]">{schedule.time}</div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        schedule.role === 'Assistant' ? 'bg-[#F3E682] text-gray-900' : 'bg-[#6CBFC4] text-white'
                      }`}>
                        {schedule.role}
                      </span>
                    </div>
                    <div className="text-sm text-gray-900 mt-1">{schedule.class}</div>
                    <div className="text-xs text-gray-500">with {schedule.teacher} • {schedule.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Volunteer Hours Trend */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">My Volunteer Hours Trend</h2>
              <BarChart3 size={20} className="text-gray-400" />
            </div>
            {(() => {
              const chartData = {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                data: [6, 8, 7, 9],
                color: '#F3E682'
              };
              
              const maxValue = Math.max(...chartData.data);
              const chartHeight = 200;
              const chartWidth = 300;
              const barWidth = 40;
              const spacing = (chartWidth - (barWidth * chartData.data.length)) / (chartData.data.length + 1);
              
              return (
                <div className="h-64 flex items-end justify-center bg-gray-50 rounded-lg p-4">
                  <svg width={chartWidth} height={chartHeight} className="overflow-visible">
                    {chartData.data.map((value, index) => {
                      const barHeight = (value / maxValue) * (chartHeight - 40);
                      const x = spacing + (index * (barWidth + spacing));
                      const y = chartHeight - barHeight - 20;
                      
                      return (
                        <g key={index}>
                          <rect
                            x={x}
                            y={y}
                            width={barWidth}
                            height={barHeight}
                            fill={chartData.color}
                            rx="4"
                            className="hover:opacity-80 transition-opacity cursor-pointer"
                          />
                          <text
                            x={x + barWidth/2}
                            y={y - 5}
                            textAnchor="middle"
                            className="text-xs font-medium fill-gray-700"
                          >
                            {value}h
                          </text>
                          <text
                            x={x + barWidth/2}
                            y={chartHeight - 5}
                            textAnchor="middle"
                            className="text-xs fill-gray-500"
                          >
                            {chartData.labels[index]}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              );
            })()}
          </div>

          {/* Recent Support Activities */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Support Activities</h2>
              <Activity size={20} className="text-gray-400" />
            </div>
            <div className="space-y-4">
              {volunteerWidgets.supportActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                    activity.type === 'support' ? 'bg-[#F3E682]' :
                    activity.type === 'attendance' ? 'bg-[#6CBFC4]' : 'bg-[#F25274]'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.activity}</p>
                    <p className="text-xs text-gray-500">{activity.class} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Assigned Classes This Week */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">My Assigned Classes This Week</h2>
              <Calendar size={20} className="text-gray-400" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {volunteerWidgets.assignedClasses.map((classItem, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900 mb-1">{classItem.day}</div>
                    <div className="text-xs text-[#F25274] font-medium">{classItem.time}</div>
                    <div className="text-xs text-gray-600 mt-1">{classItem.class}</div>
                    <div className="text-xs text-gray-500">with {classItem.teacher}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Member Interactions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Member Interactions</h2>
              <Users size={20} className="text-gray-400" />
            </div>
            <div className="space-y-4">
              {volunteerWidgets.memberInteractions.map((interaction, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#6CBFC4] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-medium text-xs">
                      {interaction.member.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{interaction.member}</p>
                      <span className="text-xs text-gray-500">{interaction.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{interaction.interaction}</p>
                    <p className="text-xs text-gray-500">{interaction.class}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Contribution Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">My Contribution Summary</h2>
              <Target size={20} className="text-gray-400" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Hours</span>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#F3E682] text-gray-900 px-2 py-1 rounded text-sm font-medium">
                    {volunteerWidgets.contributionSummary.totalHours} hrs
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Classes Supported</span>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#6CBFC4] text-white px-2 py-1 rounded text-sm font-medium">
                    {volunteerWidgets.contributionSummary.classesSupported}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Members Helped</span>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#F25274] text-white px-2 py-1 rounded text-sm font-medium">
                    {volunteerWidgets.contributionSummary.membersHelped}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Appreciation Notes</span>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#F3E682] text-gray-900 px-2 py-1 rounded text-sm font-medium">
                    {volunteerWidgets.contributionSummary.appreciationNotes}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {getGreeting()}, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-1">Here's what's happening in your yoga community today</p>
        </div>
      </div>

      {/* Stats Grid */}
      {/* Super Admin Widgets */}
      {user?.role === 'super_admin' ? (
        <>
          {/* Data Insights Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Member Engagement Rate",
                value: "87.5%",
                trend: "+5.2%",
                description: "Overall member attendance and participation rate this month",
                icon: Users,
                color: "#6CBFC4"
              },
              {
                title: "Teaching Efficiency", 
                value: "94.2%",
                trend: "+2.8%",
                description: "Classes completed vs scheduled (Teacher + Volunteer combined)",
                icon: Target,
                color: "#F25274"
              },
              {
                title: "Member Progression Rate",
                value: "23%", 
                trend: "+8.1%",
                description: "Members who advanced to next level in last 3 months",
                icon: TrendingUp,
                color: "#F3E682"
              },
              {
                title: "System Health Score",
                value: "96.8%",
                trend: "+1.2%", 
                description: "Platform reliability, user satisfaction, and data integrity",
                icon: Heart,
                color: "#6CBFC4"
              }
            ].map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow relative">
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: insight.color }}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div className="pr-14">
                    <p className="text-sm font-medium text-gray-600 leading-tight">{insight.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{insight.value}</p>
                    <p className="text-sm text-green-600 mt-1">{insight.trend} from last month</p>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 leading-relaxed">{insight.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Data Widgets Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Member Overview Widget */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Member Overview</h2>
              <Users size={20} className="text-gray-400" />
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-[#F25274]/10 rounded-lg">
                  <p className="text-2xl font-bold text-[#F25274]">{superAdminWidgets.memberOverview.totalMembers}</p>
                  <p className="text-xs text-gray-600">Total Members</p>
                </div>
                <div className="text-center p-3 bg-[#6CBFC4]/10 rounded-lg">
                  <p className="text-2xl font-bold text-[#6CBFC4]">{superAdminWidgets.memberOverview.activeMembers}</p>
                  <p className="text-xs text-gray-600">Active Members</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700">Level Distribution:</p>
                <div className="space-y-2">
                  {Object.entries(superAdminWidgets.memberOverview.levels).map(([level, data]) => (
                    <div key={level} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{level}</span>
                      <div className="flex items-center space-x-2">
                        <div className="bg-[#F25274]/10 rounded px-2 py-1">
                          <span className="text-sm font-medium text-[#F25274]">{data.total}</span>
                        </div>
                        <div className="bg-[#6CBFC4]/10 rounded px-2 py-1">
                          <span className="text-sm font-medium text-[#6CBFC4]">{data.active}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Class Attendance Trends Widget */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Level-wise Attendance Trends</h2>
              <BarChart3 size={20} className="text-gray-400" />
            </div>
            {(() => {
              // Dynamic chart data in JSON format
              const chartData = {
                months: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
                levels: [
                  {
                    name: 'Arumbu Ani',
                    color: '#F25274',
                    data: [25, 30, 35, 32, 38, 40]
                  },
                  {
                    name: 'Mottu Ani', 
                    color: '#6CBFC4',
                    data: [20, 23, 28, 25, 30, 32]
                  },
                  {
                    name: 'Mugai Ani',
                    color: '#F3E682', 
                    data: [15, 16, 18, 15, 20, 22]
                  },
                  {
                    name: 'Malar Ani',
                    color: '#9333EA',
                    data: [8, 10, 12, 8, 12, 14]
                  }
                ]
              };

              const maxValue = Math.max(...chartData.levels.flatMap(level => level.data));
              const chartHeight = 200;
              const chartWidth = 400;
              const padding = { top: 20, right: 20, bottom: 40, left: 50 };
              const innerWidth = chartWidth - padding.left - padding.right;
              const innerHeight = chartHeight - padding.top - padding.bottom;

              // Calculate positions
              const getX = (index: number) => padding.left + (index * innerWidth) / (chartData.months.length - 1);
              const getY = (value: number) => padding.top + innerHeight - (value / maxValue) * innerHeight;

              // Generate path for each level
              const generatePath = (data: number[]) => {
                return data.map((value, index) => {
                  const x = getX(index);
                  const y = getY(value);
                  return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ');
              };

              return (
                <div className="h-64 bg-gray-50 rounded-lg p-4 relative">
                  {/* Tooltip */}
                  <div id="chart-tooltip" className="absolute bg-gray-800 text-white text-xs rounded px-2 py-1 pointer-events-none opacity-0 transition-opacity duration-200 z-20 shadow-lg">
                  </div>
                  
                  <svg width={chartWidth} height={chartHeight} className="w-full h-full">
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4, 5].map(i => {
                      const y = padding.top + (i * innerHeight) / 5;
                      return (
                        <line
                          key={i}
                          x1={padding.left}
                          y1={y}
                          x2={chartWidth - padding.right}
                          y2={y}
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                      );
                    })}
                    
                    {/* Y-axis labels */}
                    {[0, 1, 2, 3, 4, 5].map(i => {
                      const value = Math.round((maxValue * (5 - i)) / 5);
                      const y = padding.top + (i * innerHeight) / 5;
                      return (
                        <text
                          key={i}
                          x={padding.left - 10}
                          y={y + 4}
                          textAnchor="end"
                          className="text-xs fill-gray-500"
                        >
                          {value}
                        </text>
                      );
                    })}
                    
                    {/* X-axis labels */}
                    {chartData.months.map((month, index) => {
                      const x = getX(index);
                      return (
                        <text
                          key={month}
                          x={x}
                          y={chartHeight - 10}
                          textAnchor="middle"
                          className="text-xs fill-gray-500"
                        >
                          {month}
                        </text>
                      );
                    })}
                    
                    {/* Lines and data points for each level */}
                    {chartData.levels.map((level, levelIndex) => (
                      <g key={level.name}>
                        {/* Line */}
                        <path
                          d={generatePath(level.data)}
                          fill="none"
                          stroke={level.color}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="drop-shadow-sm"
                        />
                        
                        {/* Data points */}
                        {level.data.map((value, index) => {
                          const x = getX(index);
                          const y = getY(value);
                          return (
                            <circle
                              key={`${level.name}-${index}`}
                              cx={x}
                              cy={y}
                              r="5"
                              fill={level.color}
                              stroke="white"
                              strokeWidth="2"
                              className="cursor-pointer hover:r-7 transition-all duration-200 drop-shadow-sm"
                              onMouseEnter={(e) => {
                                const tooltip = document.getElementById('chart-tooltip');
                                if (tooltip) {
                                  tooltip.textContent = `${level.name}: ${value} classes`;
                                  tooltip.style.left = `${x + 10}px`;
                                  tooltip.style.top = `${y - 30}px`;
                                  tooltip.style.opacity = '1';
                                }
                              }}
                              onMouseLeave={() => {
                                const tooltip = document.getElementById('chart-tooltip');
                                if (tooltip) tooltip.style.opacity = '0';
                              }}
                            />
                          );
                        })}
                      </g>
                    ))}
                  </svg>
                  
                  {/* Legend */}
                  <div className="absolute bottom-2 left-4 right-4">
                    <div className="grid grid-cols-2 gap-4">
                      {chartData.levels.map((level) => (
                        <div key={level.name} className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: level.color }}
                          ></div>
                          <span className="text-sm text-gray-600">{level.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Teaching Hours Distribution Widget */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Teaching Hours Distribution</h2>
              <PieChart size={20} className="text-gray-400" />
            </div>
            {(() => {
              // Dynamic doughnut chart data in JSON format
              const doughnutData = {
                title: "Teaching Hours Distribution",
                totalLabel: "Total Hours",
                segments: [
                  {
                    label: "Teachers",
                    value: 680,
                    color: "#F25274"
                  },
                  {
                    label: "Volunteers", 
                    value: 420,
                    color: "#F3E682"
                  }
                ]
              };

              // Calculate total and percentages
              const total = doughnutData.segments.reduce((sum, segment) => sum + segment.value, 0);
              const circumference = 2 * Math.PI * 60; // radius = 60
              
              let cumulativePercentage = 0;

              return (
                <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg relative">
                  {/* Dynamic Doughnut Chart */}
                  <div className="relative">
                    <svg width="160" height="160" viewBox="0 0 160 160" className="transform -rotate-90">
                      {/* Background circle */}
                      <circle
                        cx="80"
                        cy="80"
                        r="60"
                        fill="none"
                        stroke="#f3f4f6"
                        strokeWidth="24"
                      />
                      
                      {/* Dynamic segments */}
                      {doughnutData.segments.map((segment, index) => {
                        const percentage = segment.value / total;
                        const strokeDasharray = `${percentage * circumference} ${circumference}`;
                        const strokeDashoffset = `-${cumulativePercentage * circumference}`;
                        
                        cumulativePercentage += percentage;
                        
                        return (
                          <circle
                            key={index}
                            cx="80"
                            cy="80"
                            r="60"
                            fill="none"
                            stroke={segment.color}
                            strokeWidth="24"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-300 hover:stroke-width-26"
                          />
                        );
                      })}
                    </svg>
                    
                    {/* Center text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-gray-900">{total.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">{doughnutData.totalLabel}</div>
                    </div>
                  </div>
                </div>
              );
            })()}
            
            {/* Dynamic Legend */}
            <div className="mt-4 space-y-2">
              {(() => {
                const doughnutData = {
                  segments: [
                    { label: "Teachers", value: 680, color: "#F25274" },
                    { label: "Volunteers", value: 420, color: "#F3E682" }
                  ]
                };
                
                return doughnutData.segments.map((segment, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: segment.color }}
                      ></div>
                      <span className="text-sm text-gray-600">{segment.label}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{segment.value} hrs</span>
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Recent System Activities Widget */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent System Activities</h2>
              <Activity size={20} className="text-gray-400" />
            </div>
            <div className="space-y-4">
              {superAdminWidgets.recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Classes Widget */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Classes</h2>
              <Calendar size={20} className="text-gray-400" />
            </div>
            <div className="space-y-4">
              {[
                { name: "Morning Yoga Flow", time: "09:00 AM", instructor: "Maya Patel", level: "Arumbu Ani", type: "Online" },
                { name: "Evening Flow", time: "06:00 PM", instructor: "Arjun Kumar", level: "Mottu Ani", type: "In-Person" },
                { name: "Advanced Practice", time: "07:30 PM", instructor: "Priya Sharma", level: "Mugai Ani", type: "Hybrid" },
                { name: "Meditation Session", time: "08:00 AM", instructor: "Ravi Menon", level: "All Levels", type: "Online" }
              ].map((classItem, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium text-gray-900">{classItem.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        classItem.type === 'Online' ? 'bg-blue-100 text-blue-800' :
                        classItem.type === 'In-Person' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {classItem.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-600">{classItem.instructor}</span>
                      <span className="text-xs text-gray-600">•</span>
                      <span className="text-xs text-gray-600">{classItem.level}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#F25274]">{classItem.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events & Milestones Widget */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Events & Milestones</h2>
              <Calendar size={20} className="text-gray-400" />
            </div>
            <div className="space-y-4">
              {superAdminWidgets.upcomingEvents.map((event, index) => {
                const getEventIcon = (type: string) => {
                  switch (type) {
                    case 'celebration': return Star;
                    case 'training': return Users;
                    case 'health': return Heart;
                    case 'awards': return Gift;
                    default: return Calendar;
                  }
                };
                const Icon = getEventIcon(event.type);
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-[#F25274] rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{event.event}</p>
                      <p className="text-xs text-gray-500">{event.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          </div>
        </>
      ) : (
        <>
          {/* Teacher Dashboard */}
          {user?.role === 'teacher' ? (
            <>
              {/* Teacher Data Insights Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(() => {
                  const teacherInsights = [
                    {
                      title: "My Class Attendance Rate",
                      value: "91.3%",
                      trend: "+3.5%",
                      trendDirection: "up",
                      description: "Attendance rate for classes you teach this month",
                      icon: Users,
                      color: "#6CBFC4"
                    },
                    {
                      title: "Teaching Hours This Month",
                      value: "42.5 hrs",
                      trend: "+6.2 hrs",
                      trendDirection: "up",
                      description: "Total teaching hours logged in current month",
                      icon: Clock,
                      color: "#F25274"
                    },
                    {
                      title: "Student Progress Rate",
                      value: "78.4%",
                      trend: "+12.1%",
                      trendDirection: "up",
                      description: "Students showing improvement in your classes",
                      icon: TrendingUp,
                      color: "#F3E682"
                    },
                    {
                      title: "Class Satisfaction Score",
                      value: "4.7/5",
                      trend: "+0.3",
                      trendDirection: "up",
                      description: "Average feedback rating from your students",
                      icon: Star,
                      color: "#6CBFC4"
                    }
                  ];

                  return teacherInsights.map((insight, index) => {
                    const Icon = insight.icon;
                    return (
                      <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow relative">
                        <div className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: insight.color }}>
                          <Icon size={20} className="text-white" />
                        </div>
                        <div className="pr-14">
                          <p className="text-sm font-medium text-gray-600 leading-tight">{insight.title}</p>
                          <p className="text-3xl font-bold text-gray-900 mt-2">{insight.value}</p>
                          <p className="text-sm text-green-600 mt-1">{insight.trend} from last month</p>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm text-gray-600 leading-relaxed">{insight.description}</p>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>

              {/* Teacher Widgets Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* My Classes Today Widget */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">My Classes Today</h2>
                    <Calendar size={20} className="text-gray-400" />
                  </div>
                  <div className="space-y-4">
                    {(() => {
                      const todayClasses = [
                        {
                          time: "09:00 AM",
                          class: "Morning Flow - Arumbu Ani",
                          duration: "90 min",
                          students: 15,
                          type: "Online",
                          status: "upcoming"
                        },
                        {
                          time: "06:00 PM", 
                          class: "Evening Yoga - Mottu Ani",
                          duration: "60 min",
                          students: 12,
                          type: "Face-to-Face",
                          status: "upcoming"
                        }
                      ];

                      return todayClasses.map((classItem, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="text-sm font-medium text-gray-900">{classItem.class}</h3>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                classItem.type === 'Online' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {classItem.type}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-xs text-gray-600">{classItem.duration}</span>
                              <span className="text-xs text-gray-600">•</span>
                              <span className="text-xs text-gray-600">{classItem.students} students</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-[#F25274]">{classItem.time}</p>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                {/* My Students' Attendance Trends Widget */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">My Students' Attendance Trends</h2>
                    <BarChart3 size={20} className="text-gray-400" />
                  </div>
                  {(() => {
                    // Dynamic area chart data in JSON format
                    const attendanceData = {
                      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                      datasets: [{
                        label: "Attendance Rate",
                        data: [88, 91, 89, 93],
                        color: "#F25274"
                      }]
                    };

                    const maxValue = Math.max(...attendanceData.datasets[0].data);
                    const minValue = Math.min(...attendanceData.datasets[0].data);
                    const chartHeight = 160;
                    const chartWidth = 300;
                    const padding = { top: 20, right: 20, bottom: 40, left: 40 };
                    const innerWidth = chartWidth - padding.left - padding.right;
                    const innerHeight = chartHeight - padding.top - padding.bottom;

                    // Calculate positions
                    const getX = (index) => padding.left + (index * innerWidth) / (attendanceData.labels.length - 1);
                    const getY = (value) => padding.top + innerHeight - ((value - minValue) / (maxValue - minValue)) * innerHeight;

                    // Generate path for area chart
                    const generateAreaPath = (data) => {
                      const linePath = data.map((value, index) => {
                        const x = getX(index);
                        const y = getY(value);
                        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }).join(' ');
                      
                      // Close the area path
                      const lastX = getX(data.length - 1);
                      const firstX = getX(0);
                      const bottomY = padding.top + innerHeight;
                      
                      return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
                    };

                    return (
                      <div className="h-48 bg-gray-50 rounded-lg p-4 relative">
                        <svg width={chartWidth} height={chartHeight} className="w-full h-full">
                          {/* Grid lines */}
                          {[0, 1, 2, 3, 4].map(i => {
                            const y = padding.top + (i * innerHeight) / 4;
                            return (
                              <line
                                key={i}
                                x1={padding.left}
                                y1={y}
                                x2={chartWidth - padding.right}
                                y2={y}
                                stroke="#e5e7eb"
                                strokeWidth="1"
                              />
                            );
                          })}
                          
                          {/* Y-axis labels */}
                          {[0, 1, 2, 3, 4].map(i => {
                            const value = Math.round(minValue + ((maxValue - minValue) * (4 - i)) / 4);
                            const y = padding.top + (i * innerHeight) / 4;
                            return (
                              <text
                                key={i}
                                x={padding.left - 10}
                                y={y + 4}
                                textAnchor="end"
                                className="text-xs fill-gray-500"
                              >
                                {value}%
                              </text>
                            );
                          })}
                          
                          {/* X-axis labels */}
                          {attendanceData.labels.map((label, index) => {
                            const x = getX(index);
                            return (
                              <text
                                key={label}
                                x={x}
                                y={chartHeight - 10}
                                textAnchor="middle"
                                className="text-xs fill-gray-500"
                              >
                                {label}
                              </text>
                            );
                          })}
                          
                          {/* Area fill */}
                          <path
                            d={generateAreaPath(attendanceData.datasets[0].data)}
                            fill={`${attendanceData.datasets[0].color}20`}
                            stroke="none"
                          />
                          
                          {/* Line */}
                          <path
                            d={attendanceData.datasets[0].data.map((value, index) => {
                              const x = getX(index);
                              const y = getY(value);
                              return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                            }).join(' ')}
                            fill="none"
                            stroke={attendanceData.datasets[0].color}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          
                          {/* Data points */}
                          {attendanceData.datasets[0].data.map((value, index) => {
                            const x = getX(index);
                            const y = getY(value);
                            return (
                              <circle
                                key={index}
                                cx={x}
                                cy={y}
                                r="4"
                                fill={attendanceData.datasets[0].color}
                                stroke="white"
                                strokeWidth="2"
                                className="cursor-pointer hover:r-6 transition-all duration-200"
                              />
                            );
                          })}
                        </svg>
                      </div>
                    );
                  })()}
                </div>

                {/* Weekly Teaching Schedule Widget */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Weekly Teaching Schedule</h2>
                    <Calendar size={20} className="text-gray-400" />
                  </div>
                  <div className="space-y-3">
                    {(() => {
                      const weeklySchedule = [
                        { day: "Mon", classes: 2, hours: 3 },
                        { day: "Tue", classes: 1, hours: 1.5 },
                        { day: "Wed", classes: 3, hours: 4 },
                        { day: "Thu", classes: 1, hours: 1.5 },
                        { day: "Fri", classes: 2, hours: 3 },
                        { day: "Sat", classes: 1, hours: 2 },
                        { day: "Sun", classes: 0, hours: 0 }
                      ];

                      return weeklySchedule.map((dayData, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#6CBFC4] rounded-full flex items-center justify-center">
                              <span className="text-white font-medium text-sm">{dayData.day}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{dayData.classes} Classes</p>
                              <p className="text-xs text-gray-600">{dayData.hours} hours</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="bg-[#F25274]/10 rounded px-2 py-1">
                              <span className="text-sm font-medium text-[#F25274]">{dayData.classes}</span>
                            </div>
                            <div className="bg-[#6CBFC4]/10 rounded px-2 py-1">
                              <span className="text-sm font-medium text-[#6CBFC4]">{dayData.hours}h</span>
                            </div>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                {/* Recent Progress Notes Widget */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Progress Notes Added</h2>
                    <FileText size={20} className="text-gray-400" />
                  </div>
                  <div className="space-y-4">
                    {(() => {
                      const progressNotes = [
                        {
                          student: "Sarah Johnson",
                          note: "Excellent improvement in flexibility and balance",
                          class: "Morning Flow",
                          date: "2025-09-19"
                        },
                        {
                          student: "Mike Chen",
                          note: "Struggling with advanced poses, recommend extra practice",
                          class: "Evening Yoga", 
                          date: "2025-09-18"
                        },
                        {
                          student: "Lisa Wong",
                          note: "Ready for progression to next level",
                          class: "Morning Flow",
                          date: "2025-09-17"
                        }
                      ];

                      return progressNotes.map((note, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 bg-[#F25274] rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-medium text-xs">
                              {note.student.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-medium text-gray-900">{note.student}</p>
                              <p className="text-xs text-gray-500">{note.date}</p>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{note.note}</p>
                            <p className="text-xs text-gray-500">{note.class}</p>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                {/* My Students by Level Widget */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">My Students by Level</h2>
                    <PieChart size={20} className="text-gray-400" />
                  </div>
                  {(() => {
                    // Dynamic pie chart data in JSON format
                    const pieData = {
                      labels: ["Arumbu Ani", "Mottu Ani", "Mugai Ani", "Malar Ani"],
                      datasets: [{
                        data: [25, 18, 12, 8],
                        backgroundColor: ["#F25274", "#F3E682", "#6CBFC4", "#FFB6C1"]
                      }]
                    };

                    const total = pieData.datasets[0].data.reduce((sum, value) => sum + value, 0);
                    const circumference = 2 * Math.PI * 50; // radius = 50
                    
                    let cumulativePercentage = 0;

                    return (
                      <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg relative">
                        {/* Dynamic Pie Chart */}
                        <div className="relative">
                          <svg width="140" height="140" viewBox="0 0 140 140" className="transform -rotate-90">
                            {/* Dynamic segments */}
                            {pieData.datasets[0].data.map((value, index) => {
                              const percentage = value / total;
                              const strokeDasharray = `${percentage * circumference} ${circumference}`;
                              const strokeDashoffset = `-${cumulativePercentage * circumference}`;
                              
                              cumulativePercentage += percentage;
                              
                              return (
                                <circle
                                  key={index}
                                  cx="70"
                                  cy="70"
                                  r="50"
                                  fill="none"
                                  stroke={pieData.datasets[0].backgroundColor[index]}
                                  strokeWidth="20"
                                  strokeDasharray={strokeDasharray}
                                  strokeDashoffset={strokeDashoffset}
                                  strokeLinecap="round"
                                  className="transition-all duration-300 hover:stroke-width-22"
                                />
                              );
                            })}
                          </svg>
                          
                          {/* Center text */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-2xl font-bold text-gray-900">{total}</div>
                            <div className="text-sm text-gray-600">Students</div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                  
                  {/* Dynamic Legend */}
                  <div className="mt-4 space-y-2">
                    {(() => {
                      const pieData = {
                        labels: ["Arumbu Ani", "Mottu Ani", "Mugai Ani", "Malar Ani"],
                        datasets: [{
                          data: [25, 18, 12, 8],
                          backgroundColor: ["#F25274", "#F3E682", "#6CBFC4", "#FFB6C1"]
                        }]
                      };
                      
                      return pieData.labels.map((label, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: pieData.datasets[0].backgroundColor[index] }}
                            ></div>
                            <span className="text-sm text-gray-600">{label}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{pieData.datasets[0].data[index]} students</span>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                {/* Monthly Teaching Summary Widget */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Monthly Teaching Summary</h2>
                    <BarChart3 size={20} className="text-gray-400" />
                  </div>
                  <div className="space-y-4">
                    {(() => {
                      const monthlySummary = {
                        totalClasses: 34,
                        totalStudents: 63,
                        totalHours: 42.5,
                        averageAttendance: "91.3%"
                      };

                      const summaryItems = [
                        { label: "Total Classes", value: monthlySummary.totalClasses, color: "#F25274" },
                        { label: "Total Students", value: monthlySummary.totalStudents, color: "#6CBFC4" },
                        { label: "Total Hours", value: `${monthlySummary.totalHours}`, color: "#F3E682" },
                        { label: "Avg Attendance", value: monthlySummary.averageAttendance, color: "#9333EA" }
                      ];

                      return summaryItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="text-sm text-gray-600">{item.label}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{item.value}</span>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Stats Grid for volunteer role */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats?.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#F25274]">{classItem.time}</p>
                    </div>
      {user?.role !== 'super_admin' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities for other roles */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
              <Activity size={20} className="text-gray-400" />
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#F25274] rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">New member Sarah joined Arumbu Ani</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#F25274] rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">Morning Yoga class completed</p>
                  <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Classes for other roles */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Classes</h2>
              <Calendar size={20} className="text-gray-400" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">Morning Yoga</h3>
                  <p className="text-sm text-gray-600">Teacher A • Arumbu Ani</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-[#F25274]">09:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;