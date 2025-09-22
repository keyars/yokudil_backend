import React, { useState } from 'react';
import { mockLeaveRequests, mockMembers } from '../data/mockData';
import { FileText, Filter, Search, User, Calendar, MessageSquare, Users, Eye, X } from 'lucide-react';

interface LeaveRequest {
  id: string;
  memberName: string;
  memberId: string;
  memberLevel: string;
  className: string;
  date: string;
  submitDate: string;
  type: 'Prior Leave' | 'Emergency Leave' | 'Sick Leave';
  reason: string;
}

const LeaveRequests: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests as LeaveRequest[]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);

  const membershipLevels = ['Arumbu Ani', 'Mottu Ani', 'Mugai Ani', 'Malar Ani'];

  const filteredRequests = leaveRequests.filter(request => {
    const matchesType = typeFilter === '' || request.type === typeFilter;
    const matchesLevel = levelFilter === '' || request.memberLevel === levelFilter;
    const matchesSearch = searchTerm === '' || 
      request.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesLevel && matchesSearch;
  });

  const handleViewRequest = (request: LeaveRequest) => {
    setSelectedRequest(request);
    setShowViewModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Submitted':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Prior Leave':
        return 'bg-blue-100 text-blue-800';
      case 'Emergency Leave':
        return 'bg-red-100 text-red-800';
      case 'Sick Leave':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Arumbu Ani':
        return 'bg-pink-100 text-pink-800';
      case 'Mottu Ani':
        return 'bg-teal-100 text-teal-800';
      case 'Mugai Ani':
        return 'bg-yellow-100 text-yellow-800';
      case 'Malar Ani':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate statistics
  const stats = {
    total: leaveRequests.length,
    thisMonth: leaveRequests.filter(r => {
      const requestDate = new Date(r.submitDate);
      const currentDate = new Date();
      return requestDate.getMonth() === currentDate.getMonth() && 
             requestDate.getFullYear() === currentDate.getFullYear();
    }).length,
    priorLeave: leaveRequests.filter(r => r.type === 'Prior Leave').length,
    emergencyLeave: leaveRequests.filter(r => r.type === 'Emergency Leave').length,
    sickLeave: leaveRequests.filter(r => r.type === 'Sick Leave').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leave Requests Management</h1>
          <p className="text-gray-600 mt-1">View and manage member leave requests - automatically included in attendance reports</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <div className="bg-[#F25274] p-3 rounded-full">
              <FileText size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Prior Leave</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.priorLeave}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-full">
              <Calendar size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Emergency Leave</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.emergencyLeave}</p>
            </div>
            <div className="bg-red-500 p-3 rounded-full">
              <MessageSquare size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sick Leave</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.sickLeave}</p>
            </div>
            <div className="bg-orange-500 p-3 rounded-full">
              <Users size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
            />
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="Prior Leave">Prior Leave</option>
            <option value="Emergency Leave">Emergency Leave</option>
            <option value="Sick Leave">Sick Leave</option>
          </select>

          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
          >
            <option value="">All Levels</option>
            {membershipLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          
          <div className="flex items-center text-sm text-gray-600">
            <Filter size={16} className="mr-2" />
            <span>{filteredRequests.length} of {leaveRequests.length} requests</span>
          </div>
        </div>
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Leave Requests</h3>
          <p className="text-sm text-gray-600 mt-1">All leave requests are automatically included in attendance reports - no approval required</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class & Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leave Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#6CBFC4] rounded-full flex items-center justify-center">
                        <User size={16} className="text-white" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{request.memberName}</div>
                        <div className="text-sm text-gray-500">{request.memberId}</div>
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${getLevelColor(request.memberLevel)}`}>
                          {request.memberLevel}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.className}</div>
                    <div className="text-sm text-gray-500">{request.date}</div>
                    <div className="text-xs text-gray-400">Submitted: {request.submitDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(request.type)}`}>
                      {request.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs">
                      <p className="line-clamp-2">{request.reason}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewRequest(request)}
                      className="text-[#6CBFC4] hover:text-[#6CBFC4]/80 p-2 rounded-lg hover:bg-gray-50"
                      title="View Leave Details"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Leave Requests Found</h3>
            <p className="text-gray-600">
              {searchTerm || typeFilter || levelFilter
                ? 'No leave requests match your current filters.'
                : 'No leave requests have been submitted yet.'}
            </p>
          </div>
        )}
      </div>

      {/* Information Panel */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <div className="bg-blue-500 p-2 rounded-full">
            <Users size={16} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Attendance Integration</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• <strong>Automatic Integration:</strong> All leave requests are automatically included in attendance reports - no approval required</p>
              <p>• <strong>No Manual Entry:</strong> All leaves are counted as valid absences in attendance calculations</p>
              <p>• <strong>Level-based Tracking:</strong> Filter and analyze leave patterns by membership level</p>
              <p>• <strong>Comprehensive Reporting:</strong> Leave data enhances attendance analytics and member engagement insights</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Leave Request Modal */}
      {showViewModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Leave Request Details</h2>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedRequest(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Leave Header */}
              <div className="text-center border-b border-gray-200 pb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Leave Request</h1>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getTypeColor(selectedRequest.type)}`}>
                  {selectedRequest.type}
                </span>
              </div>

              {/* Member Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <User size={20} className="mr-2 text-[#F25274]" />
                  Member Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium text-gray-900">{selectedRequest.memberName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Member ID</p>
                    <p className="font-medium text-gray-900">{selectedRequest.memberId}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Membership Level</p>
                    <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full mt-1 ${getLevelColor(selectedRequest.memberLevel)}`}>
                      {selectedRequest.memberLevel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Leave Details */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Calendar size={20} className="mr-2 text-[#6CBFC4]" />
                  Leave Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Class Name</p>
                    <p className="font-medium text-gray-900">{selectedRequest.className}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Leave Date</p>
                    <p className="font-medium text-gray-900">{selectedRequest.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Leave Type</p>
                    <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full mt-1 ${getTypeColor(selectedRequest.type)}`}>
                      {selectedRequest.type}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Submitted On</p>
                    <p className="font-medium text-gray-900">{selectedRequest.submitDate}</p>
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <MessageSquare size={20} className="mr-2 text-[#F3E682]" />
                  Reason for Leave
                </h3>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">{selectedRequest.reason}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedRequest(null);
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

export default LeaveRequests;