import React, { useState } from 'react';
import { mockMembers } from '../data/mockData';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  X, 
  Save, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Heart,
  Shield,
  Award,
  UserCheck,
  GraduationCap,
  Briefcase
} from 'lucide-react';

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  membershipLevel: string;
  memberType: 'Member' | 'Teacher' | 'Volunteer';
  joinDate: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  tshirtSize: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  referredByName?: string;
  referredByPhone?: string;
  medicalInfo: {
    bloodGroup: string;
    allergies: string;
    medications: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    ferritin: string;
    b12: string;
    vitaminD: string;
    papSmear: string;
    memogram: string;
  };
  professionalInfo?: {
    specialization: string;
    experience: string;
    bio: string;
  };
}

const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>(mockMembers.map(member => ({
    ...member,
    memberType: 'Member' as 'Member' | 'Teacher' | 'Volunteer',
    tshirtSize: 'M' as 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL',
    referredByName: '',
    referredByPhone: '',
    medicalInfo: {
      bloodGroup: member.medicalInfo?.bloodGroup || '',
      allergies: member.medicalInfo?.allergies || '',
      medications: member.medicalInfo?.medications || '',
      emergencyContactName: member.medicalInfo?.emergencyContactName || '',
      emergencyContactPhone: member.medicalInfo?.emergencyContactPhone || '',
      ferritin: '',
      b12: '',
      vitaminD: '',
      papSmear: '',
      memogram: ''
    },
    professionalInfo: undefined
  })));

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    membershipLevel: 'Arumbu Ani',
    memberType: 'Member' as 'Member' | 'Teacher' | 'Volunteer',
    tshirtSize: 'M' as 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL',
    referredByName: '',
    referredByPhone: '',
    medicalInfo: {
      bloodGroup: '',
      allergies: '',
      medications: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      ferritin: '',
      b12: '',
      vitaminD: '',
      papSmear: '',
      memogram: ''
    },
    professionalInfo: {
      specialization: '',
      experience: '',
      bio: ''
    }
  });

  const membershipLevels = ['Arumbu Ani', 'Mottu Ani', 'Mugai Ani', 'Malar Ani'];
  const memberTypes = ['Member', 'Teacher', 'Volunteer'];
  const tshirtSizes = [
    { value: 'XS', label: 'Extra Small (XS)' },
    { value: 'S', label: 'Small (S)' },
    { value: 'M', label: 'Medium (M)' },
    { value: 'L', label: 'Large (L)' },
    { value: 'XL', label: 'Extra Large (XL)' },
    { value: 'XXL', label: 'Double XL (XXL)' }
  ];

  const resetForm = () => {
    setNewMember({
      name: '',
      email: '',
      phone: '',
      address: '',
      dateOfBirth: '',
      membershipLevel: 'Arumbu Ani',
      memberType: 'Member',
      tshirtSize: 'M',
      referredByName: '',
      referredByPhone: '',
      medicalInfo: {
        bloodGroup: '',
        allergies: '',
        medications: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        ferritin: '',
        b12: '',
        vitaminD: '',
        papSmear: '',
        memogram: ''
      },
      professionalInfo: {
        specialization: '',
        experience: '',
        bio: ''
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const memberData: Member = {
      id: `M${String(members.length + 1).padStart(3, '0')}`,
      ...newMember,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      professionalInfo: (newMember.memberType === 'Teacher' || newMember.memberType === 'Volunteer') 
        ? newMember.professionalInfo 
        : undefined
    };

    setMembers([...members, memberData]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = (member: Member) => {
    setSelectedMember(member);
    setNewMember({
      name: member.name,
      email: member.email,
      phone: member.phone,
      address: member.address,
      dateOfBirth: member.dateOfBirth,
      membershipLevel: member.membershipLevel,
      memberType: member.memberType,
      tshirtSize: member.tshirtSize,
      referredByName: member.referredByName || '',
      referredByPhone: member.referredByPhone || '',
      medicalInfo: member.medicalInfo,
      professionalInfo: member.professionalInfo || {
        specialization: '',
        experience: '',
        bio: ''
      }
    });
    setShowEditModal(true);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;

    const updatedMembers = members.map(member => 
      member.id === selectedMember.id 
        ? { 
            ...member, 
            ...newMember,
            professionalInfo: (newMember.memberType === 'Teacher' || newMember.memberType === 'Volunteer') 
              ? newMember.professionalInfo 
              : undefined
          }
        : member
    );

    setMembers(updatedMembers);
    setShowEditModal(false);
    setSelectedMember(null);
    resetForm();
  };

  const handleDelete = (memberId: string) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      setMembers(members.filter(member => member.id !== memberId));
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = searchTerm === '' || 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm);
    const matchesLevel = levelFilter === '' || member.membershipLevel === levelFilter;
    const matchesType = typeFilter === '' || member.memberType === typeFilter;
    const matchesStatus = statusFilter === '' || member.status === statusFilter;
    
    return matchesSearch && matchesLevel && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      case 'Suspended':
        return 'bg-red-100 text-red-800';
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Teacher':
        return 'bg-blue-100 text-blue-800';
      case 'Volunteer':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Teacher':
        return <GraduationCap size={16} />;
      case 'Volunteer':
        return <Heart size={16} />;
      default:
        return <User size={16} />;
    }
  };

  // Calculate statistics
  const stats = {
    total: members.length,
    active: members.filter(m => m.status === 'Active').length,
    teachers: members.filter(m => m.memberType === 'Teacher').length,
    volunteers: members.filter(m => m.memberType === 'Volunteer').length,
    regularMembers: members.filter(m => m.memberType === 'Member').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Members Management</h1>
          <p className="text-gray-600 mt-1">Manage all members, teachers, and volunteers</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-[#F25274] text-white rounded-lg hover:bg-[#F25274]/90"
        >
          <Plus size={16} />
          <span>Add Member</span>
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <div className="bg-[#F25274] p-3 rounded-full">
              <Users size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Members</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.active}</p>
            </div>
            <div className="bg-green-500 p-3 rounded-full">
              <UserCheck size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Teachers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.teachers}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-full">
              <GraduationCap size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Volunteers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.volunteers}</p>
            </div>
            <div className="bg-[#6CBFC4] p-3 rounded-full">
              <Heart size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Regular Members</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.regularMembers}</p>
            </div>
            <div className="bg-[#F3E682] p-3 rounded-full">
              <User size={24} className="text-gray-800" />
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
              placeholder="Search members..."
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
            {memberTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
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

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
          
          <div className="flex items-center text-sm text-gray-600">
            <Filter size={16} className="mr-2" />
            <span>{filteredMembers.length} of {members.length}</span>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type & Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  T-Shirt Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#6CBFC4] rounded-full flex items-center justify-center">
                        {getTypeIcon(member.memberType)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                        <div className="text-sm text-gray-500">{member.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(member.memberType)}`}>
                        {member.memberType}
                      </span>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(member.membershipLevel)}`}>
                          {member.membershipLevel}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{member.tshirtSize}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEdit(member)}
                        className="text-[#6CBFC4] hover:text-[#6CBFC4]/80 p-1"
                        title="Edit Member"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(member.id)}
                        className="text-red-600 hover:text-red-800 p-1"
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

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Add New Member</h2>
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

            <form onSubmit={handleSubmit} className="p-6 space-y-8">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="mr-2 text-[#F25274]" size={20} />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={newMember.name}
                      onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={newMember.phone}
                      onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      value={newMember.dateOfBirth}
                      onChange={(e) => setNewMember({...newMember, dateOfBirth: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Member Type *
                    </label>
                    <select
                      value={newMember.memberType}
                      onChange={(e) => setNewMember({...newMember, memberType: e.target.value as 'Member' | 'Teacher' | 'Volunteer'})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    >
                      {memberTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Membership Level *
                    </label>
                    <select
                      value={newMember.membershipLevel}
                      onChange={(e) => setNewMember({...newMember, membershipLevel: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    >
                      {membershipLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      T-Shirt Size *
                    </label>
                    <select
                      value={newMember.tshirtSize}
                      onChange={(e) => setNewMember({...newMember, tshirtSize: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    >
                      {tshirtSizes.map(size => (
                        <option key={size.value} value={size.value}>{size.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      value={newMember.address}
                      onChange={(e) => setNewMember({...newMember, address: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Referral Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="mr-2 text-[#6CBFC4]" size={20} />
                  Referral Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Referred By Name
                    </label>
                    <input
                      type="text"
                      value={newMember.referredByName}
                      onChange={(e) => setNewMember({...newMember, referredByName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Name of the person who referred"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Referred By Phone Number
                    </label>
                    <input
                      type="tel"
                      value={newMember.referredByPhone}
                      onChange={(e) => setNewMember({...newMember, referredByPhone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Phone number of referrer"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information - Only for Teachers/Volunteers */}
              {(newMember.memberType === 'Teacher' || newMember.memberType === 'Volunteer') && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Briefcase className="mr-2 text-[#F3E682]" size={20} />
                    Professional Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specialization
                      </label>
                      <input
                        type="text"
                        value={newMember.professionalInfo.specialization}
                        onChange={(e) => setNewMember({
                          ...newMember, 
                          professionalInfo: {
                            ...newMember.professionalInfo,
                            specialization: e.target.value
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                        placeholder="e.g., Hatha Yoga, Vinyasa, Meditation"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Experience
                      </label>
                      <input
                        type="text"
                        value={newMember.professionalInfo.experience}
                        onChange={(e) => setNewMember({
                          ...newMember, 
                          professionalInfo: {
                            ...newMember.professionalInfo,
                            experience: e.target.value
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                        placeholder="e.g., 5 years, Beginner, Advanced"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        value={newMember.professionalInfo.bio}
                        onChange={(e) => setNewMember({
                          ...newMember, 
                          professionalInfo: {
                            ...newMember.professionalInfo,
                            bio: e.target.value
                          }
                        })}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                        placeholder="Brief professional background and qualifications..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Medical Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Heart className="mr-2 text-red-500" size={20} />
                  Medical Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blood Group
                    </label>
                    <select
                      value={newMember.medicalInfo.bloodGroup}
                      onChange={(e) => setNewMember({
                        ...newMember, 
                        medicalInfo: {...newMember.medicalInfo, bloodGroup: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ferritin
                    </label>
                    <input
                      type="text"
                      value={newMember.medicalInfo.ferritin}
                      onChange={(e) => setNewMember({
                        ...newMember, 
                        medicalInfo: {...newMember.medicalInfo, ferritin: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Ferritin levels"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      B12
                    </label>
                    <input
                      type="text"
                      value={newMember.medicalInfo.b12}
                      onChange={(e) => setNewMember({
                        ...newMember, 
                        medicalInfo: {...newMember.medicalInfo, b12: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="B12 levels"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vitamin D
                    </label>
                    <input
                      type="text"
                      value={newMember.medicalInfo.vitaminD}
                      onChange={(e) => setNewMember({
                        ...newMember, 
                        medicalInfo: {...newMember.medicalInfo, vitaminD: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Vitamin D levels"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pap Smear
                    </label>
                    <input
                      type="text"
                      value={newMember.medicalInfo.papSmear}
                      onChange={(e) => setNewMember({
                        ...newMember, 
                        medicalInfo: {...newMember.medicalInfo, papSmear: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Pap smear results/date"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Memogram
                    </label>
                    <input
                      type="text"
                      value={newMember.medicalInfo.memogram}
                      onChange={(e) => setNewMember({
                        ...newMember, 
                        medicalInfo: {...newMember.medicalInfo, memogram: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Memogram results/date"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Allergies
                    </label>
                    <textarea
                      value={newMember.medicalInfo.allergies}
                      onChange={(e) => setNewMember({
                        ...newMember, 
                        medicalInfo: {...newMember.medicalInfo, allergies: e.target.value}
                      })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Any known allergies..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Medications
                    </label>
                    <textarea
                      value={newMember.medicalInfo.medications}
                      onChange={(e) => setNewMember({
                        ...newMember, 
                        medicalInfo: {...newMember.medicalInfo, medications: e.target.value}
                      })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Current medications..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      value={newMember.medicalInfo.emergencyContactName}
                      onChange={(e) => setNewMember({
                        ...newMember, 
                        medicalInfo: {...newMember.medicalInfo, emergencyContactName: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Emergency contact name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={newMember.medicalInfo.emergencyContactPhone}
                      onChange={(e) => setNewMember({
                        ...newMember, 
                        medicalInfo: {...newMember.medicalInfo, emergencyContactPhone: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Emergency contact phone"
                    />
                  </div>
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
                  <span>Add Member</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {showEditModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Edit Member</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedMember(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-8">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="mr-2 text-[#F25274]" size={20} />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={newMember.name}
                      onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={newMember.phone}
                      onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      value={newMember.dateOfBirth}
                      onChange={(e) => setNewMember({...newMember, dateOfBirth: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Member Type *
                    </label>
                    <select
                      value={newMember.memberType}
                      onChange={(e) => setNewMember({...newMember, memberType: e.target.value as 'Member' | 'Teacher' | 'Volunteer'})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    >
                      {memberTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Membership Level *
                    </label>
                    <select
                      value={newMember.membershipLevel}
                      onChange={(e) => setNewMember({...newMember, membershipLevel: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    >
                      {membershipLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      T-Shirt Size *
                    </label>
                    <select
                      value={newMember.tshirtSize}
                      onChange={(e) => setNewMember({...newMember, tshirtSize: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      required
                    >
                      {tshirtSizes.map(size => (
                        <option key={size.value} value={size.value}>{size.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      value={newMember.address}
                      onChange={(e) => setNewMember({...newMember, address: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Referral Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="mr-2 text-[#6CBFC4]" size={20} />
                  Referral Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Referred By Name
                    </label>
                    <input
                      type="text"
                      value={newMember.referredByName}
                      onChange={(e) => setNewMember({...newMember, referredByName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Name of the person who referred"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Referred By Phone Number
                    </label>
                    <input
                      type="tel"
                      value={newMember.referredByPhone}
                      onChange={(e) => setNewMember({...newMember, referredByPhone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Phone number of referrer"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information - Only for Teachers/Volunteers */}
              {(newMember.memberType === 'Teacher' || newMember.memberType === 'Volunteer') && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Briefcase className="mr-2 text-[#F3E682]" size={20} />
                    Professional Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specialization
                      </label>
                      <input
                        type="text"
                        value={newMember.professionalInfo.specialization}
                        onChange={(e) => setNewMember({
                          ...newMember, 
                          professionalInfo: {
                            ...newMember.professionalInfo,
                            specialization: e.target.value
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                        placeholder="e.g., Hatha Yoga, Vinyasa, Meditation"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Experience
                      </label>
                      <input
                        type="text"
                        value={newMember.professionalInfo.experience}
                        onChange={(e) => setNewMember({
                          ...newMember, 
                          professionalInfo: {
                            ...newMember.professionalInfo,
                            experience: e.target.value
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                        placeholder="e.g., 5 years, Beginner, Advanced"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        value={newMember.professionalInfo.bio}
                        onChange={(e) => setNewMember({
                          ...newMember, 
                          professionalInfo: {
                            ...newMember.professionalInfo,
                            bio: e.target.value
                          }
                        })}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                        placeholder="Brief professional background and qualifications..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Medical Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Heart className="mr-2 text-red-500" size={20} />
                  Medical Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blood Group
                    </label>
                    <select
                      value={newMember.medicalInfo.bloodGroup}
                      onChange={(e) => setNewMember({
                        ...newMember, 
                        medicalInfo: {...newMember.medicalInfo, bloodGroup: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ferritin
                    </label>
                    <input
                      type="text"
                      value={newMember.medicalInfo.ferritin}
                      onChange={(e) => setNewMember({
                        ...newMember, 
                        medicalInfo: {...newMember.medicalInfo, ferritin: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Ferritin levels"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      B12
                    </label>
                    <input
                      type="text"
                      value={newMember.medicalInfo.b12}
                      onChange={(e) => setNewMember({
                        ...newMember, 
                        medicalInfo: {...newMember.medicalInfo, b12: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="B12 levels"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vitamin D
                    </label>
                    <input
                      type="text"
                      value={newMember.medicalInfo.vitaminD}
                      onChange={(e) => setNewMember({
                        ...newMember, 
                        medicalInfo: {...newMember.medicalInfo, vitaminD: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Vitamin D levels"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pap Smear
                    </label>
                    <input
                      type="text"
                      value={newMember.medicalInfo.papSmear}
                      onChange={(e) => setNewMember({
                        ...newMember, 
                        medicalInfo: {...newMember.medicalInfo, papSmear: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Pap smear results/date"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Memogram
                    </label>
                    <input
                      type="text"
                      value={newMember.medicalInfo.memogram}
                      onChange={(e) => setNewMember({
                        ...newMember, 
                        medicalInfo: {...newMember.medicalInfo, memogram: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Memogram results/date"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Allergies
                    </label>
                    <textarea
                      value={newMember.medicalInfo.allergies}
                      onChange={(e) => setNewMember({
                        ...newMember, 
                        medicalInfo: {...newMember.medicalInfo, allergies: e.target.value}
                      })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Any known allergies..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Medications
                    </label>
                    <textarea
                      value={newMember.medicalInfo.medications}
                      onChange={(e) => setNewMember({
                        ...newMember, 
                        medicalInfo: {...newMember.medicalInfo, medications: e.target.value}
                      })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Current medications..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      value={newMember.medicalInfo.emergencyContactName}
                      onChange={(e) => setNewMember({
                        ...newMember, 
                        medicalInfo: {...newMember.medicalInfo, emergencyContactName: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Emergency contact name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={newMember.medicalInfo.emergencyContactPhone}
                      onChange={(e) => setNewMember({
                        ...newMember, 
                        medicalInfo: {...newMember.medicalInfo, emergencyContactPhone: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      placeholder="Emergency contact phone"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedMember(null);
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
                  <span>Update Member</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;