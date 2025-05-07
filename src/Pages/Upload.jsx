import React, { useState, useEffect } from "react";
import { AlertCircle, FileImage, FileText, ArrowRight, Loader, CheckCircle, X, ExternalLink } from "lucide-react";
import NetworkBackground from './NetworkBackground';
import Navbar from './Navbar';
const API_BASE_URL = "http://localhost:8000/api";

const analyzeNewsText = async (text) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze/text`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to analyze text");
    }
    return await response.json();
  } catch (error) {
    console.error("Error analyzing text:", error);
    throw error;
  }
};

const analyzeImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);
    const response = await fetch(`${API_BASE_URL}/analyze/image`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to analyze image");
    }
    return await response.json();
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
};

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between mb-8 w-full">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
            index < currentStep ? "bg-green-500" : 
            index === currentStep ? "bg-teal-500" : 
            "bg-slate-700"
          }`}>
            {index < currentStep ? (
              <CheckCircle size={20} className="text-white" />
            ) : (
              <span className="text-white font-medium">{index + 1}</span>
            )}
          </div>
          
          <div className="ml-3">
            <p className={`font-medium ${
              index <= currentStep ? "text-white" : "text-gray-400"
            }`}>{step.title}</p>
          </div>
          
          {index < steps.length - 1 && (
            <div className={`w-12 h-1 mx-4 ${
              index < currentStep ? "bg-green-500" : "bg-slate-700"
            }`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

const FakeDetectorApp = () => {
  const [activeTab, setActiveTab] = useState("text"); 
  const [newsText, setNewsText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [textResult, setTextResult] = useState(null);
  const [imageResult, setImageResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [factCheckerSources, setFactCheckerSources] = useState([]);


  const textSteps = [
    { title: "Input Text" },
    { title: "Analyzing" },
    { title: "Results" }
  ];


  const imageSteps = [
    { title: "Upload Image" },
    { title: "Analyzing" },
    { title: "Results" }
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetResults();
    setCurrentStep(0);
  };

  const resetResults = () => {
    setTextResult(null);
    setImageResult(null);
    setErrorMessage("");
    setFactCheckerSources([]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setImageResult(null);
      setCurrentStep(0);
    }
  };

  const handleTextChange = (e) => {
    setNewsText(e.target.value);
    setTextResult(null);
    setCurrentStep(0);
  };

  const handleTextSubmit = async () => {
    if (!newsText.trim()) {
      setErrorMessage("Please enter some news text to analyze.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setCurrentStep(1);
    
    try {
      const result = await analyzeNewsText(newsText);
      
      setTextResult({
        prediction: result.prediction,
        confidence: result.confidence,
        sentiment: result.sentiment,
        sentimentScore: result.sentimentScore
      });
      
      setFactCheckerSources(result.factCheckerSources);
      setLoading(false);
      setCurrentStep(2);
    } catch (error) {
      setErrorMessage(error.message || "An error occurred while analyzing the text.");
      setLoading(false);
      setCurrentStep(0);
    }
  };

  const handleImageSubmit = async () => {
    if (!selectedImage) {
      setErrorMessage("Please select an image to analyze.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setCurrentStep(1);
    
    try {
      const result = await analyzeImage(selectedImage);
      
      setImageResult({
        prediction: result.prediction,
        confidence: result.confidence,
        details: result.details
      });
      
      setLoading(false);
      setCurrentStep(2);
    } catch (error) {
      setErrorMessage(error.message || "An error occurred while analyzing the image.");
      setLoading(false);
      setCurrentStep(0);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-900 text-white relative">
      <div className="absolute inset-0 z-0">
        <NetworkBackground />
      </div>
      
      <div className="relative z-10">
        <Navbar />
        
        <div className="container mx-auto p-6">
          <header className="text-center py-6">
            <h1 className="text-4xl font-bold text-teal-400 mb-2">Fake Content Detector</h1>
            <p className="text-gray-300 text-lg">Detect fake news and deepfake images using AI</p>
          </header>

          <div className="max-w-4xl mx-auto bg-slate-800 rounded-lg shadow-xl overflow-hidden">
            <div className="flex border-b border-slate-700">
              <button 
                className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 ${activeTab === "text" ? "bg-slate-700 text-teal-400" : "text-gray-400 hover:bg-slate-700/50"}`}
                onClick={() => handleTabChange("text")}
              >
                <FileText size={20} />
                <span className="font-medium">Fake News Detection</span>
              </button>
              <button 
                className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 ${activeTab === "image" ? "bg-slate-700 text-teal-400" : "text-gray-400 hover:bg-slate-700/50"}`}
                onClick={() => handleTabChange("image")}
              >
                <FileImage size={20} />
                <span className="font-medium">Deepfake Image Detection</span>
              </button>
            </div>

            <div className="p-6">
              {activeTab === "text" && (
                <Stepper steps={textSteps} currentStep={currentStep} />
              )}
              
              {activeTab === "image" && (
                <Stepper steps={imageSteps} currentStep={currentStep} />
              )}

              {activeTab === "text" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">Enter News Article</label>
                    <textarea 
                      className="w-full h-40 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Paste or type news text here..."
                      value={newsText}
                      onChange={handleTextChange}
                    ></textarea>
                  </div>

                  <button 
                    className="w-full bg-teal-500 text-white py-3 rounded-md font-semibold flex justify-center items-center gap-2 hover:bg-teal-600 transition-colors"
                    onClick={handleTextSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader className="animate-spin" size={20} />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <span>Analyze News</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  {errorMessage && activeTab === "text" && (
                    <div className="bg-red-500/20 border border-red-500 text-red-100 rounded-md p-4 flex items-center gap-3">
                      <AlertCircle size={20} />
                      <p>{errorMessage}</p>
                    </div>
                  )}

                  {textResult && (
                    <div className="mt-6 space-y-6">
                      <div className={`p-6 rounded-lg ${textResult.prediction === "Fake" ? "bg-red-500/20 border border-red-500" : "bg-green-500/20 border border-green-500"}`}>
                        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                          <AlertCircle size={24} />
                          {textResult.prediction === "Fake" ? "Fake News Detected" : "Legitimate News"}
                        </h3>
                        <p className="text-lg">
                          Our system has determined this news to be <strong>{textResult.prediction}</strong> with {(textResult.confidence * 100).toFixed(2)}% confidence.
                        </p>
                      </div>

                      <div className="bg-slate-700 p-6 rounded-lg">
                        <h4 className="font-medium text-gray-300 mb-4 text-lg">Fact Checker Sources</h4>
                        
                        {factCheckerSources && factCheckerSources.length > 0 ? (
                          <div className="space-y-4">
                            {factCheckerSources.map((source, index) => (
                              <div key={index} className="border-b border-slate-600 pb-4 last:border-0 last:pb-0">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <div className="flex items-center">
                                      <h5 className="font-medium text-white">{source.name}</h5>
                                      <a 
                                        href={source.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="ml-2 text-teal-400 hover:text-teal-300 inline-flex items-center"
                                      >
                                        <ExternalLink size={12} className="ml-1" />
                                      </a>
                                    </div>
                                    <p className="text-sm text-gray-400 mt-1">
                                      Source Credibility: <span className="font-medium text-white">{source.credibility}%</span>
                                    </p>
                                  </div>
                                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    source.rating === "True" || source.rating === "Accurate" || source.rating === "Mostly True" ? 
                                    "bg-green-500/20 text-green-300" : 
                                    source.rating === "False" || source.rating === "Mostly False" ? 
                                    "bg-red-500/20 text-red-300" : 
                                    "bg-yellow-500/20 text-yellow-300"
                                  }`}>
                                    {source.rating}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-400">No fact checker sources available for this content.</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-700 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-300 mb-2">Sentiment Analysis</h4>
                          <p className="text-2xl font-bold">
                            {textResult.sentiment}
                            <span className="text-sm font-normal text-gray-400 ml-2">
                              (Score: {textResult.sentimentScore})
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "image" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">Upload Image</label>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                      <input 
                        type="file" 
                        id="imageInput" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <label htmlFor="imageInput" className="cursor-pointer block">
                        {imagePreview ? (
                          <div className="flex flex-col items-center">
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              className="max-h-64 max-w-full mb-4 rounded-lg"
                            />
                            <span className="text-teal-400 underline">Choose another image</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <FileImage size={48} className="text-slate-500 mb-3" />
                            <p className="text-gray-400">Click to upload an image</p>
                            <p className="text-xs text-gray-500 mt-1">JPG, PNG, WEBP supported</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <button 
                    className="w-full bg-teal-500 text-white py-3 rounded-md font-semibold flex justify-center items-center gap-2 hover:bg-teal-600 transition-colors"
                    onClick={handleImageSubmit}
                    disabled={!selectedImage || loading}
                  >
                    {loading ? (
                      <>
                        <Loader className="animate-spin" size={20} />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <span>Detect Deepfake</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  {errorMessage && activeTab === "image" && (
                    <div className="bg-red-500/20 border border-red-500 text-red-100 rounded-md p-4 flex items-center gap-3">
                      <AlertCircle size={20} />
                      <p>{errorMessage}</p>
                    </div>
                  )}

                  {imageResult && (
                    <div className="mt-6">
                      <div className={`p-6 rounded-lg ${imageResult.prediction === "Deepfake" ? "bg-red-500/20 border border-red-500" : "bg-green-500/20 border border-green-500"}`}>
                        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                          <AlertCircle size={24} />
                          {imageResult.prediction === "Deepfake" ? "Deepfake Detected" : "Authentic Image"}
                        </h3>
                        <p className="text-lg">
                          Our system has determined this image to be <strong>{imageResult.prediction}</strong> with {(imageResult.confidence * 100).toFixed(2)}% confidence.
                        </p>
                        
                        <div className="mt-4 p-4 bg-slate-800 rounded-lg">
                          <h4 className="font-medium text-gray-300 mb-2">Analysis Details</h4>
                          <ul className="space-y-2">
                            {imageResult.details && Object.entries(imageResult.details).map(([key, value], index) => {
                              const formattedKey = key
                                .replace(/([A-Z])/g, ' $1')
                                .replace(/^./, str => str.toUpperCase());
                              
                              const isHighRisk = value > 0.5;
                              
                              return (
                                <li key={index} className="flex items-center">
                                  <div className={`w-3 h-3 rounded-full ${isHighRisk ? "bg-red-500" : "bg-green-500"} mr-2`}></div>
                                  <span>{formattedKey}: {(value * 100).toFixed(2)}%</span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <footer className="text-center mt-8 text-gray-400 text-sm">
            <p>© 2025 Fake Content Detector. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default FakeDetectorApp;