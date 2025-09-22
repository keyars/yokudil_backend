import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database, 
  Mail, 
  Globe, 
  Calendar, 
  Clock, 
  Save, 
  Upload, 
  Download,
  Eye,
  EyeOff,
  Check,
  X,
  AlertCircle,
  Info
} from 'lucide-react';

interface SettingsData {
  profile: {
    organizationName: string;
    email: string;
    phone: string;
    address: string;
    website: string;
    logo: string;
  };
  notifications: {
    emailNotifications: boolean;
    classReminders: boolean;
    attendanceAlerts: boolean;
    membershipExpiry: boolean;
    eventUpdates: boolean;
    systemUpdates: boolean;
  };
  system: {
    timezone: string;
    dateFormat: string;
    timeFormat: string;
    language: string;
    currency: string;
    autoBackup: boolean;
    backupFrequency: string;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireNumbers: boolean;
      requireSymbols: boolean;
    };
    loginAttempts: number;
  };
  appearance: {
    theme: string;
    primaryColor: string;
    fontSize: string;
    compactMode: boolean;
  };
  integrations: {
    zoomEnabled: boolean;
    zoomApiKey: string;
    emailProvider: string;
    emailApiKey: string;
    smsProvider: string;
    smsApiKey: string;
  };
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'system' | 'security' | 'appearance' | 'integrations'>('profile');
  const [showApiKeys, setShowApiKeys] = useState<{[key: string]: boolean}>({});
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const [settings, setSettings] = useState<SettingsData>({
    profile: {
      organizationName: 'YoKudil Yoga Center',
      email: 'admin@yokudil.com',
      phone: '+91 98765 43210',
      address: '123 Yoga Street, Wellness City, State 12345',
      website: 'https://yokudil.com',
      logo: '/yogamum_valkkaiyum_logo.png'
    },
    notifications: {
      emailNotifications: true,
      classReminders: true,
      attendanceAlerts: true,
      membershipExpiry: true,
      eventUpdates: true,
      systemUpdates: false
    },
    system: {
      timezone: 'Asia/Kolkata',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '12h',
      language: 'English',
      currency: 'INR',
      autoBackup: true,
      backupFrequency: 'daily'
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireNumbers: true,
        requireSymbols: false
      },
      loginAttempts: 5
    },
    appearance: {
      theme: 'light',
      primaryColor: '#F25274',
      fontSize: 'medium',
      compactMode: false
    },
    integrations: {
      zoomEnabled: true,
      zoomApiKey: 'zoom_api_key_hidden',
      emailProvider: 'smtp',
      emailApiKey: 'email_api_key_hidden',
      smsProvider: 'twilio',
      smsApiKey: 'sms_api_key_hidden'
    }
  });

  const updateSettings = (section: keyof SettingsData, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setUnsavedChanges(true);
  };

  const updateNestedSettings = (section: keyof SettingsData, nestedField: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedField]: {
          ...(prev[section] as any)[nestedField],
          [field]: value
        }
      }
    }));
    setUnsavedChanges(true);
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSaveStatus('saved');
      setUnsavedChanges(false);
      
      setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    }
  };

  const toggleApiKeyVisibility = (key: string) => {
    setShowApiKeys(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const tabs = [
    { id: 'profile', name: 'Organization Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'system', name: 'System', icon: Database },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'integrations', name: 'Integrations', icon: Globe }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your yoga center configuration and preferences</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSave}
            disabled={!unsavedChanges || saveStatus === 'saving'}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              unsavedChanges
                ? 'bg-[#F25274] text-white hover:bg-[#F25274]/90'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {saveStatus === 'saving' ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : saveStatus === 'saved' ? (
              <>
                <Check size={16} />
                <span>Saved</span>
              </>
            ) : saveStatus === 'error' ? (
              <>
                <X size={16} />
                <span>Error</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Unsaved Changes Warning */}
      {unsavedChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle size={16} className="text-yellow-600" />
            <span className="text-sm text-yellow-800">You have unsaved changes. Don't forget to save your settings.</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-[#F25274] text-[#F25274]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon size={16} />
                    <span>{tab.name}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Organization Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Organization Profile</h2>
                <p className="text-sm text-gray-600 mb-6">Update your yoga center's basic information and branding.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    value={settings.profile.organizationName}
                    onChange={(e) => updateSettings('profile', 'organizationName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => updateSettings('profile', 'email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={settings.profile.phone}
                    onChange={(e) => updateSettings('profile', 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={settings.profile.website}
                    onChange={(e) => updateSettings('profile', 'website', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    value={settings.profile.address}
                    onChange={(e) => updateSettings('profile', 'address', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Logo
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                      src={settings.profile.logo} 
                      alt="Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Upload New Logo
                    </button>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB. Recommended: 200x200px</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
                <p className="text-sm text-gray-600 mb-6">Configure when and how you receive notifications.</p>
              </div>

              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {key === 'emailNotifications' && 'Receive general email notifications'}
                        {key === 'classReminders' && 'Get reminders before classes start'}
                        {key === 'attendanceAlerts' && 'Alerts for attendance-related events'}
                        {key === 'membershipExpiry' && 'Notifications when memberships are about to expire'}
                        {key === 'eventUpdates' && 'Updates about upcoming events and workshops'}
                        {key === 'systemUpdates' && 'System maintenance and update notifications'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => updateSettings('notifications', key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F25274]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F25274]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">System Configuration</h2>
                <p className="text-sm text-gray-600 mb-6">Configure system-wide settings and preferences.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={settings.system.timezone}
                    onChange={(e) => updateSettings('system', 'timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                    <option value="Australia/Sydney">Australia/Sydney (AEST)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Format
                  </label>
                  <select
                    value={settings.system.dateFormat}
                    onChange={(e) => updateSettings('system', 'dateFormat', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Format
                  </label>
                  <select
                    value={settings.system.timeFormat}
                    onChange={(e) => updateSettings('system', 'timeFormat', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                  >
                    <option value="12h">12 Hour (AM/PM)</option>
                    <option value="24h">24 Hour</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={settings.system.language}
                    onChange={(e) => updateSettings('system', 'language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    value={settings.system.currency}
                    onChange={(e) => updateSettings('system', 'currency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                  >
                    <option value="INR">Indian Rupee (₹)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                    <option value="GBP">British Pound (£)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Backup Frequency
                  </label>
                  <select
                    value={settings.system.backupFrequency}
                    onChange={(e) => updateSettings('system', 'backupFrequency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Automatic Backup</h3>
                  <p className="text-sm text-gray-600">Automatically backup your data at scheduled intervals</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.system.autoBackup}
                    onChange={(e) => updateSettings('system', 'autoBackup', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F25274]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F25274]"></div>
                </label>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h2>
                <p className="text-sm text-gray-600 mb-6">Configure security policies and authentication settings.</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) => updateSettings('security', 'twoFactorAuth', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F25274]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F25274]"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => updateSettings('security', 'sessionTimeout', parseInt(e.target.value))}
                      min="5"
                      max="480"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Login Attempts
                    </label>
                    <input
                      type="number"
                      value={settings.security.loginAttempts}
                      onChange={(e) => updateSettings('security', 'loginAttempts', parseInt(e.target.value))}
                      min="3"
                      max="10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-4">Password Policy</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Length
                      </label>
                      <input
                        type="number"
                        value={settings.security.passwordPolicy.minLength}
                        onChange={(e) => updateNestedSettings('security', 'passwordPolicy', 'minLength', parseInt(e.target.value))}
                        min="6"
                        max="20"
                        className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={settings.security.passwordPolicy.requireUppercase}
                          onChange={(e) => updateNestedSettings('security', 'passwordPolicy', 'requireUppercase', e.target.checked)}
                          className="h-4 w-4 text-[#F25274] focus:ring-[#F25274] border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Require uppercase letters</span>
                      </label>

                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={settings.security.passwordPolicy.requireNumbers}
                          onChange={(e) => updateNestedSettings('security', 'passwordPolicy', 'requireNumbers', e.target.checked)}
                          className="h-4 w-4 text-[#F25274] focus:ring-[#F25274] border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Require numbers</span>
                      </label>

                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={settings.security.passwordPolicy.requireSymbols}
                          onChange={(e) => updateNestedSettings('security', 'passwordPolicy', 'requireSymbols', e.target.checked)}
                          className="h-4 w-4 text-[#F25274] focus:ring-[#F25274] border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Require special characters</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Appearance Settings</h2>
                <p className="text-sm text-gray-600 mb-6">Customize the look and feel of your application.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Theme
                  </label>
                  <select
                    value={settings.appearance.theme}
                    onChange={(e) => updateSettings('appearance', 'theme', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Size
                  </label>
                  <select
                    value={settings.appearance.fontSize}
                    onChange={(e) => updateSettings('appearance', 'fontSize', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={settings.appearance.primaryColor}
                      onChange={(e) => updateSettings('appearance', 'primaryColor', e.target.value)}
                      className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.appearance.primaryColor}
                      onChange={(e) => updateSettings('appearance', 'primaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Compact Mode</h3>
                  <p className="text-sm text-gray-600">Use smaller spacing and components for more content</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.appearance.compactMode}
                    onChange={(e) => updateSettings('appearance', 'compactMode', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F25274]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F25274]"></div>
                </label>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Preview</h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: settings.appearance.primaryColor }}
                    ></div>
                    <span className="font-medium">Sample Header</span>
                  </div>
                  <p className={`text-gray-600 ${settings.appearance.fontSize === 'small' ? 'text-sm' : settings.appearance.fontSize === 'large' ? 'text-lg' : 'text-base'}`}>
                    This is how your content will appear with the current settings.
                  </p>
                  <button 
                    className="mt-3 px-4 py-2 rounded-lg text-white text-sm"
                    style={{ backgroundColor: settings.appearance.primaryColor }}
                  >
                    Sample Button
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Third-party Integrations</h2>
                <p className="text-sm text-gray-600 mb-6">Configure external services and API integrations.</p>
              </div>

              <div className="space-y-6">
                {/* Zoom Integration */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Globe size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Zoom Integration</h3>
                        <p className="text-sm text-gray-600">Enable online classes with Zoom meetings</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.integrations.zoomEnabled}
                        onChange={(e) => updateSettings('integrations', 'zoomEnabled', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F25274]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F25274]"></div>
                    </label>
                  </div>
                  
                  {settings.integrations.zoomEnabled && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Zoom API Key
                      </label>
                      <div className="relative">
                        <input
                          type={showApiKeys.zoom ? "text" : "password"}
                          value={settings.integrations.zoomApiKey}
                          onChange={(e) => updateSettings('integrations', 'zoomApiKey', e.target.value)}
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                          placeholder="Enter your Zoom API key"
                        />
                        <button
                          type="button"
                          onClick={() => toggleApiKeyVisibility('zoom')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showApiKeys.zoom ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Email Integration */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Mail size={20} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Email Service</h3>
                      <p className="text-sm text-gray-600">Configure email notifications and communications</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Provider
                      </label>
                      <select
                        value={settings.integrations.emailProvider}
                        onChange={(e) => updateSettings('integrations', 'emailProvider', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      >
                        <option value="smtp">SMTP</option>
                        <option value="sendgrid">SendGrid</option>
                        <option value="mailgun">Mailgun</option>
                        <option value="ses">Amazon SES</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        API Key
                      </label>
                      <div className="relative">
                        <input
                          type={showApiKeys.email ? "text" : "password"}
                          value={settings.integrations.emailApiKey}
                          onChange={(e) => updateSettings('integrations', 'emailApiKey', e.target.value)}
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                          placeholder="Enter API key"
                        />
                        <button
                          type="button"
                          onClick={() => toggleApiKeyVisibility('email')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showApiKeys.email ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SMS Integration */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Bell size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">SMS Service</h3>
                      <p className="text-sm text-gray-600">Send SMS notifications and reminders</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMS Provider
                      </label>
                      <select
                        value={settings.integrations.smsProvider}
                        onChange={(e) => updateSettings('integrations', 'smsProvider', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                      >
                        <option value="twilio">Twilio</option>
                        <option value="nexmo">Nexmo</option>
                        <option value="textlocal">TextLocal</option>
                        <option value="msg91">MSG91</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        API Key
                      </label>
                      <div className="relative">
                        <input
                          type={showApiKeys.sms ? "text" : "password"}
                          value={settings.integrations.smsApiKey}
                          onChange={(e) => updateSettings('integrations', 'smsApiKey', e.target.value)}
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F25274] focus:border-transparent"
                          placeholder="Enter API key"
                        />
                        <button
                          type="button"
                          onClick={() => toggleApiKeyVisibility('sms')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showApiKeys.sms ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info size={16} className="text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Integration Security</p>
                    <p>API keys are encrypted and stored securely. Never share your API keys with unauthorized users.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;