import React, { useState, useEffect } from "react";
import { Cell, BarChart, LineChart, PieChart, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from "recharts";
import { Calendar, Clock, Filter, Info, Download, RefreshCw, ChevronDown } from "lucide-react";
import NetworkBackground from './NetworkBackground';
import Navbar from './Navbar';

const StatCard = ({ title, value, icon, change, changeType }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-6 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
        </div>
        <div className="p-3 bg-slate-700 rounded-lg">
          {icon}
        </div>
      </div>
      <div className={`text-sm flex items-center ${
        changeType === "positive" ? "text-green-400" : 
        changeType === "negative" ? "text-red-400" : 
        "text-gray-400"
      }`}>
        {changeType === "positive" && "↑ "}
        {changeType === "negative" && "↓ "}
        {change}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState("7d");
  const [contentTypeFilter, setContentTypeFilter] = useState("all");
  
  const detectionHistory = [
    { date: "May 1", textAnalysis: 54, imageAnalysis: 28 },
    { date: "May 2", textAnalysis: 43, imageAnalysis: 32 },
    { date: "May 3", textAnalysis: 65, imageAnalysis: 41 },
    { date: "May 4", textAnalysis: 58, imageAnalysis: 38 },
    { date: "May 5", textAnalysis: 72, imageAnalysis: 43 }
  ];

  const detectionResults = [
    { name: "Fake News", value: 235, color: "#ef4444" },
    { name: "Real News", value: 452, color: "#10b981" },
    { name: "Deepfake", value: 145, color: "#f59e0b" },
    { name: "Authentic Images", value: 327, color: "#3b82f6" }
  ];

  const accuracyData = [
    { name: "Text Detection", accuracy: 94, history: 87 },
    { name: "Image Detection", accuracy: 89, history: 82 },
    { name: "Combined", accuracy: 92, history: 85 }
  ];

  const recentDetections = [
    { 
      id: "det-001", 
      type: "text", 
      title: "Global Economic Report Analysis", 
      result: "Fake", 
      confidence: 96,
      timestamp: "10 min ago" 
    },
    { 
      id: "det-002", 
      type: "image", 
      title: "Political Figure Photo", 
      result: "Deepfake", 
      confidence: 92,
      timestamp: "35 min ago" 
    },
    { 
      id: "det-003", 
      type: "text", 
      title: "Technology Breakthrough News", 
      result: "Real", 
      confidence: 89,
      timestamp: "1 hour ago" 
    },
    { 
      id: "det-004", 
      type: "image", 
      title: "Celebrity Interview Screenshot", 
      result: "Authentic", 
      confidence: 97,
      timestamp: "2 hours ago" 
    },
    { 
      id: "det-005", 
      type: "text", 
      title: "Health Advisory Report", 
      result: "Fake", 
      confidence: 95,
      timestamp: "5 hours ago" 
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-slate-900 text-white relative">
      <div className="absolute inset-0 z-0">
        <NetworkBackground />
      </div>
      
      <div className="relative z-10">
        <Navbar />
        
        <div className="container mx-auto p-6">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-teal-400">Analytics Dashboard</h1>
              <p className="text-gray-400 mt-1">Monitor detection metrics and activity</p>
            </div>
            
            <div className="flex gap-4">
              <div className="relative">
                <button className="bg-slate-800 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{timeFilter === "7d" ? "Last 7 Days" : 
                         timeFilter === "30d" ? "Last 30 Days" : 
                         timeFilter === "90d" ? "Last 90 Days" : "Custom Range"}</span>
                  <ChevronDown size={16} />
                </button>
              </div>
              
              <button className="bg-slate-800 text-teal-400 p-2 rounded-lg">
                <RefreshCw size={20} />
              </button>
              
              <button className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Download size={16} />
                <span>Export Data</span>
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Analyses" 
              value="1,159" 
              icon={<Filter size={24} className="text-teal-400" />}
              change="12% from last week"
              changeType="positive"
            />
            <StatCard 
              title="Fake Content Detected" 
              value="380" 
              icon={<Info size={24} className="text-red-400" />}
              change="8% from last week"
              changeType="positive"
            />
            <StatCard 
              title="Accuracy Rate" 
              value="94.2%" 
              icon={<RefreshCw size={24} className="text-blue-400" />}
              change="2.1% improvement"
              changeType="positive"
            />
            <StatCard 
              title="Avg. Processing Time" 
              value="1.8s" 
              icon={<Clock size={24} className="text-purple-400" />}
              change="0.3s faster"
              changeType="positive"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Detection Activity</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={detectionHistory}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f8fafc' }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="textAnalysis" 
                      name="Text Analysis" 
                      stroke="#14b8a6" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="imageAnalysis" 
                      name="Image Analysis" 
                      stroke="#8b5cf6" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Detection Results</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={detectionResults}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                    >
                      {detectionResults.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f8fafc' }}
                      formatter={(value, name) => [`${value} analyses`, name]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium mb-4">Model Accuracy</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={accuracyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f8fafc' }}
                    formatter={(value) => [`${value}%`, 'Accuracy']}
                  />
                  <Legend />
                  <Bar 
                    dataKey="accuracy" 
                    name="Current Accuracy" 
                    fill="#14b8a6" 
                  />
                  <Bar 
                    dataKey="history" 
                    name="Previous Month" 
                    fill="#64748b" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-700">
              <h3 className="text-lg font-medium">Recent Detections</h3>
              <button className="text-teal-400 text-sm flex items-center gap-1">
                View All
                <ChevronDown size={14} />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-700/50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Content</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Result</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Confidence</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {recentDetections.map((detection) => (
                    <tr key={detection.id} className="hover:bg-slate-700/30">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{detection.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          detection.type === "text" ? "bg-teal-500/20 text-teal-300" : "bg-purple-500/20 text-purple-300"
                        }`}>
                          {detection.type === "text" ? "Text" : "Image"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{detection.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          detection.result === "Fake" || detection.result === "Deepfake" 
                            ? "bg-red-500/20 text-red-300" 
                            : "bg-green-500/20 text-green-300"
                        }`}>
                          {detection.result}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{detection.confidence}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{detection.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;