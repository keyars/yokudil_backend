import React, { useState } from 'react';
import { mockAwards, mockMembers } from '../data/mockData';
import { Award, Plus, Edit, Trash2, Trophy, Star, Medal, X, Save, User, Calendar, FileText, Search, Filter } from 'lucide-react';

interface AwardData {
  id: string;
  title: string;
  recipient: string;
  recipientType: 'member' | 'teacher';
  date: string;
  reason: string;
  awardedBy: string;
}

const Awards: React.FC = () => {
  const [awards, setAwards] = useState<AwardData[]>(mockAwards as AwardData[]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAward, setSelectedAward] = useState<AwardData | null>(null);
  const [filterType, setFilterType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [newAward, setNewAward] = useState({
    title: '',
    recipient: '',
    recipientType: 'member' as 'member' | 'teacher',
    date: '',
    reason: ''
  });

  // Get available recipients based on type
  const getRecipients = () => {
    if (newAward.recipientType === 'member') {
      return mockMembers.map(member => ({ id: member.id, name: member.name }));
    } else {
      // Mock teachers data
      return [
        { id: 'T001', name: 'Priya Sharma' },
        { id: 'T002', name: 'Anita Krishnan' },
        { id: 'T003', name: 'Meera Nair' },
        { id: 'T004', name: 'Lakshmi Devi' }
      ];
    }
  };

  const resetForm = () => {
    setNewAward({
      title: '',
      recipient: '',
      recipientType: 'member',
      date: '',
      reason: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const awardData: AwardData = {
      id: `AW${String(awards.length + 1).padStart(3, '0')}`,
      ...newAward,
      awardedBy: 'Current Admin'
    };

    setAwards([...awards, awardData]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = (award: AwardData) => {
    setSelectedAward(award);
    setNewAward({
      title: award.title,
      recipient: award.recipient,
      recipientType: award.recipientType,
      date: award.date,
      reason: award.reason
    });
    setShowEditModal(true);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAward) return;

    const updatedAwards = awards.map(award => 
      award.id === selectedAward.id 
        ? { ...award, ...newAward, awardedBy: award.awardedBy }
        : award
    );

    setAwards(updatedAwards);
    setShowEditModal(false);
    setSelectedAward(null);
    resetForm();
  };

  const handleDelete = (awardId: string) => {
    if (window.confirm('Are you sure you want to delete this award?')) {
      setAwards(awards.filter(award => award.id !== awardId));
    }
  };

  const getAwardIcon = (title: string) => {
    if (title.toLowerCase().includes('perfect') || title.toLowerCase().includes('attendance')) return Trophy;
    if (title.toLowerCase().includes('improved') || title.toLowerCase().includes('progress')) return Star;
    if (title.toLowerCase().includes('achievement') || title.toLowerCase().includes('excellence')) return Medal;
    return Award;
  };

  const getAwardColor = (index: number) => {
    const colors = ['bg-yellow-500', 'bg-[#F25274]', 'bg-[#6CBFC4]', 'bg-[#F3E682]', 'bg-purple-500', 'bg-green-500'];
    return colors[index % colors.length];
  };

  // Filter awards
  const filteredAwards = awards.filter(award => {
    const matchesType = filterType === '' || award.recipientType === filterType;
    const matchesSearch = searchTerm === '' || 
      award.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      award.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      award.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Awards Management</h1>
          <p className="text-gray-600 mt-1">Recognize and celebrate achievements</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-[#F25274] text-white rounded-lg hover:bg-[#F25274]/90"
        >
          <Plus size={16} />
          <span>Create Award</span>
        </button>
      </div>

      {/* Awards Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Awards</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{awards.length}</p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-full">
              <Award size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Member Awards</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {awards.filter(a => a.recipientType === 'member').length}
              </p>
            </div>
            <div className="bg-[#F25274] p-3 rounded-full">
              <User size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Teacher Awards</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {awards.filter(a => a.recipientType === 'teacher').length}
              </p>
            </div>
            <div className="bg-[#6CBFC4] p-3 rounded-full">
              <Trophy size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">5</p>
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
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search awards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
          >
            <option value="">All Recipients</option>
            <option value="member">Members</option>
            <option value="teacher">Teachers</option>
          </select>
          
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter size={16} />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Awards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAwards.map((award, index) => {
          const IconComponent = getAwardIcon(award.title);
          const colorClass = getAwardColor(index);
          
          return (
            <div key={award.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${colorClass} p-3 rounded-full`}>
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <button 
                      onClick={() => handleEdit(award)}
                      className="p-1 text-gray-400 hover:text-[#6CBFC4]"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(award.id)}
                      className="p-1 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">{award.title}</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Recipient:</span>
                      <span className="font-medium text-gray-900">{award.recipient}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                        award.recipientType === 'member' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {award.recipientType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium text-gray-900">{award.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Awarded by:</span>
                      <span className="font-medium text-gray-900">{award.awardedBy}</span>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600 leading-relaxed">{award.reason}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Award Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Create New Award</h2>
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
                    Award Title *
                  </label>
                  <input
                    type="text"
                    value={newAward.title}
                    onChange={(e) => setNewAward({...newAward, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    placeholder="e.g., Perfect Attendance Award"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient Type *
                  </label>
                  <select
                    value={newAward.recipientType}
                    onChange={(e) => setNewAward({...newAward, recipientType: e.target.value as 'member' | 'teacher', recipient: ''})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    required
                  >
                    <option value="member">Member</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient *
                  </label>
                  <select
                    value={newAward.recipient}
                    onChange={(e) => setNewAward({...newAward, recipient: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    required
                  >
                    <option value="">Select {newAward.recipientType}</option>
                    {getRecipients().map(recipient => (
                      <option key={recipient.id} value={recipient.name}>{recipient.name}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Award Date *
                  </label>
                  <input
                    type="date"
                    value={newAward.date}
                    onChange={(e) => setNewAward({...newAward, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason/Note
                  </label>
                  <textarea
                    value={newAward.reason}
                    onChange={(e) => setNewAward({...newAward, reason: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    placeholder="Optional reason or note for this award..."
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
                  <span>Create Award</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Award Modal */}
      {showEditModal && selectedAward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Edit Award</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedAward(null);
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
                    Award Title *
                  </label>
                  <input
                    type="text"
                    value={newAward.title}
                    onChange={(e) => setNewAward({...newAward, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    placeholder="e.g., Perfect Attendance Award"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient Type *
                  </label>
                  <select
                    value={newAward.recipientType}
                    onChange={(e) => setNewAward({...newAward, recipientType: e.target.value as 'member' | 'teacher', recipient: ''})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    required
                  >
                    <option value="member">Member</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient *
                  </label>
                  <select
                    value={newAward.recipient}
                    onChange={(e) => setNewAward({...newAward, recipient: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    required
                  >
                    <option value="">Select {newAward.recipientType}</option>
                    {getRecipients().map(recipient => (
                      <option key={recipient.id} value={recipient.name}>{recipient.name}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Award Date *
                  </label>
                  <input
                    type="date"
                    value={newAward.date}
                    onChange={(e) => setNewAward({...newAward, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason/Note
                  </label>
                  <textarea
                    value={newAward.reason}
                    onChange={(e) => setNewAward({...newAward, reason: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    placeholder="Optional reason or note for this award..."
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedAward(null);
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
                  <span>Update Award</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Awards;