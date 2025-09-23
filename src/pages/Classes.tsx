import React, { useState, useEffect } from 'react';
import { mockClasses, instructors } from '../data/mockData';
import { Calendar, Clock, Users, Video, MapPin, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Filter, Search, CheckCircle, X, Save } from 'lucide-react';

interface Class {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  duration: number;
  type: 'Online' | 'In-Person' | 'Hybrid';
  zoomLink?: string;
  capacity: number;
  enrolled: number;
  level: string[];
  frequency: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  description: string;
  recurring?: {
    type: 'daily' | 'weekly' | 'custom';
    days?: string[];
    endDate?: string;
  };
}

const Classes: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [classes, setClasses] = useState<Class[]>(mockClasses as Class[]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterInstructor, setFilterInstructor] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [newClass, setNewClass] = useState({
    title: '',
    instructor: '',
    date: '',
    time: '',
    duration: 60,
    type: 'Online' as 'Online',
    zoomLink: '',
    zoomConnected: false,
    capacity: 20,
    level: [] as string[],
    description: '',
    recurring: {
      type: 'weekly' as 'daily' | 'weekly' | 'custom',
      days: [] as string[],
      endDate: ''
    }
  });

  const [isConnectingZoom, setIsConnectingZoom] = useState(false);

  const membershipLevels = ['Arumbu Ani', 'Mottu Ani', 'Mugai Ani', 'Malar Ani'];
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Calendar navigation
  const navigateCalendar = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  // Get calendar days
  const getCalendarDays = () => {
    const days = [];
    const startDate = new Date(currentDate);
    startDate.setDate(1);
    const firstDayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - firstDayOfWeek);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }
    
    return days;
  };

  // Get classes for a specific date
  const getClassesForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return classes.filter(cls => cls.date === dateStr);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const classData: Class = {
      id: `C${String(classes.length + 1).padStart(3, '0')}`,
      ...newClass,
      type: newClass.zoomLink ? 'Online' : 'In-Person',
      enrolled: 0,
      frequency: newClass.recurring.type === 'daily' ? 'Daily' : 
                 newClass.recurring.type === 'weekly' ? 'Weekly' : 'Custom',
      status: 'Scheduled'
    };

    setClasses([...classes, classData]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = (classItem: Class) => {
    setSelectedClass(classItem);
    setNewClass({
      title: classItem.title,
      instructor: classItem.instructor,
      date: classItem.date,
      time: classItem.time,
      duration: classItem.duration,
      type: classItem.type,
      zoomLink: classItem.zoomLink || '',
      zoomConnected: !!classItem.zoomLink,
      capacity: classItem.capacity,
      level: classItem.level,
      description: classItem.description,
      recurring: classItem.recurring || {
        type: 'weekly',
        days: [],
        endDate: ''
      }
    });
    setShowEditModal(true);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass) return;

    const updatedClasses = classes.map(cls => 
      cls.id === selectedClass.id 
        ? { ...cls, ...newClass, 
            type: newClass.zoomLink ? 'Online' : 'In-Person',
            frequency: newClass.recurring.type === 'daily' ? 'Daily' : 
                                           newClass.recurring.type === 'weekly' ? 'Weekly' : 'Custom' }
        : cls
    );

    setClasses(updatedClasses);
    setShowEditModal(false);
    setSelectedClass(null);
    resetForm();
  };

  const handleConnectZoom = async () => {
    setIsConnectingZoom(true);
    
    // Simulate Zoom API integration
    try {
      // Mock API call to create Zoom meeting
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock Zoom link
      const meetingId = Math.floor(Math.random() * 9000000000) + 1000000000;
      const zoomLink = `https://zoom.us/j/${meetingId}`;
      
      setNewClass({
        ...newClass, 
        zoomLink: zoomLink,
        zoomConnected: true
      });
      
      alert('Zoom meeting created successfully!');
    } catch (error) {
      alert('Failed to create Zoom meeting. Please try again.');
    } finally {
      setIsConnectingZoom(false);
    }
  };

  const handleDisconnectZoom = () => {
    setNewClass({
      ...newClass,
      zoomLink: '',
      zoomConnected: false
    });
  };

  const markAsCompleted = (classId: string) => {
    const updatedClasses = classes.map(cls => 
      cls.id === classId ? { ...cls, status: 'Completed' as const } : cls
    );
    setClasses(updatedClasses);
  };

  const resetForm = () => {
    setNewClass({
      title: '',
      instructor: '',
      date: '',
      time: '',
      duration: 60,
      type: 'Online',
      zoomLink: '',
      zoomConnected: false,
      capacity: 20,
      level: [],
      description: '',
      recurring: {
        type: 'weekly',
        days: [],
        endDate: ''
      }
    });
  };

  const filteredClasses = classes.filter(classItem => {
    const matchesStatus = filterStatus === '' || classItem.status === filterStatus;
    const matchesInstructor = filterInstructor === '' || classItem.instructor === filterInstructor;
    const matchesSearch = searchTerm === '' || 
      classItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesInstructor && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Online':
        return <Video size={16} className="text-blue-500" />;
      default:
        return <Video size={16} className="text-blue-500" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Class Management</h1>
          <p className="text-gray-600 mt-1">Schedule and manage yoga classes</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'calendar' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Calendar
            </button>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#F25274] text-white rounded-lg hover:bg-[#F25274]/90"
          >
            <Plus size={16} />
            <span>Add Class</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search classes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
            />
          </div>
          <select
            value={filterInstructor}
            onChange={(e) => setFilterInstructor(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
          >
            <option value="">All Instructors</option>
            {instructors.map(instructor => (
              <option key={instructor.id} value={instructor.name}>{instructor.name}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter size={16} />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-gray-900">{formatDate(currentDate)}</h2>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateCalendar('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 text-sm font-medium text-[#F25274] hover:bg-[#F25274]/10 rounded-lg"
              >
                Today
              </button>
              <button
                onClick={() => navigateCalendar('next')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
              return (
              <div key={day} className="p-3 text-center font-medium bg-gray-50 border-b border-gray-200 text-sm text-gray-500">
                <div className="text-gray-500">
                  {day}
                </div>
              </div>
              );
            })}
            
            {/* Calendar Days */}
            {getCalendarDays().map((date, index) => {
              const dayClasses = getClassesForDate(date);
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (
                <div
                  key={index}
                  className={`min-h-[120px] p-2 border border-gray-200 hover:bg-gray-50 ${
                    isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                  } ${isToday ? 'ring-2 ring-[#F25274]' : ''}`}
                >
                  <div className={`text-sm font-medium mb-2 ${
                    isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                  } ${isToday ? 'text-[#F25274]' : ''}`}>
                    {date.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {dayClasses.slice(0, 3).map(classItem => (
                      <div
                        key={classItem.id}
                        className={`text-xs p-1 rounded cursor-pointer truncate ${
                          classItem.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : classItem.status === 'Cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                        onClick={() => handleEdit(classItem)}
                        title={`${classItem.title} - ${classItem.time}`}
                      >
                        {classItem.time} {classItem.title}
                      </div>
                    ))}
                    {dayClasses.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{dayClasses.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((classItem) => (
            <div key={classItem.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{classItem.title}</h3>
                    <p className="text-sm text-gray-600">{classItem.instructor}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button 
                      onClick={() => handleEdit(classItem)}
                      className="p-1 text-gray-400 hover:text-[#6CBFC4]"
                    >
                      <Edit size={16} />
                    </button>
                    {classItem.status === 'Scheduled' && (
                      <button 
                        onClick={() => markAsCompleted(classItem.id)}
                        className="p-1 text-gray-400 hover:text-green-500"
                        title="Mark as Completed"
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}
                    <button className="p-1 text-gray-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar size={16} />
                    <span>{classItem.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock size={16} />
                    <span>{classItem.time} ({classItem.duration} min)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users size={16} />
                    <span>{classItem.enrolled}/{classItem.capacity} enrolled</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{classItem.description}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1">
                  {classItem.level.map((level, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium bg-[#F3E682] text-gray-900 rounded-full"
                    >
                      {level}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    classItem.status === 'Scheduled' 
                      ? 'bg-blue-100 text-blue-800' 
                      : classItem.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {classItem.status}
                  </span>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">{classItem.frequency}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Class Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {showAddModal ? 'Add New Class' : 'Edit Class'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  setSelectedClass(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={showAddModal ? handleSubmit : handleUpdate} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class Title *
                  </label>
                  <input
                    type="text"
                    value={newClass.title}
                    onChange={(e) => setNewClass({...newClass, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    placeholder="e.g., Morning Yoga Flow"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instructor *
                  </label>
                  <select
                    value={newClass.instructor}
                    onChange={(e) => setNewClass({...newClass, instructor: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    required
                  >
                    <option value="">Select Instructor</option>
                    {instructors.map(instructor => (
                      <option key={instructor.id} value={instructor.name}>{instructor.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={newClass.date}
                    onChange={(e) => setNewClass({...newClass, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    value={newClass.time}
                    onChange={(e) => setNewClass({...newClass, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes) *
                  </label>
                  <input
                    type="number"
                    value={newClass.duration}
                    onChange={(e) => setNewClass({...newClass, duration: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    min="30"
                    max="180"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacity *
                  </label>
                  <input
                    type="number"
                    value={newClass.capacity}
                    onChange={(e) => setNewClass({...newClass, capacity: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    min="1"
                    max="50"
                    required
                  />
                </div>
              </div>

              {/* Zoom Integration */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Zoom Meeting Setup</h3>
                
                {!newClass.zoomConnected ? (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="text-center">
                      <Video size={48} className="mx-auto text-gray-400 mb-4" />
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Connect Zoom Meeting</h4>
                      <p className="text-gray-600 mb-4">
                        Create a Zoom meeting for this class automatically.
                      </p>
                      <button
                        type="button"
                        onClick={handleConnectZoom}
                        disabled={isConnectingZoom}
                        className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 mx-auto"
                      >
                        {isConnectingZoom ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Creating Zoom Meeting...</span>
                          </>
                        ) : (
                          <>
                            <Video size={16} />
                            <span>Connect Zoom</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle size={20} className="text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">Zoom Meeting Connected</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Zoom meeting is ready for this class
                          </p>
                          <div className="mt-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Meeting Link:
                            </label>
                            <input
                              type="url"
                              value={newClass.zoomLink}
                              onChange={(e) => setNewClass({...newClass, zoomLink: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent text-sm"
                              placeholder="https://zoom.us/j/..."
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleDisconnectZoom}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Remove Zoom Meeting"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Membership Levels */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Suitable for Levels *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {membershipLevels.map(level => (
                    <label key={level} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newClass.level.includes(level)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewClass({...newClass, level: [...newClass.level, level]});
                          } else {
                            setNewClass({...newClass, level: newClass.level.filter(l => l !== level)});
                          }
                        }}
                        className="h-4 w-4 text-[#F25274] focus:ring-[#F25274] border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Recurring Settings */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recurring Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recurrence Type
                    </label>
                    <select
                      value={newClass.recurring.type}
                      onChange={(e) => setNewClass({
                        ...newClass, 
                        recurring: {...newClass.recurring, type: e.target.value as 'daily' | 'weekly' | 'custom'}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="daily">Daily</option>
                      <option value="custom">Custom Days</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={newClass.recurring.endDate}
                      onChange={(e) => setNewClass({
                        ...newClass, 
                        recurring: {...newClass.recurring, endDate: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    />
                  </div>
                </div>

                {newClass.recurring.type === 'custom' && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Days
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
                      {weekDays.map(day => (
                        <label key={day} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={newClass.recurring.days?.includes(day) || false}
                            onChange={(e) => {
                              const days = newClass.recurring.days || [];
                              if (e.target.checked) {
                                setNewClass({
                                  ...newClass, 
                                  recurring: {...newClass.recurring, days: [...days, day]}
                                });
                              } else {
                                setNewClass({
                                  ...newClass, 
                                  recurring: {...newClass.recurring, days: days.filter(d => d !== day)}
                                });
                              }
                            }}
                            className="h-4 w-4 text-[#F25274] focus:ring-[#F25274] border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">{day.slice(0, 3)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newClass.description}
                  onChange={(e) => setNewClass({...newClass, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                  placeholder="Brief description of the class..."
                />
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setSelectedClass(null);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-4 py-2 bg-[#F25274] text-white rounded-lg hover:bg-[#F25274]/90"
                >
                  <Save size={16} />
                  <span>{showAddModal ? 'Create Class' : 'Update Class'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;