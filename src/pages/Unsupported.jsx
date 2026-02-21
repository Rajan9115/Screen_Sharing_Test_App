import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Unsupported() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md text-center bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-3xl p-8 shadow-2xl space-y-6">

        <div className="text-5xl">🚫</div>

        <h1 className="text-2xl font-bold">
          Screen Sharing Not Supported
        </h1>

        <p className="text-sm text-gray-400 leading-relaxed">
          Your browser does not support screen sharing.
          Please use the latest version of Chrome, Edge, or Firefox.
        </p>

        <Button onClick={() => navigate("/")}>
          Back to Home
        </Button>

      </div>
    </div>
  );
}