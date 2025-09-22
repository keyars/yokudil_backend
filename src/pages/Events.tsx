import React, { useState } from 'react';
import { mockEvents } from '../data/mockData';
import { Calendar, MapPin, Users, Plus, Edit, Trash2, Star, X, Save, Clock, User, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
  createdBy: string;
  createdDate: string;
  category: string;
  registrationRequired: boolean;
  fee?: number;
  instructor?: string;
  image?: string;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents as Event[]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: ''
  });

  const categories = ['Workshop', 'Retreat', 'Special Class', 'Community Event', 'Training', 'Celebration'];
  const statuses = ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'];

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesStatus = filterStatus === '' || event.status === filterStatus;
    const matchesCategory = filterCategory === '' || event.category === filterCategory;
    return matchesStatus && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage);

  const resetForm = () => {
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      location: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData: Event = {
      id: `E${String(events.length + 1).padStart(3, '0')}`,
      ...newEvent,
      category: 'Workshop',
      maxAttendees: 100,
      attendees: 0,
      status: 'Upcoming',
      createdBy: 'Current User',
      createdDate: new Date().toLocaleDateString(),
      registrationRequired: false,
      fee: 0
    };

    setEvents([...events, eventData]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setNewEvent({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location
    });
    setShowEditModal(true);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    const updatedEvents = events.map(event => 
      event.id === selectedEvent.id 
        ? { ...event, ...newEvent, category: event.category, instructor: event.instructor }
        : event
    );

    setEvents(updatedEvents);
    setShowEditModal(false);
    setSelectedEvent(null);
    resetForm();
  };

  const handleDelete = (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== eventId));
    }
  };

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
    setShowViewModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'Ongoing':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Workshop':
        return 'bg-purple-100 text-purple-800';
      case 'Retreat':
        return 'bg-green-100 text-green-800';
      case 'Special Class':
        return 'bg-blue-100 text-blue-800';
      case 'Community Event':
        return 'bg-yellow-100 text-yellow-800';
      case 'Training':
        return 'bg-red-100 text-red-800';
      case 'Celebration':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
          <p className="text-gray-600 mt-1">Organize and manage community events</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-[#F25274] text-white rounded-lg hover:bg-[#F25274]/90"
        >
          <Plus size={16} />
          <span>Create Event</span>
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{events.length}</p>
            </div>
            <div className="bg-[#F25274] p-3 rounded-full">
              <Calendar size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {events.filter(e => e.status === 'Upcoming').length}
              </p>
            </div>
            <div className="bg-blue-500 p-3 rounded-full">
              <Clock size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Attendees</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {events.reduce((sum, event) => sum + event.attendees, 0)}
              </p>
            </div>
            <div className="bg-[#6CBFC4] p-3 rounded-full">
              <Users size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">8</p>
            </div>
            <div className="bg-[#F3E682] p-3 rounded-full">
              <Star size={24} className="text-gray-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
          >
            <option value="">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <div className="text-sm text-gray-600 flex items-center">
            Showing {paginatedEvents.length} of {filteredEvents.length} events
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {paginatedEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{event.description}</p>
                </div>
                <div className="flex items-center space-x-1 ml-4">
                  <button 
                    onClick={() => handleViewDetails(event)}
                    className="p-2 text-gray-400 hover:text-[#6CBFC4] rounded-lg hover:bg-gray-100"
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    onClick={() => handleEdit(event)}
                    className="p-2 text-gray-400 hover:text-[#6CBFC4] rounded-lg hover:bg-gray-100"
                    title="Edit Event"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(event.id)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100"
                    title="Delete Event"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Calendar size={16} className="text-[#F25274]" />
                  <span>{event.date} at {event.time}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <MapPin size={16} className="text-[#6CBFC4]" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Users size={16} className="text-[#F3E682]" />
                  <span>{event.attendees}/{event.maxAttendees} attendees</span>
                </div>
                {event.fee && event.fee > 0 && (
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <span className="font-medium">Fee: ₹{event.fee}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
                
                <div className="text-right text-xs text-gray-500">
                  <p>Created by {event.createdBy}</p>
                  <p>{event.createdDate}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                currentPage === page
                  ? 'bg-[#F25274] text-white'
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Create New Event</h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    placeholder="Enter event title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
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
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    placeholder="Event location"
                    required
                  />
                </div>


                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    placeholder="Event description..."
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
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
                  <span>Create Event</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {showEditModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Edit Event</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedEvent(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    placeholder="Enter event title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
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
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    placeholder="Event location"
                    required
                  />
                </div>






                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    placeholder="Event description..."
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedEvent(null);
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
                  <span>Update Event</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Event Details Modal */}
      {showViewModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Event Details</h2>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedEvent(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Event Header */}
              <div className="text-center border-b border-gray-200 pb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedEvent.category)}`}>
                    {selectedEvent.category}
                  </span>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedEvent.status)}`}>
                  {selectedEvent.status}
                </span>
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar size={20} className="text-[#F25274]" />
                    <div>
                      <p className="text-sm text-gray-600">Date & Time</p>
                      <p className="font-medium text-gray-900">{selectedEvent.date} at {selectedEvent.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin size={20} className="text-[#6CBFC4]" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium text-gray-900">{selectedEvent.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Users size={20} className="text-[#F3E682]" />
                    <div>
                      <p className="text-sm text-gray-600">Attendees</p>
                      <p className="font-medium text-gray-900">{selectedEvent.attendees}/{selectedEvent.maxAttendees}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedEvent.instructor && (
                    <div className="flex items-center space-x-3">
                      <User size={20} className="text-purple-500" />
                      <div>
                        <p className="text-sm text-gray-600">Instructor</p>
                        <p className="font-medium text-gray-900">{selectedEvent.instructor}</p>
                      </div>
                    </div>
                  )}

                  {selectedEvent.fee && selectedEvent.fee > 0 && (
                    <div className="flex items-center space-x-3">
                      <span className="w-5 h-5 flex items-center justify-center text-green-600">₹</span>
                      <div>
                        <p className="text-sm text-gray-600">Fee</p>
                        <p className="font-medium text-gray-900">₹{selectedEvent.fee}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-3">
                    <span className="w-5 h-5 flex items-center justify-center text-blue-600">📝</span>
                    <div>
                      <p className="text-sm text-gray-600">Registration</p>
                      <p className="font-medium text-gray-900">
                        {selectedEvent.registrationRequired ? 'Required' : 'Not Required'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
              </div>

              {/* Event Meta */}
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p><span className="font-medium">Created by:</span> {selectedEvent.createdBy}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Created on:</span> {selectedEvent.createdDate}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    handleEdit(selectedEvent);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  <Edit size={16} />
                  <span>Edit Event</span>
                </button>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedEvent(null);
                  }}
                  className="px-4 py-2 bg-[#F25274] text-white rounded-lg hover:bg-[#F25274]/90"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;