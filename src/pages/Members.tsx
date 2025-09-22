import React, { useState } from 'react';
import { mockMembers, membershipLevels } from '../data/mockData';
import { Search, Filter, Plus, Download, Eye, Edit, Trash2, X, Calendar, Phone, Mail, User, Heart, UserPlus, CheckCircle, XCircle, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  membershipLevel: string;
  joinDate: string;
  status: string;
  invitationStatus: string;
  healthMetrics: {
    height: string;
    weight: string;
    waist: string;
    hip: string;
    armSize: string;
    lastUpdated: string;
  };
  medicalInfo: {
    conditions: string[];
    lastCheckup: string;
    vitaminD: string;
    ferritin: string;
    remarks: string;
  };
  attendanceRate: number;
  totalClasses: number;
  lastActive: string;
}

const Members: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterJoinDate, setFilterJoinDate] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const itemsPerPage = 20;

  // Form states for Add/Edit Member
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    membershipLevel: 'Arumbu Ani',
    healthHeight: '',
    healthWeight: '',
    healthWaist: '',
    healthHip: '',
    healthArmSize: '',
    medicalConditions: '',
    vitaminD: 'Normal',
    ferritin: 'Normal',
    remarks: ''
  });

  // Filter members
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === '' || member.membershipLevel === filterLevel;
    const matchesStatus = filterStatus === '' || member.status === filterStatus;
    const matchesGender = filterGender === '' || member.gender === filterGender;
    const matchesJoinDate = filterJoinDate === '' || member.joinDate.includes(filterJoinDate);
    
    return matchesSearch && matchesLevel && matchesStatus && matchesGender && matchesJoinDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMembers = filteredMembers.slice(startIndex, startIndex + itemsPerPage);

  // Get pending approvals
  const pendingApprovals = members.filter(member => member.invitationStatus === 'pending');

  const exportToCSV = () => {
    const csvContent = [
      ['ID', 'Name', 'Email', 'Phone', 'Level', 'Status', 'Join Date', 'Attendance Rate'].join(','),
      ...filteredMembers.map(member => [
        member.id,
        member.name,
        member.email,
        member.phone,
        member.membershipLevel,
        member.status,
        member.joinDate,
        `${member.attendanceRate}%`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'members.csv';
    a.click();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      emergencyContactRelationship: '',
      membershipLevel: 'Arumbu Ani',
      healthHeight: '',
      healthWeight: '',
      healthWaist: '',
      healthHip: '',
      healthArmSize: '',
      medicalConditions: '',
      vitaminD: 'Normal',
      ferritin: 'Normal',
      remarks: ''
    });
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember: Member = {
      id: `M${String(members.length + 1).padStart(4, '0')}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      address: formData.address,
      emergencyContact: {
        name: formData.emergencyContactName,
        phone: formData.emergencyContactPhone,
        relationship: formData.emergencyContactRelationship
      },
      membershipLevel: formData.membershipLevel,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      invitationStatus: 'approved',
      healthMetrics: {
        height: formData.healthHeight,
        weight: formData.healthWeight,
        waist: formData.healthWaist,
        hip: formData.healthHip,
        armSize: formData.healthArmSize,
        lastUpdated: new Date().toISOString().split('T')[0]
      },
      medicalInfo: {
        conditions: formData.medicalConditions ? formData.medicalConditions.split(',').map(c => c.trim()) : ['None'],
        lastCheckup: new Date().toISOString().split('T')[0],
        vitaminD: formData.vitaminD,
        ferritin: formData.ferritin,
        remarks: formData.remarks
      },
      attendanceRate: 0,
      totalClasses: 0,
      lastActive: new Date().toISOString().split('T')[0]
    };

    setMembers([...members, newMember]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;

    const updatedMembers = members.map(member => 
      member.id === selectedMember.id 
        ? {
            ...member,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            address: formData.address,
            emergencyContact: {
              name: formData.emergencyContactName,
              phone: formData.emergencyContactPhone,
              relationship: formData.emergencyContactRelationship
            },
            membershipLevel: formData.membershipLevel,
            healthMetrics: {
              ...member.healthMetrics,
              height: formData.healthHeight,
              weight: formData.healthWeight,
              waist: formData.healthWaist,
              hip: formData.healthHip,
              armSize: formData.healthArmSize,
              lastUpdated: new Date().toISOString().split('T')[0]
            },
            medicalInfo: {
              ...member.medicalInfo,
              conditions: formData.medicalConditions ? formData.medicalConditions.split(',').map(c => c.trim()) : ['None'],
              vitaminD: formData.vitaminD,
              ferritin: formData.ferritin,
              remarks: formData.remarks
            }
          }
        : member
    );

    setMembers(updatedMembers);
    setShowEditModal(false);
    setSelectedMember(null);
    resetForm();
  };

  const handleViewMember = (member: Member) => {
    setSelectedMember(member);
    setShowViewModal(true);
  };

  const handleEditClick = (member: Member) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      dateOfBirth: member.dateOfBirth,
      gender: member.gender,
      address: member.address,
      emergencyContactName: member.emergencyContact.name,
      emergencyContactPhone: member.emergencyContact.phone,
      emergencyContactRelationship: member.emergencyContact.relationship,
      membershipLevel: member.membershipLevel,
      healthHeight: member.healthMetrics.height,
      healthWeight: member.healthMetrics.weight,
      healthWaist: member.healthMetrics.waist,
      healthHip: member.healthMetrics.hip,
      healthArmSize: member.healthMetrics.armSize,
      medicalConditions: member.medicalInfo.conditions.join(', '),
      vitaminD: member.medicalInfo.vitaminD,
      ferritin: member.medicalInfo.ferritin,
      remarks: member.medicalInfo.remarks
    });
    setShowEditModal(true);
  };

  const handleDeleteMember = (memberId: string) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      setMembers(members.filter(member => member.id !== memberId));
    }
  };

  const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleSendInvite = () => {
    const inviteCode = generateInviteCode();
    alert(`Invitation sent! Invite Code: ${inviteCode}`);
    setShowInviteModal(false);
  };

  const handleApproveMember = (memberId: string) => {
    const updatedMembers = members.map(member => 
      member.id === memberId 
        ? { ...member, status: 'Active', invitationStatus: 'approved' }
        : member
    );
    setMembers(updatedMembers);
  };

  const handleRejectMember = (memberId: string) => {
    if (window.confirm('Are you sure you want to reject this member application?')) {
      setMembers(members.filter(member => member.id !== memberId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Member Management</h1>
          <p className="text-gray-600 mt-1">Manage your yoga community members</p>
        </div>
        <div className="flex items-center space-x-3">
          {pendingApprovals.length > 0 && (
            <button
              onClick={() => setShowApprovalModal(true)}
              type="button"
              className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 relative"
            >
              <UserPlus size={16} />
              <span>Approvals</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {pendingApprovals.length}
              </span>
            </button>
          )}
          <button
            onClick={() => setShowInviteModal(true)}
            type="button"
            className="flex items-center space-x-2 px-4 py-2 border border-[#6CBFC4] text-[#6CBFC4] rounded-lg hover:bg-[#6CBFC4] hover:text-white"
          >
            <Mail size={16} />
            <span>Invite</span>
          </button>
          <button
            onClick={exportToCSV}
            type="button"
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download size={16} />
            <span>Export</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            type="button"
            className="flex items-center space-x-2 px-4 py-2 bg-[#F25274] text-white rounded-lg hover:bg-[#F25274]/90"
          >
            <Plus size={16} />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
            />
          </div>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
          >
            <option value="">All Levels</option>
            {membershipLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
          <button 
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            type="button"
            className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter size={16} />
            <span>More Filters</span>
          </button>
        </div>

        {/* More Filters */}
        {showMoreFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
            >
              <option value="">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="month"
              value={filterJoinDate}
              onChange={(e) => setFilterJoinDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
              placeholder="Join Date"
            />
            <button
              onClick={() => {
                setFilterLevel('');
                setFilterStatus('');
                setFilterGender('');
                setFilterJoinDate('');
                setSearchTerm('');
              }}
              type="button"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#6CBFC4] rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.email}</div>
                    <div className="text-sm text-gray-500">{member.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-[#F3E682] text-gray-900 rounded-full">
                      {member.membershipLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      member.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : member.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.attendanceRate}%</div>
                    <div className="text-sm text-gray-500">{member.totalClasses} classes</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewMember(member)}
                        type="button"
                        className="text-[#6CBFC4] hover:text-[#6CBFC4]/80"
                        title="View Member"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(member)}
                        type="button"
                        className="text-[#F3E682] hover:text-[#F3E682]/80"
                        title="Edit Member"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteMember(member.id)}
                        type="button"
                        className="text-red-600 hover:text-red-800"
                        title="Delete Member"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredMembers.length)} of {filteredMembers.length} members
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            type="button"
            className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              type="button"
              className={`px-3 py-2 rounded-lg ${
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
            type="button"
            className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Add New Member</h2>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
            </div>
            <form onSubmit={handleAddMember} className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Membership Level *</label>
                    <select
                      value={formData.membershipLevel}
                      onChange={(e) => setFormData({...formData, membershipLevel: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    >
                      {membershipLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      rows={3}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name *</label>
                    <input
                      type="text"
                      value={formData.emergencyContactName}
                      onChange={(e) => setFormData({...formData, emergencyContactName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone *</label>
                    <input
                      type="tel"
                      value={formData.emergencyContactPhone}
                      onChange={(e) => setFormData({...formData, emergencyContactPhone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Relationship *</label>
                    <input
                      type="text"
                      value={formData.emergencyContactRelationship}
                      onChange={(e) => setFormData({...formData, emergencyContactRelationship: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="e.g., Spouse, Parent, Sibling"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Health Metrics */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Health Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                    <input
                      type="text"
                      value={formData.healthHeight}
                      onChange={(e) => setFormData({...formData, healthHeight: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="e.g., 165cm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                    <input
                      type="text"
                      value={formData.healthWeight}
                      onChange={(e) => setFormData({...formData, healthWeight: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="e.g., 55kg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Waist</label>
                    <input
                      type="text"
                      value={formData.healthWaist}
                      onChange={(e) => setFormData({...formData, healthWaist: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="e.g., 28in"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hip</label>
                    <input
                      type="text"
                      value={formData.healthHip}
                      onChange={(e) => setFormData({...formData, healthHip: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="e.g., 35in"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Arm Size</label>
                    <input
                      type="text"
                      value={formData.healthArmSize}
                      onChange={(e) => setFormData({...formData, healthArmSize: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="e.g., 12in"
                    />
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Medical Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
                    <input
                      type="text"
                      value={formData.medicalConditions}
                      onChange={(e) => setFormData({...formData, medicalConditions: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Separate multiple conditions with commas"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vitamin D Level</label>
                    <select
                      value={formData.vitaminD}
                      onChange={(e) => setFormData({...formData, vitaminD: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    >
                      <option value="Normal">Normal</option>
                      <option value="Low">Low</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ferritin Level</label>
                    <select
                      value={formData.ferritin}
                      onChange={(e) => setFormData({...formData, ferritin: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    >
                      <option value="Normal">Normal</option>
                      <option value="Low">Low</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                    <input
                      type="text"
                      value={formData.remarks}
                      onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Additional notes"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F25274] text-white rounded-lg hover:bg-[#F25274]/90"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Member Modal */}
      {showViewModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Member Details</h2>
                <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <User className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="font-medium">{selectedMember.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{selectedMember.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{selectedMember.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Date of Birth</p>
                      <p className="font-medium">{selectedMember.dateOfBirth}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="font-medium">{selectedMember.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Membership Level</p>
                    <span className="px-2 py-1 text-xs font-medium bg-[#F3E682] text-gray-900 rounded-full">
                      {selectedMember.membershipLevel}
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium">{selectedMember.address}</p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Heart className="text-red-500 mr-2" size={20} />
                  Emergency Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-red-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Contact Name</p>
                    <p className="font-medium">{selectedMember.emergencyContact.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact Phone</p>
                    <p className="font-medium">{selectedMember.emergencyContact.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Relationship</p>
                    <p className="font-medium">{selectedMember.emergencyContact.relationship}</p>
                  </div>
                </div>
              </div>

              {/* Health Metrics */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Health Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Height</p>
                    <p className="font-medium">{selectedMember.healthMetrics.height}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Weight</p>
                    <p className="font-medium">{selectedMember.healthMetrics.weight}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Waist</p>
                    <p className="font-medium">{selectedMember.healthMetrics.waist}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Hip</p>
                    <p className="font-medium">{selectedMember.healthMetrics.hip}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Arm Size</p>
                    <p className="font-medium">{selectedMember.healthMetrics.armSize}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Last updated: {selectedMember.healthMetrics.lastUpdated}</p>
              </div>

              {/* Medical Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Medical Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Medical Conditions</p>
                    <p className="font-medium">{selectedMember.medicalInfo.conditions.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Checkup</p>
                    <p className="font-medium">{selectedMember.medicalInfo.lastCheckup}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Vitamin D Level</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      selectedMember.medicalInfo.vitaminD === 'Normal' ? 'bg-green-100 text-green-800' :
                      selectedMember.medicalInfo.vitaminD === 'Low' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedMember.medicalInfo.vitaminD}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ferritin Level</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      selectedMember.medicalInfo.ferritin === 'Normal' ? 'bg-green-100 text-green-800' :
                      selectedMember.medicalInfo.ferritin === 'Low' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedMember.medicalInfo.ferritin}
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Remarks</p>
                    <p className="font-medium">{selectedMember.medicalInfo.remarks}</p>
                  </div>
                </div>
              </div>

              {/* Activity Summary */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-[#F25274]/10 rounded-lg">
                    <p className="text-2xl font-bold text-[#F25274]">{selectedMember.attendanceRate}%</p>
                    <p className="text-sm text-gray-600">Attendance Rate</p>
                  </div>
                  <div className="text-center p-3 bg-[#6CBFC4]/10 rounded-lg">
                    <p className="text-2xl font-bold text-[#6CBFC4]">{selectedMember.totalClasses}</p>
                    <p className="text-sm text-gray-600">Total Classes</p>
                  </div>
                  <div className="text-center p-3 bg-[#F3E682]/10 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{selectedMember.joinDate}</p>
                    <p className="text-sm text-gray-600">Join Date</p>
                  </div>
                  <div className="text-center p-3 bg-gray-100 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{selectedMember.lastActive}</p>
                    <p className="text-sm text-gray-600">Last Active</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setShowViewModal(false)}
                type="button"
                className="w-full px-4 py-2 bg-[#F25274] text-white rounded-lg hover:bg-[#F25274]/90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {showEditModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Edit Member</h2>
                <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
            </div>
            <form onSubmit={handleEditMember} className="p-6 space-y-6">
              {/* Same form structure as Add Member Modal but with pre-filled values */}
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Membership Level *</label>
                    <select
                      value={formData.membershipLevel}
                      onChange={(e) => setFormData({...formData, membershipLevel: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    >
                      {membershipLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      rows={3}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name *</label>
                    <input
                      type="text"
                      value={formData.emergencyContactName}
                      onChange={(e) => setFormData({...formData, emergencyContactName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone *</label>
                    <input
                      type="tel"
                      value={formData.emergencyContactPhone}
                      onChange={(e) => setFormData({...formData, emergencyContactPhone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Relationship *</label>
                    <input
                      type="text"
                      value={formData.emergencyContactRelationship}
                      onChange={(e) => setFormData({...formData, emergencyContactRelationship: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="e.g., Spouse, Parent, Sibling"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Health Metrics */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Health Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                    <input
                      type="text"
                      value={formData.healthHeight}
                      onChange={(e) => setFormData({...formData, healthHeight: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="e.g., 165cm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                    <input
                      type="text"
                      value={formData.healthWeight}
                      onChange={(e) => setFormData({...formData, healthWeight: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="e.g., 55kg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Waist</label>
                    <input
                      type="text"
                      value={formData.healthWaist}
                      onChange={(e) => setFormData({...formData, healthWaist: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="e.g., 28in"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hip</label>
                    <input
                      type="text"
                      value={formData.healthHip}
                      onChange={(e) => setFormData({...formData, healthHip: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="e.g., 35in"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Arm Size</label>
                    <input
                      type="text"
                      value={formData.healthArmSize}
                      onChange={(e) => setFormData({...formData, healthArmSize: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="e.g., 12in"
                    />
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Medical Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
                    <input
                      type="text"
                      value={formData.medicalConditions}
                      onChange={(e) => setFormData({...formData, medicalConditions: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Separate multiple conditions with commas"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vitamin D Level</label>
                    <select
                      value={formData.vitaminD}
                      onChange={(e) => setFormData({...formData, vitaminD: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    >
                      <option value="Normal">Normal</option>
                      <option value="Low">Low</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ferritin Level</label>
                    <select
                      value={formData.ferritin}
                      onChange={(e) => setFormData({...formData, ferritin: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    >
                      <option value="Normal">Normal</option>
                      <option value="Low">Low</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                    <input
                      type="text"
                      value={formData.remarks}
                      onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Additional notes"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F25274] text-white rounded-lg hover:bg-[#F25274]/90"
                >
                  Update Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Invite New Member</h2>
                <button onClick={() => setShowInviteModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#6CBFC4] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Send Invitation</h3>
                <p className="text-gray-600">Generate an invitation code for new members to join</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    rows={3}
                    placeholder="Welcome message for the new member"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowInviteModal(false)}
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendInvite}
                  type="button"
                  className="px-4 py-2 bg-[#6CBFC4] text-white rounded-lg hover:bg-[#6CBFC4]/90"
                >
                  Send Invitation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Member Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Pending Member Approvals</h2>
                <button onClick={() => setShowApprovalModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="p-6">
              {pendingApprovals.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">All Caught Up!</h3>
                  <p className="text-gray-600">No pending member approvals at this time.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingApprovals.map((member) => (
                    <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-[#6CBFC4] rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-gray-900">{member.name}</h4>
                            <p className="text-sm text-gray-600">{member.email}</p>
                            <p className="text-sm text-gray-500">Applied: {member.joinDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewMember(member)}
                            type="button"
                            className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleApproveMember(member.id)}
                            type="button"
                            className="flex items-center space-x-1 px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600"
                          >
                            <CheckCircle size={16} />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleRejectMember(member.id)}
                            type="button"
                            className="flex items-center space-x-1 px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                          >
                            <XCircle size={16} />
                            <span>Reject</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setShowApprovalModal(false)}
                type="button"
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;