import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Star, 
  Clock, 
  CheckSquare,
  Award,
  Activity,
  BarChart3,
  ChevronRight,
  User,
  MapPin
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data for dashboard
  const stats = [
    {
      title: 'Total Classes',
      value: '24',
      change: '+12%',
      icon: Calendar,
      color: 'bg-[#F25274]',
      link: '/classes'
    },
    {
      title: 'Active Members',
      value: '156',
      change: '+8%',
      icon: Users,
      color: 'bg-[#6CBFC4]',
      link: '/members'
    },
    {
      title: 'Attendance Rate',
      value: '89%',
      change: '+5%',
      icon: CheckSquare,
      color: 'bg-[#F3E682]',
      link: '/attendance'
    },
    {
      title: 'Avg Rating',
      value: '4.8',
      change: '+0.2',
      icon: Star,
      color: 'bg-yellow-500',
      link: '/reports'
    }
  ];

  const todaysClasses = [
    {
      id: 1,
      title: 'Morning Yoga Flow',
      instructor: 'Maya Patel',
      time: '09:00 AM',
      level: 'Arumbu Ani',
      enrolled: 12,
      capacity: 15
    },
    {
      id: 2,
      title: 'Evening Flow',
      instructor: 'Arjun Kumar',
      time: '06:00 PM',
      level: 'Mottu Ani',
      enrolled: 18,
      capacity: 20
    },
    {
      id: 3,
      title: 'Advanced Practice',
      instructor: 'Priya Sharma',
      time: '07:30 PM',
      level: 'Mugai Ani',
      enrolled: 8,
      capacity: 12
    }
  ];

  const upcomingClasses = [
    {
      id: 4,
      title: 'Meditation Session',
      instructor: 'Ravi Menon',
      time: '08:00 AM',
      level: 'All Levels',
      date: 'Tomorrow',
      enrolled: 25,
      capacity: 30
    },
    {
      id: 5,
      title: 'Power Yoga',
      instructor: 'Lakshmi Devi',
      time: '10:00 AM',
      level: 'Malar Ani',
      date: 'Tomorrow',
      enrolled: 15,
      capacity: 18
    },
    {
      id: 6,
      title: 'Gentle Yoga',
      instructor: 'Maya Patel',
      time: '05:30 PM',
      level: 'Arumbu Ani',
      date: 'Day After',
      enrolled: 20,
      capacity: 25
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'attendance',
      message: 'Anita Krishnan marked attendance for Morning Flow',
      time: '2 hours ago',
      icon: CheckSquare
    },
    {
      id: 2,
      type: 'member',
      message: 'New member Rajesh Kumar joined Mottu Ani level',
      time: '4 hours ago',
      icon: Users
    },
    {
      id: 3,
      type: 'class',
      message: 'Evening Meditation class completed with 18 attendees',
      time: '6 hours ago',
      icon: Calendar
    },
    {
      id: 4,
      type: 'award',
      message: 'Perfect Attendance Award given to Meera Nair',
      time: '1 day ago',
      icon: Award
    }
  ];

  const quickStats = [
    {
      label: 'Classes This Week',
      value: '28',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      label: 'New Members',
      value: '12',
      icon: Users,
      color: 'text-green-600'
    },
    {
      label: 'Completion Rate',
      value: '94%',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your yoga community today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={index}
              to={stat.link}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Classes */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Today's Classes</h2>
              <Link 
                to="/classes"
                className="flex items-center space-x-1 text-[#F25274] hover:text-[#F25274]/80 transition-colors"
              >
                <span className="text-sm font-medium">View All</span>
                <ChevronRight size={16} />
              </Link>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {todaysClasses.map((classItem) => (
                  <Link
                    key={classItem.id}
                    to="/classes"
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{classItem.title}</h3>
                      <p className="text-sm text-gray-600">{classItem.instructor} • {classItem.level}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-[#F25274]">{classItem.time}</p>
                      <p className="text-xs text-gray-500">{classItem.enrolled}/{classItem.capacity} enrolled</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          {/* Upcoming Classes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Classes</h2>
              <Link 
                to="/classes"
                className="flex items-center space-x-1 text-[#F25274] hover:text-[#F25274]/80 transition-colors"
              >
                <span className="text-sm font-medium">View All</span>
                <ChevronRight size={16} />
              </Link>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingClasses.map((classItem) => (
                  <Link
                    key={classItem.id}
                    to="/classes"
                    className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{classItem.title}</h4>
                      <p className="text-xs text-gray-600">{classItem.instructor} • {classItem.level}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-[#F25274]">{classItem.time}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <Link 
            to="/reports"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
            <div className="space-y-4">
              {quickStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon size={16} className={stat.color} />
                      <span className="text-sm text-gray-600">{stat.label}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{stat.value}</span>
                  </div>
                );
              })}
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <Link 
            to="/attendance"
            className="flex items-center space-x-1 text-[#F25274] hover:text-[#F25274]/80 transition-colors"
          >
            <span className="text-sm font-medium">View All</span>
            <ChevronRight size={16} />
          </Link>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <Link
                  key={activity.id}
                  to="/attendance"
                  className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Icon size={16} className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link 
          to="/reports"
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer"
        >
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp size={24} className="text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Member Satisfaction</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">96%</p>
          <p className="text-sm text-gray-600 mt-1">Based on recent feedback</p>
        </Link>

        <Link 
          to="/awards"
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer"
        >
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award size={24} className="text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Awards Given</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">23</p>
          <p className="text-sm text-gray-600 mt-1">This month</p>
        </Link>

        <Link 
          to="/reports"
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 size={24} className="text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Growth Rate</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">+15%</p>
          <p className="text-sm text-gray-600 mt-1">New members this quarter</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;