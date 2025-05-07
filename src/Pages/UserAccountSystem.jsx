import React, { useState } from "react";
import { User, Lock, Mail, Settings, History, ChevronRight, LogOut, Check } from "lucide-react";
import NetworkBackground from './NetworkBackground';
import Navbar from './Navbar';

const UserAccountSystem = () => {
  const [activeTab, setActiveTab] = useState("profile"); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [userData] = useState({
    name: "Vansh Seth",
    email: "sethvansh2004@gmail.com",
    joinDate: "March 15, 2025",
    subscription: "Premium"
  });

  const [analysisHistory] = useState([
    {
      id: "an-001",
      type: "text",
      title: "Breaking News Article",
      date: "May 2, 2025",
      result: "Fake",
      confidence: 87
    },
    {
      id: "an-002",
      type: "image",
      title: "Political Figure Image",
      date: "April 29, 2025",
      result: "Deepfake",
      confidence: 92
    },
    {
      id: "an-003",
      type: "text",
      title: "Science Report",
      date: "April 25, 2025",
      result: "True",
      confidence: 95
    },
    {
      id: "an-004",
      type: "image",
      title: "Celebrity Interview",
      date: "April 20, 2025",
      result: "Real",
      confidence: 89
    }
  ]);

  const [userSettings, setUserSettings] = useState({
    darkMode: true,
    emailNotifications: true,
    twoFactorAuth: false,
    saveHistory: true,
    autoAnalysis: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSettingToggle = (setting) => {
    setUserSettings({
      ...userSettings,
      [setting]: !userSettings[setting]
    });
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleLoginSubmit = () => {
    setIsAuthenticated(true);
  };

  const handleRegisterSubmit = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const renderAuthForm = () => {
    if (isRegistering) {
      return (
        
        <div className="pt-20 bg-slate-800 rounded-lg shadow-xl p-8 w-full max-w-md mx-auto">
                <div className="absolute inset-0 z-0">
                  <NetworkBackground />
                </div>
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Create an Account</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1 font-medium">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Your name"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 mb-1 font-medium">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 mb-1 font-medium">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 mb-1 font-medium">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button
              onClick={handleRegisterSubmit}
              className="w-full bg-teal-500 text-white py-3 rounded-md font-semibold hover:bg-teal-600 transition-colors"
            >
              Create Account
            </button>
          </div>
          <p className="text-center mt-6 text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => setIsRegistering(false)}
              className="text-teal-400 hover:underline font-medium"
            >
              Sign In
            </button>
          </p>
        </div>
      );
    } else {
      return (
        <div className="bg-slate-800 rounded-lg shadow-xl p-8 w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign In</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1 font-medium">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 mb-1 font-medium">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-teal-500 focus:ring-teal-500 border-gray-500 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <button className="font-medium text-teal-400 hover:text-teal-300">
                  Forgot password?
                </button>
              </div>
            </div>
            <button
              onClick={handleLoginSubmit}
              className="w-full bg-teal-500 text-white py-3 rounded-md font-semibold hover:bg-teal-600 transition-colors"
            >
              Sign In
            </button>
          </div>
          <p className="text-center mt-6 text-gray-400">
            Don't have an account?{" "}
            <button
              onClick={() => setIsRegistering(true)}
              className="text-teal-400 hover:underline font-medium"
            >
              Create Account
            </button>
          </p>
        </div>
      );
    }
  };

  const renderUserDashboard = () => {
    return (
      <div className="bg-slate-800 rounded-lg shadow-xl overflow-hidden">
        <div className="flex border-b border-slate-700">
          <button
            className={`py-4 px-6 flex items-center gap-2 ${
              activeTab === "profile" ? "bg-slate-700 text-teal-400" : "text-gray-400 hover:bg-slate-700/50"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={18} />
            <span className="font-medium">Profile</span>
          </button>
          <button
            className={`py-4 px-6 flex items-center gap-2 ${
              activeTab === "history" ? "bg-slate-700 text-teal-400" : "text-gray-400 hover:bg-slate-700/50"
            }`}
            onClick={() => setActiveTab("history")}
          >
            <History size={18} />
            <span className="font-medium">Analysis History</span>
          </button>
          <button
            className={`py-4 px-6 flex items-center gap-2 ${
              activeTab === "settings" ? "bg-slate-700 text-teal-400" : "text-gray-400 hover:bg-slate-700/50"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={18} />
            <span className="font-medium">Settings</span>
          </button>
        </div>

        <div className="p-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-20 w-20 rounded-full bg-teal-500 flex items-center justify-center text-white text-2xl font-bold">
                    {userData.name.split(" ").map(part => part[0]).join("")}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-white">{userData.name}</h3>
                    <p className="text-gray-400">{userData.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-300 mb-2">Membership</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-teal-400">{userData.subscription}</span>
                    {userData.subscription === "Premium" && (
                      <span className="px-2 py-1 bg-teal-500/20 text-teal-300 text-xs rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-300 mb-2">Member Since</h4>
                  <p className="text-lg font-bold text-white">{userData.joinDate}</p>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-300 mb-2">Total Analyses</h4>
                  <p className="text-lg font-bold text-white">{analysisHistory.length}</p>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-300 mb-2">Average Confidence</h4>
                  <p className="text-lg font-bold text-white">
                    {Math.round(
                      analysisHistory.reduce((acc, item) => acc + item.confidence, 0) / 
                      analysisHistory.length
                    )}%
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-slate-700 rounded-lg p-4">
                <h4 className="font-medium text-white mb-4">Account Actions</h4>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-3 bg-slate-600 hover:bg-slate-500 rounded-md transition-colors">
                    <span className="text-white">Update Profile Information</span>
                    <ChevronRight size={18} className="text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-slate-600 hover:bg-slate-500 rounded-md transition-colors">
                    <span className="text-white">Change Password</span>
                    <ChevronRight size={18} className="text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-slate-600 hover:bg-slate-500 rounded-md transition-colors">
                    <span className="text-white">Manage Subscription</span>
                    <ChevronRight size={18} className="text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Your Analysis History</h3>
              <div className="space-y-4">
                {analysisHistory.map((item) => (
                  <div key={item.id} className="bg-slate-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-white">{item.title}</h4>
                        <p className="text-sm text-gray-400">Analyzed on {item.date}</p>
                      </div>
                      <span 
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.result === "Fake" || item.result === "Deepfake" 
                            ? "bg-red-500/20 text-red-300" 
                            : "bg-green-500/20 text-green-300"
                        }`}
                      >
                        {item.result}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="text-xs text-gray-400">Confidence:</div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.result === "Fake" || item.result === "Deepfake" 
                              ? "bg-red-500" 
                              : "bg-green-500"
                          }`}
                          style={{ width: `${item.confidence}%` }}
                        ></div>
                      </div>
                      <div className="text-sm font-medium text-white">{item.confidence}%</div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button className="text-teal-400 text-sm hover:underline flex items-center gap-1">
                        View details <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Account Settings</h3>
              
              {showSuccess && (
                <div className="mb-4 bg-teal-500/20 border border-teal-500/50 text-teal-300 p-3 rounded-md flex items-center gap-2">
                  <Check size={18} />
                  <span>Settings saved successfully!</span>
                </div>
              )}
              
              <div className="space-y-4">
                <div className="bg-slate-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">Dark Mode</h4>
                      <p className="text-sm text-gray-400">Use dark theme throughout the application</p>
                    </div>
                    <button 
                      onClick={() => handleSettingToggle("darkMode")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        userSettings.darkMode ? "bg-teal-500" : "bg-slate-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          userSettings.darkMode ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
                
                <div className="bg-slate-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">Email Notifications</h4>
                      <p className="text-sm text-gray-400">Receive updates and alerts via email</p>
                    </div>
                    <button 
                      onClick={() => handleSettingToggle("emailNotifications")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        userSettings.emailNotifications ? "bg-teal-500" : "bg-slate-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          userSettings.emailNotifications ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
                
                <div className="bg-slate-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                    </div>
                    <button 
                      onClick={() => handleSettingToggle("twoFactorAuth")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        userSettings.twoFactorAuth ? "bg-teal-500" : "bg-slate-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          userSettings.twoFactorAuth ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
                
                <div className="bg-slate-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">Save Analysis History</h4>
                      <p className="text-sm text-gray-400">Store your analysis results for future reference</p>
                    </div>
                    <button 
                      onClick={() => handleSettingToggle("saveHistory")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        userSettings.saveHistory ? "bg-teal-500" : "bg-slate-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          userSettings.saveHistory ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
                
                <div className="bg-slate-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">Automatic Analysis</h4>
                      <p className="text-sm text-gray-400">Automatically analyze content when uploaded</p>
                    </div>
                    <button 
                      onClick={() => handleSettingToggle("autoAnalysis")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        userSettings.autoAnalysis ? "bg-teal-500" : "bg-slate-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          userSettings.autoAnalysis ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-900 text-white">
      <Navbar />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-center mb-8">
            {isAuthenticated ? "Your Account" : "Account Access"}
          </h1>
          {isAuthenticated ? renderUserDashboard() : renderAuthForm()}
        </div>
      </div>
      <NetworkBackground />
    </div>
  );
};

export default UserAccountSystem;