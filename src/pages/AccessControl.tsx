import React, { useState } from 'react';
import { mockUsers } from '../data/mockUsers';
import { Shield, Users, Key, Settings, Plus, Edit, Trash2, Lock, X, Save, Search, Filter, UserPlus, UserMinus, CheckCircle, AlertCircle } from 'lucide-react';

interface User {
  id: number;
  email: string;
  password: string;
  role: string;
  name: string;
  permissions: string[];
  status: 'Active' | 'Inactive' | 'Suspended';
  lastLogin?: string;
  createdDate: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  color: string;
  isSystem: boolean;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  isSystem: boolean;
}

const AccessControl: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
  const [users, setUsers] = useState<User[]>(mockUsers.map(user => ({
    ...user,
    status: 'Active' as const,
    createdDate: '2025-01-01',
    lastLogin: '2025-01-15'
  })));

  // Modal states
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [showAddPermissionModal, setShowAddPermissionModal] = useState(false);
  const [showEditPermissionModal, setShowEditPermissionModal] = useState(false);
  const [showAssignPermissionsModal, setShowAssignPermissionsModal] = useState(false);

  // Selected items
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);

  // Search and filters
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Form states
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'volunteer',
    status: 'Active' as 'Active' | 'Inactive' | 'Suspended'
  });

  const [newRole, setNewRole] = useState({
    name: '',
    description: ''
  });

  const [newPermission, setNewPermission] = useState({
    name: '',
    description: '',
    category: 'General'
  });

  // Initial data
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'super_admin',
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      permissions: ['all'],
      userCount: users.filter(u => u.role === 'super_admin').length,
      color: 'bg-red-100 text-red-800',
      isSystem: true
    },
    {
      id: 'teacher',
      name: 'Teacher',
      description: 'Teaching and student management access',
      permissions: ['view_members', 'manage_attendance', 'view_classes', 'add_progress_notes', 'view_reports'],
      userCount: users.filter(u => u.role === 'teacher').length,
      color: 'bg-blue-100 text-blue-800',
      isSystem: true
    },
    {
      id: 'volunteer',
      name: 'Volunteer',
      description: 'Limited access for volunteers',
      permissions: ['view_members', 'manage_attendance', 'view_classes', 'add_progress_notes'],
      userCount: users.filter(u => u.role === 'volunteer').length,
      color: 'bg-green-100 text-green-800',
      isSystem: true
    }
  ]);

  const [permissions, setPermissions] = useState<Permission[]>([
    { id: 'all', name: 'All Permissions', description: 'Full system access', category: 'System', isSystem: true },
    { id: 'view_members', name: 'View Members', description: 'View member information', category: 'Members', isSystem: true },
    { id: 'manage_members', name: 'Manage Members', description: 'Add, edit, and delete members', category: 'Members', isSystem: false },
    { id: 'manage_attendance', name: 'Manage Attendance', description: 'Mark and manage attendance', category: 'Attendance', isSystem: true },
    { id: 'view_classes', name: 'View Classes', description: 'View class schedules', category: 'Classes', isSystem: true },
    { id: 'manage_classes', name: 'Manage Classes', description: 'Create and manage classes', category: 'Classes', isSystem: false },
    { id: 'add_progress_notes', name: 'Add Progress Notes', description: 'Add member progress notes', category: 'Members', isSystem: true },
    { id: 'view_reports', name: 'View Reports', description: 'Access reports and analytics', category: 'Reports', isSystem: true },
    { id: 'manage_events', name: 'Manage Events', description: 'Create and manage events', category: 'Events', isSystem: false },
    { id: 'manage_awards', name: 'Manage Awards', description: 'Create and manage awards', category: 'Awards', isSystem: false },
    { id: 'system_settings', name: 'System Settings', description: 'Access system configuration', category: 'System', isSystem: false }
  ]);

  // Helper functions
  const resetUserForm = () => {
    setNewUser({
      name: '',
      email: '',
      password: '',
      role: 'volunteer',
      status: 'Active'
    });
  };

  const resetRoleForm = () => {
    setNewRole({
      name: '',
      description: ''
    });
  };

  const resetPermissionForm = () => {
    setNewPermission({
      name: '',
      description: '',
      category: 'General'
    });
  };

  // User management functions
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData: User = {
      id: Math.max(...users.map(u => u.id)) + 1,
      ...newUser,
      permissions: roles.find(r => r.id === newUser.role)?.permissions || [],
      createdDate: new Date().toISOString().split('T')[0],
      lastLogin: undefined
    };

    setUsers([...users, userData]);
    setShowAddUserModal(false);
    resetUserForm();
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      status: user.status
    });
    setShowEditUserModal(true);
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    const updatedUsers = users.map(user => 
      user.id === selectedUser.id 
        ? { ...user, ...newUser, permissions: roles.find(r => r.id === newUser.role)?.permissions || [] }
        : user
    );

    setUsers(updatedUsers);
    setShowEditUserModal(false);
    setSelectedUser(null);
    resetUserForm();
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleToggleUserStatus = (userId: number) => {
    const updatedUsers = users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' as const }
        : user
    );
    setUsers(updatedUsers);
  };

  // Role management functions
  const handleAddRole = (e: React.FormEvent) => {
    e.preventDefault();
    
    const roleData: Role = {
      id: newRole.name.toLowerCase().replace(/\s+/g, '_'),
      ...newRole,
      permissions: [],
      userCount: 0,
      color: 'bg-purple-100 text-purple-800',
      isSystem: false
    };

    setRoles([...roles, roleData]);
    setShowAddRoleModal(false);
    resetRoleForm();
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setNewRole({
      name: role.name,
      description: role.description
    });
    setShowEditRoleModal(true);
  };

  const handleUpdateRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    const updatedRoles = roles.map(role => 
      role.id === selectedRole.id 
        ? { ...role, ...newRole }
        : role
    );

    setRoles(updatedRoles);
    setShowEditRoleModal(false);
    setSelectedRole(null);
    resetRoleForm();
  };

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (role?.isSystem) {
      alert('Cannot delete system roles');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.id !== roleId));
    }
  };

  // Permission management functions
  const handleAddPermission = (e: React.FormEvent) => {
    e.preventDefault();
    
    const permissionData: Permission = {
      id: newPermission.name.toLowerCase().replace(/\s+/g, '_'),
      ...newPermission,
      isSystem: false
    };

    setPermissions([...permissions, permissionData]);
    setShowAddPermissionModal(false);
    resetPermissionForm();
  };

  const handleEditPermission = (permission: Permission) => {
    setSelectedPermission(permission);
    setNewPermission({
      name: permission.name,
      description: permission.description,
      category: permission.category
    });
    setShowEditPermissionModal(true);
  };

  const handleUpdatePermission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPermission) return;

    const updatedPermissions = permissions.map(permission => 
      permission.id === selectedPermission.id 
        ? { ...permission, ...newPermission }
        : permission
    );

    setPermissions(updatedPermissions);
    setShowEditPermissionModal(false);
    setSelectedPermission(null);
    resetPermissionForm();
  };

  const handleDeletePermission = (permissionId: string) => {
    const permission = permissions.find(p => p.id === permissionId);
    if (permission?.isSystem) {
      alert('Cannot delete system permissions');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this permission?')) {
      setPermissions(permissions.filter(permission => permission.id !== permissionId));
    }
  };

  // Filter functions
  const filteredUsers = users.filter(user => {
    const matchesSearch = userSearch === '' || 
      user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = roleFilter === '' || user.role === roleFilter;
    const matchesStatus = statusFilter === '' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getPermissionsByCategory = () => {
    const categories: {[key: string]: Permission[]} = {};
    permissions.forEach(permission => {
      if (!categories[permission.category]) {
        categories[permission.category] = [];
      }
      categories[permission.category].push(permission);
    });
    return categories;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Access Control Management</h1>
          <p className="text-gray-600 mt-1">Manage user roles, permissions, and system access</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{users.length}</p>
            </div>
            <div className="bg-[#F25274] p-3 rounded-full">
              <Users size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {users.filter(u => u.status === 'Active').length}
              </p>
            </div>
            <div className="bg-green-500 p-3 rounded-full">
              <CheckCircle size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Roles</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{roles.length}</p>
            </div>
            <div className="bg-[#6CBFC4] p-3 rounded-full">
              <Shield size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Custom Roles</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{roles.filter(r => !r.isSystem).length}</p>
            </div>
            <div className="bg-[#F3E682] p-3 rounded-full">
              <Key size={24} className="text-gray-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-[#F25274] text-[#F25274]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users size={16} />
                <span>User Management</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('roles')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'roles'
                  ? 'border-[#F25274] text-[#F25274]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Shield size={16} />
                <span>Role Management</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* User Management Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
                <button 
                  onClick={() => setShowAddUserModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#F25274] text-white rounded-lg hover:bg-[#F25274]/90"
                >
                  <Plus size={16} />
                  <span>Add User</span>
                </button>
              </div>

              {/* User Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                  />
                </div>
                
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                >
                  <option value="">All Roles</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
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

                <div className="text-sm text-gray-600 flex items-center">
                  {filteredUsers.length} of {users.length} users
                </div>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Login
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-[#6CBFC4] rounded-full flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                            user.role === 'super_admin' ? 'bg-red-100 text-red-800' :
                            user.role === 'teacher' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {user.role.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.status === 'Active' ? 'bg-green-100 text-green-800' :
                            user.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.lastLogin || 'Never'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleEditUser(user)}
                              className="text-[#6CBFC4] hover:text-[#6CBFC4]/80 p-1"
                              title="Edit User"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleToggleUserStatus(user.id)}
                              className={`p-1 ${user.status === 'Active' ? 'text-orange-600 hover:text-orange-800' : 'text-green-600 hover:text-green-800'}`}
                              title={user.status === 'Active' ? 'Deactivate User' : 'Activate User'}
                            >
                              {user.status === 'Active' ? <UserMinus size={16} /> : <UserPlus size={16} />}
                            </button>
                            <button 
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Delete User"
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
          )}

          {/* Role Management Tab */}
          {activeTab === 'roles' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Role Management</h2>
                <p className="text-sm text-gray-600 mt-1">Manage permissions for system roles</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roles.map((role) => (
                  <div key={role.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                          {role.isSystem && (
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              System
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                        <div className="text-xs text-gray-500">
                          {role.permissions.length} permissions • {role.userCount} users
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button 
                          onClick={() => handleEditRole(role)}
                          className="p-1 text-gray-400 hover:text-[#6CBFC4]"
                          title="Edit Role"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${role.color}`}>
                        {role.userCount} users
                      </span>
                      <button 
                        onClick={() => {
                          setSelectedRole(role);
                          setShowAssignPermissionsModal(true);
                        }}
                        className="text-sm font-medium text-[#F25274] hover:text-[#F25274]/80"
                      >
                        Manage Permissions
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Add New User</h2>
              <button
                onClick={() => {
                  setShowAddUserModal(false);
                  resetUserForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
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
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    required
                  >
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddUserModal(false);
                    resetUserForm();
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
                  <span>Create User</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Edit User</h2>
              <button
                onClick={() => {
                  setShowEditUserModal(false);
                  setSelectedUser(null);
                  resetUserForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
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
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    placeholder="Leave blank to keep current password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    required
                  >
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditUserModal(false);
                    setSelectedUser(null);
                    resetUserForm();
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
                  <span>Update User</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* Edit Role Modal */}
      {showEditRoleModal && selectedRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Edit Role</h2>
              <button
                onClick={() => {
                  setShowEditRoleModal(false);
                  setSelectedRole(null);
                  resetRoleForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleUpdateRole} className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role Name *
                  </label>
                  <input
                    type="text"
                    value={newRole.name}
                    onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    disabled={true}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Role names cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={newRole.description}
                    onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditRoleModal(false);
                    setSelectedRole(null);
                    resetRoleForm();
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
                  <span>Update Role</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Permissions Modal */}
      {showAssignPermissionsModal && selectedRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Manage Permissions - {selectedRole.name}
              </h2>
              <button
                onClick={() => {
                  setShowAssignPermissionsModal(false);
                  setSelectedRole(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Current Permissions</h3>
                <p className="text-sm text-gray-600">
                  Select the permissions that users with this role should have.
                </p>
              </div>

              {Object.entries(getPermissionsByCategory()).map(([category, categoryPermissions]) => (
                <div key={category} className="mb-6">
                  <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-[#F25274] rounded-full mr-2"></span>
                    {category}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-4">
                    {categoryPermissions.map(permission => (
                      <label key={permission.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={selectedRole.permissions.includes(permission.id)}
                          onChange={(e) => {
                            const updatedPermissions = e.target.checked
                              ? [...selectedRole.permissions, permission.id]
                              : selectedRole.permissions.filter(p => p !== permission.id);
                            
                            const updatedRole = { ...selectedRole, permissions: updatedPermissions };
                            setSelectedRole(updatedRole);
                            
                            // Update the roles state
                            setRoles(roles.map(role => 
                              role.id === selectedRole.id ? updatedRole : role
                            ));
                          }}
                          className="h-4 w-4 text-[#F25274] focus:ring-[#F25274] border-gray-300 rounded mt-1"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{permission.name}</div>
                          <div className="text-sm text-gray-600">{permission.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowAssignPermissionsModal(false);
                    setSelectedRole(null);
                  }}
                  className="px-4 py-2 bg-[#F25274] text-white rounded-lg hover:bg-[#F25274]/90"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessControl;