import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";


export default function Home() {
  const navigate = useNavigate();
  const [unsupported, setUnsupported] = useState(false);

  const handleStart = () => {
    if (!navigator.mediaDevices?.getDisplayMedia) {
      setUnsupported(true);
      return;
    }
    
    navigate("/screen-test");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex items-center justify-center px-4 sm:px-6 transition-all duration-300">
      
      <div className="w-full max-w-md text-center bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-3xl p-8 shadow-2xl space-y-6">

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight">
          Screen Share Test App
        </h1>

        {/* Button */}
        <Button onClick={handleStart}>
          Start Screen Test
        </Button>

        {/* Unsupported Message */}
        {unsupported && (
          <p className="text-sm text-red-400 leading-relaxed">
            Your browser does not support screen sharing.
            Please use the latest version of Chrome or Edge.
          </p>
        )}

      </div>
    </div>
  );
}