import React, { useState } from "react";
import { Code, Copy, CheckCircle, Terminal, Send, Server, Key, Lock, FileCode, Database, HelpCircle, BookOpen, Info, AlertTriangle } from "lucide-react";
import NetworkBackground from './NetworkBackground';
import Navbar from './Navbar';
import { AlertCircle } from 'react-feather'; 
import CodeExample from './CodeExample'; 

const CodeBlock = ({ language, code }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="pt-20 bg-slate-900 rounded-lg overflow-hidden mt-4 mb-6">
      <div className="flex justify-between items-center px-4 py-2 bg-slate-800">
        <span className="text-sm text-gray-400">{language}</span>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-1 text-gray-400 hover:text-white text-sm transition-colors"
        >
          {copied ? (
            <>
              <CheckCircle size={14} className="text-green-400" />
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-gray-300">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

const EndpointCard = ({ method, path, description, requestBody, responseBody, parameters }) => {
  const [expanded, setExpanded] = useState(false);
  
  const getMethodColor = (method) => {
    switch(method.toUpperCase()) {
      case 'GET': return 'bg-blue-500/20 text-blue-300';
      case 'POST': return 'bg-green-500/20 text-green-300';
      case 'PUT': return 'bg-yellow-500/20 text-yellow-300';
      case 'DELETE': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };
  
  return (
    <div className="bg-slate-800 rounded-lg mb-6 overflow-hidden border border-slate-700">
      <div className="p-4 flex items-center gap-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <span className={`px-3 py-1 rounded-md font-mono ${getMethodColor(method)}`}>
          {method.toUpperCase()}
        </span>
        <span className="font-mono text-white">{path}</span>
      </div>
      
      {expanded && (
        <div className="border-t border-slate-700 p-4">
          <p className="text-gray-300 mb-4">{description}</p>
          
          {parameters && parameters.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Parameters</h4>
              <div className="bg-slate-900 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-800">
                      <th className="text-left py-2 px-4 text-gray-400">Name</th>
                      <th className="text-left py-2 px-4 text-gray-400">Type</th>
                      <th className="text-left py-2 px-4 text-gray-400">Required</th>
                      <th className="text-left py-2 px-4 text-gray-400">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parameters.map((param, index) => (
                      <tr key={index} className="border-t border-slate-800">
                        <td className="py-2 px-4 text-teal-400 font-mono">{param.name}</td>
                        <td className="py-2 px-4 text-purple-400 font-mono">{param.type}</td>
                        <td className="py-2 px-4">
                          {param.required ? (
                            <span className="text-red-400">Yes</span>
                          ) : (
                            <span className="text-gray-500">No</span>
                          )}
                        </td>
                        <td className="py-2 px-4 text-gray-300">{param.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {requestBody && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Request Body</h4>
              <CodeBlock language="json" code={requestBody} />
            </div>
          )}
          
          {responseBody && (
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Response</h4>
              <CodeBlock language="json" code={responseBody} />
            </div>
          )}
          
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Example Request</h4>
            <CodeBlock 
              language="curl" 
              code={`curl -X ${method.toUpperCase()} \\
  https://api.fakecontentdetector.com${path} \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  ${requestBody ? `-d '${requestBody}'` : ''}`} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

const APIDocumentation = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  
  const endpoints = [
    {
      method: "POST",
      path: "/v1/analyze/text",
      description: "Analyze text content for fake news detection",
      parameters: [
        { name: "text", type: "string", required: true, description: "The text content to analyze" },
        { name: "detailed", type: "boolean", required: false, description: "Return detailed analysis results" },
        { name: "check_sources", type: "boolean", required: false, description: "Also check against known fact-checker sources" }
      ],
      requestBody: `{
  "text": "Breaking news: Scientists discover that drinking coffee makes you immortal.",
  "detailed": true,
  "check_sources": true
}`,
      responseBody: `{
  "id": "analysis_123456",
  "timestamp": "2025-05-05T14:30:00Z",
  "prediction": "fake",
  "confidence": 0.94,
  "sentiment": {
    "label": "negative",
    "score": -0.28
  },
  "fact_checker_sources": [
    {
      "name": "FactCheck.org",
      "rating": "False",
      "url": "https://factcheck.org/example",
      "credibility": 95
    }
  ],
  "analysis_metrics": {
    "clickbait_score": 0.82,
    "emotional_language": 0.75,
    "source_credibility": 0.21
  }
}`
    },
    {
      method: "POST",
      path: "/v1/analyze/image",
      description: "Analyze an image for potential deepfake manipulation",
      parameters: [
        { name: "image", type: "file/base64", required: true, description: "The image to analyze (as file upload or base64 encoded string)" },
        { name: "detailed", type: "boolean", required: false, description: "Return detailed analysis results" }
      ],
      requestBody: `{
  "image": "base64_encoded_image_data",
  "detailed": true
}`,
      responseBody: `{
  "id": "analysis_789012",
  "timestamp": "2025-05-05T15:45:00Z",
  "prediction": "deepfake",
  "confidence": 0.89,
  "analysis_metrics": {
    "inconsistent_lighting": 0.76,
    "unnatural_features": 0.82,
    "noise_patterns": 0.65,
    "metadata_inconsistencies": 0.58
  },
  "regions_of_interest": [
    {
      "x": 120,
      "y": 80,
      "width": 100,
      "height": 120,
      "confidence": 0.92,
      "type": "face_manipulation"
    }
  ]
}`
    },
    {
      method: "GET",
      path: "/v1/analysis/{analysis_id}",
      description: "Retrieve results of a previous analysis",
      parameters: [
        { name: "analysis_id", type: "string", required: true, description: "ID of the analysis to retrieve" }
      ],
      responseBody: `{
  "id": "analysis_123456",
  "timestamp": "2025-05-05T14:30:00Z",
  "content_type": "text",
  "prediction": "fake",
  "confidence": 0.94,
  "original_request": {
    "text": "Breaking news: Scientists discover that drinking coffee makes you immortal."
  },
  // Full analysis results...
}`
    },
    {
      method: "GET",
      path: "/v1/quotas",
      description: "Check API usage and remaining quota",
      responseBody: `{
  "plan": "developer",
  "quota": {
    "daily_limit": 1000,
    "used_today": 342,
    "remaining": 658,
    "reset_time": "2025-05-06T00:00:00Z"
  },
  "rate_limits": {
    "requests_per_minute": 60,
    "current_usage": 12
  }
}`
    }
  ];
  
  const codeExamples = {
    javascript: `// Using fetch API
const analyzeText = async (text) => {
  const response = await fetch('https://api.fakecontentdetector.com/v1/analyze/text', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      text: text,
      detailed: true
    })
  });
  
  const result = await response.json();
  return result;
};`,
    python: `# Using requests library
import requests
import json

def analyze_text(text):
    url = "https://api.fakecontentdetector.com/v1/analyze/text"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"
    }
    data = {
        "text": text,
        "detailed": True
    }
    
    response = requests.post(url, headers=headers, json=data)
    return response.json()`,
    ruby: `# Using Net::HTTP
require 'net/http'
require 'uri'
require 'json'

def analyze_text(text)
  uri = URI('https://api.fakecontentdetector.com/v1/analyze/text')
  request = Net::HTTP::Post.new(uri)
  request['Content-Type'] = 'application/json'
  request['Authorization'] = 'Bearer YOUR_API_KEY'
  request.body = {
    text: text,
    detailed: true
  }.to_json
  
  response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
    http.request(request)
  end
  
  JSON.parse(response.body)
end`
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-900 text-white relative">
      <div className="absolute inset-0 z-0">
        <NetworkBackground />
      </div>
  
      <div className="relative z-10">
        <Navbar />
  
        <div className="container mx-auto p-6">
          <header className="py-8">
            <h1 className="text-4xl font-bold text-teal-400 mb-2">API Documentation</h1>
            <p className="text-gray-300 text-lg">
              Integrate our fake content detection capabilities directly into your applications
            </p>
          </header>
  
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-slate-800 rounded-lg p-4 sticky top-6">
                <nav className="space-y-1">
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 ${activeSection === "introduction" ? "bg-teal-500/20 text-teal-300" : "text-gray-300 hover:bg-slate-700"}`}
                    onClick={() => setActiveSection("introduction")}
                  >
                    <BookOpen size={16} />
                    <span>Introduction</span>
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 ${activeSection === "authentication" ? "bg-teal-500/20 text-teal-300" : "text-gray-300 hover:bg-slate-700"}`}
                    onClick={() => setActiveSection("authentication")}
                  >
                    <Key size={16} />
                    <span>Authentication</span>
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 ${activeSection === "endpoints" ? "bg-teal-500/20 text-teal-300" : "text-gray-300 hover:bg-slate-700"}`}
                    onClick={() => setActiveSection("endpoints")}
                  >
                    <Server size={16} />
                    <span>Endpoints</span>
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 ${activeSection === "examples" ? "bg-teal-500/20 text-teal-300" : "text-gray-300 hover:bg-slate-700"}`}
                    onClick={() => setActiveSection("examples")}
                  >
                    <Code size={16} />
                    <span>Code Examples</span>
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 ${activeSection === "ratelimits" ? "bg-teal-500/20 text-teal-300" : "text-gray-300 hover:bg-slate-700"}`}
                    onClick={() => setActiveSection("ratelimits")}
                  >
                    <Database size={16} />
                    <span>Rate Limits</span>
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 ${activeSection === "bestpractices" ? "bg-teal-500/20 text-teal-300" : "text-gray-300 hover:bg-slate-700"}`}
                    onClick={() => setActiveSection("bestpractices")}
                  >
                    <CheckCircle size={16} />
                    <span>Best Practices</span>
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 ${activeSection === "support" ? "bg-teal-500/20 text-teal-300" : "text-gray-300 hover:bg-slate-700"}`}
                    onClick={() => setActiveSection("support")}
                  >
                    <HelpCircle size={16} />
                    <span>Support</span>
                  </button>
                </nav>
  
                <div className="mt-8 p-4 bg-slate-700 rounded-lg">
                  <h3 className="text-sm font-medium text-white mb-2">Need an API key?</h3>
                  <p className="text-xs text-gray-400 mb-3">
                    Sign up for a developer account to get started with our API
                  </p>
                  <button className="w-full bg-teal-500 text-white py-2 rounded-md text-sm hover:bg-teal-600 transition-colors">
                    Get API Key
                  </button>
                </div>
              </div>
            </div>
  
            <div className="flex-1">
              {activeSection === "introduction" && (
                <div className="bg-slate-800 rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                  <p className="text-gray-300 mb-6">
                    The Fake Content Detector API provides powerful tools to identify fake news, deepfake images, and other manipulated content. This documentation will help you integrate our detection capabilities into your applications.
                  </p>
  
                  <h3 className="text-xl font-medium mb-3">Base URL</h3>
                  <div className="bg-slate-900 p-3 rounded-lg font-mono text-gray-300 mb-6">
                    https://api.fakecontentdetector.com/v1
                  </div>
  
                  <h3 className="text-xl font-medium mb-3">API Versions</h3>
                  <p className="text-gray-300 mb-4">
                    The current version is <span className="font-medium text-white">v1</span>. All API requests should include the version in the URL path.
                  </p>
  
                  <div className="bg-blue-500/10 border border-blue-500 rounded-lg p-4 flex items-start gap-3">
                    <Info size={20} className="text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-blue-400 mb-1">API Status</h4>
                      <p className="text-gray-300 text-sm">
                        Check our <a href="#" className="text-teal-400 hover:underline">status page</a> for API uptime and performance metrics.
                      </p>
                    </div>
                  </div>
                </div>
              )}
  
              {activeSection === "authentication" && (
                <div className="bg-slate-800 rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">Authentication</h2>
                  <p className="text-gray-300 mb-6">
                    All API requests must include an API key for authentication. API keys should be kept secure and not exposed in client-side code.
                  </p>
  
                  <h3 className="text-xl font-medium mb-3">API Keys</h3>
                  <p className="text-gray-300 mb-4">
                    Include your API key in the Authorization header using the Bearer scheme:
                  </p>
  
                  <CodeBlock 
                    language="http"
                    code={`Authorization: Bearer YOUR_API_KEY`}
                  />
  
                  <div className="bg-slate-700 rounded-lg p-4 mt-6">
                    <h4 className="text-lg font-medium mb-2">Managing API Keys</h4>
                    <p className="text-gray-300 mb-4">
                      You can create, view, and revoke API keys from your developer dashboard.
                    </p>
                    <button className="bg-teal-500 text-white px-4 py-2 rounded-md text-sm hover:bg-teal-600 transition-colors">
                      Go to Developer Dashboard
                    </button>
                  </div>
  
                  <div className="mt-6 bg-yellow-500/10 border border-yellow-500 rounded-lg p-4 flex items-start gap-3">
                    <AlertTriangle size={20} className="text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-yellow-400 mb-1">Security Warning</h4>
                      <p className="text-gray-300 text-sm">
                        Never include your API key in client-side code or public repositories. Use server-side code to make API calls whenever possible.
                      </p>
                    </div>
                  </div>
                </div>
              )}
  
              {activeSection === "endpoints" && (
                <div className="bg-slate-800 rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">API Endpoints</h2>
                  <p className="text-gray-300 mb-6">
                    Our API provides endpoints for analyzing text content, images, and retrieving analysis results.
                  </p>
  
                  {endpoints.map((endpoint, index) => (
                    <EndpointCard 
                      key={index}
                      method={endpoint.method}
                      path={endpoint.path}
                      description={endpoint.description}
                      parameters={endpoint.parameters}
                      requestBody={endpoint.requestBody}
                      response={endpoint.response}
                    />
                  ))}
                </div>
              )}
  
              {activeSection === "examples" && (
                <div className="bg-slate-800 rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">Code Examples</h2>
                  <p className="text-gray-300 mb-6">
                    Here are some code examples to get you started with the API in different languages.
                  </p>
                  
                  <div className="space-y-4">
                    <CodeExample
                      language="Python"
                      code={`import requests\nresponse = requests.post('https://api.fakecontentdetector.com/v1/analyze', headers={'Authorization': 'Bearer YOUR_API_KEY'}, json={'text': 'Sample text'})\nprint(response.json())`}
                    />
                    <CodeExample
                      language="JavaScript"
                      code={`fetch('https://api.fakecontentdetector.com/v1/analyze', {\n  method: 'POST',\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY',\n    'Content-Type': 'application/json',\n  },\n  body: JSON.stringify({ text: 'Sample text' }),\n})\n.then(response => response.json())\n.then(data => console.log(data))`}
                    />
                  </div>
                </div>
              )}
  
              {activeSection === "ratelimits" && (
                <div className="bg-slate-800 rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">Rate Limits</h2>
                  <p className="text-gray-300 mb-6">
                    To ensure fair usage of our API, we enforce rate limits.
                  </p>
  
                  <div className="bg-slate-700 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-2">Current Limits</h4>
                    <ul className="text-gray-300">
                      <li>Max requests per minute: 60</li>
                      <li>Max requests per day: 1000</li>
                    </ul>
                  </div>
  
                  <div className="mt-6 bg-teal-500/10 border border-teal-500 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle size={20} className="text-teal-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-teal-400 mb-1">Rate Limit Exceeded</h4>
                      <p className="text-gray-300 text-sm">
                        If you exceed the rate limit, you will receive a 429 Too Many Requests error. Please wait for the limit to reset before retrying.
                      </p>
                    </div>
                  </div>
                </div>
              )}
  
              {activeSection === "bestpractices" && (
                <div className="bg-slate-800 rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">Best Practices</h2>
                  <p className="text-gray-300 mb-6">
                    To ensure optimal usage of the API and the accuracy of results, follow these best practices.
                  </p>
  
                  <div className="bg-slate-700 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-2">Text Content</h4>
                    <ul className="text-gray-300">
                      <li>Ensure text is well-structured and free of unnecessary noise.</li>
                      <li>Avoid using too many special characters or emojis.</li>
                    </ul>
                  </div>
  
                  <div className="mt-6 bg-slate-700 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-2">Image Content</h4>
                    <ul className="text-gray-300">
                      <li>Ensure images are not compressed too much before submission.</li>
                      <li>Use high-resolution images for better detection accuracy.</li>
                    </ul>
                  </div>
                </div>
              )}
  
              {activeSection === "support" && (
                <div className="bg-slate-800 rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">Support</h2>
                  <p className="text-gray-300 mb-6">
                    If you have any issues, feel free to reach out to our support team.
                  </p>
  
                  <div className="bg-slate-700 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-2">Email Support</h4>
                    <p className="text-gray-300 mb-4">
                      Contact us at <a href="mailto:support@fakecontentdetector.com" className="text-teal-400 hover:underline">support@fakecontentdetector.com</a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
export default APIDocumentation;