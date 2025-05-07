// CodeExample.jsx
const CodeExample = ({ language, code }) => {
    return (
      <div className="bg-gray-800 text-white p-4 rounded-lg">
        <pre className="text-sm font-mono">{code}</pre>
      </div>
    );
  };
  
  export default CodeExample;
  