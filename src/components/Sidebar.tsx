import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Home,
  Users,
  Calendar,
  CheckSquare,
  BarChart3,
  Star,
  Gift,
  FileText,
  Shield,
  UserCheck,
  X,
  Settings
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, hasPermission } = useAuth();

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, permissions: ['all'] },
    { name: 'Members', href: '/members', icon: Users, permissions: ['view_members', 'all'] },
    { name: 'Teachers/Volunteers', href: '/teachers', icon: UserCheck, permissions: ['all'] },
    { name: 'Classes', href: '/classes', icon: Calendar, permissions: ['view_classes', 'all'] },
    { name: 'Attendance', href: '/attendance', icon: CheckSquare, permissions: ['manage_attendance', 'all'] },
    { name: 'Reports', href: '/reports', icon: BarChart3, permissions: ['view_reports', 'all'] },
    { name: 'Events', href: '/events', icon: Star, permissions: ['all'] },
    { name: 'Awards', href: '/awards', icon: Gift, permissions: ['all'] },
    { name: 'Leave Requests', href: '/leave-requests', icon: FileText, permissions: ['all'] },
    { name: 'Access Control', href: '/access-control', icon: Shield, permissions: ['all'] },
    { name: 'Settings', href: '/settings', icon: Settings, permissions: ['all'] },
  ];

  const visibleItems = menuItems.filter(item => 
    item.permissions.some(permission => hasPermission(permission))
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center justify-center w-full">
            <div className="w-32 h-12 flex items-center justify-center my-2">
              <img 
                src="/yogamum_valkkaiyum_logo.png" 
                alt="Yogamum Valkkaiyum Logo" 
                className="w-full h-full object-contain max-w-none"
              />
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden absolute right-4 top-4 p-2 rounded-md text-gray-500 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {visibleItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => onClose()}
                  className={({ isActive }) =>
                    `group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#F25274] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <Icon size={20} className="mr-3" />
                  {item.name}
                </NavLink>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#6CBFC4] rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {user?.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role.replace('_', ' ')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;