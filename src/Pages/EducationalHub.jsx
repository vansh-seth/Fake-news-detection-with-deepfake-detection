import React, { useState } from "react";
import { Book, Info, Award, CheckCircle, AlertTriangle, ExternalLink, ChevronRight, Search, BookOpen, Video, FileText } from "lucide-react";
import NetworkBackground from './NetworkBackground';
import Navbar from './Navbar';

const ResourceCard = ({ icon, title, description, category, difficulty, link }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-colors cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-700 rounded-lg">
          {icon}
        </div>
        <div className="flex space-x-2">
          <span className="px-2 py-1 bg-teal-500/20 text-teal-300 text-xs rounded-full">
            {category}
          </span>
          <span className={`px-2 py-1 text-xs rounded-full ${
            difficulty === "Beginner" ? "bg-green-500/20 text-green-300" :
            difficulty === "Intermediate" ? "bg-yellow-500/20 text-yellow-300" :
            "bg-red-500/20 text-red-300"
          }`}>
            {difficulty}
          </span>
        </div>
      </div>
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <a href={link} className="text-teal-400 text-sm flex items-center gap-1 hover:text-teal-300 transition-colors">
        Learn more
        <ChevronRight size={16} />
      </a>
    </div>
  );
};

const GuideCard = ({ title, content, image }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden">
      <div className="relative h-40 bg-slate-700">
        <div className="absolute inset-0 flex items-center justify-center">
          {image}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
        <div className={`text-gray-400 text-sm ${expanded ? '' : 'line-clamp-3'}`}>
          {content}
        </div>
        <button 
          onClick={() => setExpanded(!expanded)} 
          className="mt-3 text-teal-400 text-sm hover:text-teal-300 transition-colors"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-slate-700 last:border-0">
      <button 
        className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-white font-medium">{question}</span>
        <ChevronRight 
          size={20} 
          className={`text-teal-400 transition-transform ${isOpen ? 'transform rotate-90' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-400">
          {answer}
        </div>
      )}
    </div>
  );
};

const EducationalHub = () => {
  const [activeTab, setActiveTab] = useState("guides");
  
  const guides = [
    {
      title: "Spotting Fake News: A Beginner's Guide",
      content: "Fake news can be difficult to identify, but there are several key indicators to watch for. First, check the source - is it reputable? Look for unusual URLs or site names that mimic legitimate news sources. Second, verify the author - do they have credentials or a history of reliable reporting? Third, check for supporting sources - credible news stories cite multiple sources and link to primary documents. Fourth, be alert for emotional language or clickbait headlines designed to provoke strong reactions. Fifth, examine the date - old news may be presented as current. Finally, check if other reputable outlets are reporting the same story. By following these steps, you can become more adept at distinguishing between genuine news and misinformation.",
      image: <Book size={48} className="text-teal-400" />
    },
    {
      title: "Understanding Deepfakes: Technology & Detection",
      content: "Deepfakes use artificial intelligence, specifically deep learning, to create convincing fake images or videos by swapping faces or manipulating speech. These are created through 'generative adversarial networks' (GANs) - two AI systems working against each other to create increasingly realistic fakes. Modern detection technologies look for subtle inconsistencies that humans might miss: unnatural blinking patterns, strange skin tones at face boundaries, lighting inconsistencies, and unusual facial movements. Advanced detection algorithms also analyze noise patterns, as AI-generated content has different digital noise signatures than authentic media. While detection technology continues to improve, deepfakes are also becoming more sophisticated, creating an ongoing technological arms race between creation and detection methods.",
      image: <Video size={48} className="text-purple-400" />
    },
    {
      title: "Media Literacy in the Digital Age",
      content: "Media literacy is the ability to identify different types of media and understand the messages they're sending. In today's digital landscape, this skill is more important than ever. To practice media literacy, start by examining the source of information and its potential biases or motivations. Consider the context in which information appears, and compare it with reporting from multiple sources. Learn to distinguish between fact and opinion, and verify claims through reliable fact-checking websites. Be aware of emotional manipulation tactics in headlines and content. Remember that images and videos can be manipulated or presented out of context. Finally, reflect on your own biases - we all tend to believe information that confirms our existing views. By developing these critical thinking skills, you can navigate our complex information environment more effectively.",
      image: <BookOpen size={48} className="text-yellow-400" />
    },
    {
      title: "The Psychology Behind Misinformation Spread",
      content: "Misinformation spreads through predictable psychological mechanisms. First, confirmation bias leads us to accept information that aligns with our existing beliefs while rejecting contradictory evidence. Second, the 'illusory truth effect' means repeated exposure to false claims makes them seem more credible over time. Third, emotional content - especially triggering fear or outrage - spreads faster and is remembered longer than neutral information. Fourth, social proof influences us to trust content that others in our network have shared. Fifth, cognitive overload in our information-rich environment reduces critical thinking, making us rely on mental shortcuts. Understanding these psychological vulnerabilities can help us become more resilient against misinformation by prompting us to slow down, question our reactions, and verify information before sharing.",
      image: <Info size={48} className="text-blue-400" />
    }
  ];
  
  const resources = [
    {
      icon: <BookOpen size={24} className="text-teal-400" />,
      title: "Introduction to Digital Literacy",
      description: "Learn the fundamentals of evaluating online information and recognizing misinformation.",
      category: "Course",
      difficulty: "Beginner",
      link: "#"
    },
    {
      icon: <Video size={24} className="text-purple-400" />,
      title: "Deepfake Technology Explained",
      description: "A technical breakdown of how deepfakes are created and current detection methods.",
      category: "Video",
      difficulty: "Intermediate",
      link: "#"
    },
    {
      icon: <FileText size={24} className="text-blue-400" />,
      title: "Fact-Checking Methodology",
      description: "Professional techniques used by fact-checkers to verify claims and debunk myths.",
      category: "Guide",
      difficulty: "Intermediate",
      link: "#"
    },
    {
      icon: <BookOpen size={24} className="text-yellow-400" />,
      title: "Advanced Media Forensics",
      description: "Techniques for detecting manipulated media using both technical and contextual analysis.",
      category: "Course",
      difficulty: "Advanced",
      link: "#"
    },
    {
      icon: <Info size={24} className="text-red-400" />,
      title: "The Misinformation Ecosystem",
      description: "Understanding how false information spreads through social media and news networks.",
      category: "Research",
      difficulty: "Intermediate",
      link: "#"
    },
    {
      icon: <Video size={24} className="text-green-400" />,
      title: "Critical Thinking in the Digital Age",
      description: "Practical exercises to strengthen your critical thinking when consuming online content.",
      category: "Workshop",
      difficulty: "Beginner",
      link: "#"
    }
  ];
  
  const faqs = [
    {
      question: "How accurate is AI at detecting fake content?",
      answer: "Current AI detection systems typically achieve 85-95% accuracy for both text and image analysis, depending on the sophistication of the fake content. However, accuracy rates can vary based on the specific type of content, with newer deepfake technologies sometimes being harder to detect. Our system combines multiple detection algorithms to maximize accuracy and provides confidence scores with all results."
    },
    {
      question: "What are the most common signs of fake news articles?",
      answer: "Common indicators include sensationalist headlines that don't match the content, emotional language designed to provoke outrage, missing or anonymous sources, unusual URLs mimicking legitimate news sites, outdated information presented as current, lack of coverage by other reputable sources, and poor grammar or formatting. Our text analysis detects these patterns automatically."
    },
    {
      question: "How can I tell if an image has been manipulated?",
      answer: "Signs of image manipulation include inconsistent lighting or shadows, blurry areas where editing occurred, unnatural skin textures, mismatched proportions, strange reflections in eyes or glasses, and irregular backgrounds. For sophisticated deepfakes, look for unnatural blinking, awkward facial movements, or audio that doesn't perfectly sync with lip movements."
    },
    {
      question: "Why is detecting fake content becoming more difficult?",
      answer: "As AI technology advances, particularly with generative models like GANs and large language models, fake content is becoming increasingly sophisticated. Modern deepfakes can mimic facial expressions, voice patterns, and writing styles with remarkable accuracy. Additionally, AI tools for creating fake content are becoming more accessible to the general public, increasing the volume of sophisticated fake content online."
    },
    {
      question: "What should I do if I suspect content is fake?",
      answer: "First, verify the information through multiple reputable sources. Use fact-checking websites like Snopes, FactCheck.org, or PolitiFact. For images, try a reverse image search to find the original source. Don't share content you're unsure about, and consider reporting it to the platform where you found it. Our tool can help with initial analysis, but critical thinking remains essential."
    },
    {
      question: "How often are your detection models updated?",
      answer: "Our AI detection models undergo continuous improvement through regular training on the latest examples of authentic and fake content. Major updates are deployed monthly, with minor refinements weekly. This ongoing development is crucial as fake content creation techniques evolve rapidly."
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
          <header className="text-center py-8">
            <h1 className="text-4xl font-bold text-teal-400 mb-2">Educational Hub</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Learn how to identify misinformation, understand deepfakes, and protect yourself in the digital age
            </p>
          </header>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for guides, resources, or FAQs..." 
                className="w-full py-3 px-4 pl-12 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <Search size={20} className="absolute left-4 top-3.5 text-gray-400" />
            </div>
          </div>

          <div className="max-w-6xl mx-auto mb-8">
            <div className="flex border-b border-slate-700">
              <button 
                className={`py-4 px-6 ${activeTab === "guides" ? "text-teal-400 border-b-2 border-teal-400" : "text-gray-400 hover:text-gray-300"}`}
                onClick={() => setActiveTab("guides")}
              >
                Guides & Tutorials
              </button>
              <button 
                className={`py-4 px-6 ${activeTab === "resources" ? "text-teal-400 border-b-2 border-teal-400" : "text-gray-400 hover:text-gray-300"}`}
                onClick={() => setActiveTab("resources")}
              >
                Learning Resources
              </button>
              <button 
                className={`py-4 px-6 ${activeTab === "faq" ? "text-teal-400 border-b-2 border-teal-400" : "text-gray-400 hover:text-gray-300"}`}
                onClick={() => setActiveTab("faq")}
              >
                FAQ
              </button>
            </div>
          </div>

          {activeTab === "guides" && (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {guides.map((guide, index) => (
                  <GuideCard 
                    key={index}
                    title={guide.title}
                    content={guide.content}
                    image={guide.image}
                  />
                ))}
              </div>
              
              <div className="mt-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg p-8 text-center">
                <h3 className="text-xl font-bold mb-2">Ready to test your knowledge?</h3>
                <p className="text-white/90 mb-6">Take our fake content detection quiz and see how well you can spot misinformation.</p>
                <button className="bg-white text-teal-800 px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors">
                  Start Quiz
                </button>
              </div>
            </div>
          )}

          <footer className="text-center mt-16 text-gray-400 text-sm pb-8">
            <p>© 2025 Fake Content Detector. All educational resources provided for informational purposes.</p>
          </footer>
{activeTab === "resources" && (
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource, index) => (
        <ResourceCard
          key={index}
          icon={resource.icon}
          title={resource.title}
          description={resource.description}
          category={resource.category}
          difficulty={resource.difficulty}
          link={resource.link}
        />
      ))}
    </div>
  </div>
)}

{activeTab === "guides" && (
  <div className="max-w-6xl mx-auto mt-6">
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {guides.map((guide, index) => (
        <GuideCard key={index} {...guide} />
      ))}
    </div>
  </div>
)}

<section className="max-w-4xl mx-auto mt-12">
  <h2 className="text-2xl font-semibold text-teal-400 mb-4">Frequently Asked Questions</h2>
  <div className="divide-y divide-slate-700">
    {faqs.map((faq, index) => (
      <FAQItem key={index} {...faq} />
    ))}
  </div>
</section>

        </div>
      </div>
    </div>
  );
};

export default EducationalHub;