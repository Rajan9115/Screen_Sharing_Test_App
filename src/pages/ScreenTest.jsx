import Button from "../components/Button";
import useScreenShare from "../hooks/useScreenShare";
import { useNavigate } from "react-router-dom";



function StatusBadge({ status }) {
  const colors = {
    idle: "bg-gray-600",
    requesting: "bg-yellow-500",
    granted: "bg-green-600",
    denied: "bg-red-600",
    cancelled: "bg-orange-600",
    error: "bg-red-700",
    ended: "bg-purple-600",
  };

  return (
  <span
    className={`
      px-4 py-1.5 
      rounded-full 
      text-xs 
      font-semibold 
      tracking-wide 
      uppercase
      ${colors[status]}
      shadow-md
      transition-all duration-300
    `}
  >
   Status : {status}
  </span>
);
}



export default function ScreenTest() {
  const navigate = useNavigate();
  const {
    status,
    metadata,
    videoRef,
    startScreenShare,
    stopScreenShare,
  } = useScreenShare();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex flex-col items-center justify-center px-6 ">
      <div className="w-full max-w-3xl  text-center bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-3xl p-8 shadow-2xl transition-all duration-300">
        <div className="flex justify-center mb-6">
          <StatusBadge status={status} />
        </div>

        {status === "idle" && (
          <Button onClick={startScreenShare}>
            Start Screen Sharing
          </Button>
        )}

        {status === "requesting" && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400">
              Waiting for screen selection...
            </p>
          </div>
        )}

        {status === "granted" && (
          <div className="">
            <div className="mt-2 bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800 relative ">
              <div className="flex mt-3.5 justify-center items-center mb-4">
                <span className="text-green-400 text-sm font-medium">
                  Screen Stream Active
                </span>
              </div>

              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full py-1"
              />
              
              <div className="mb-1">
                <Button variant="danger" onClick={stopScreenShare}>
                  Stop Sharing
                </Button>
              </div>
            </div>

            <div className="">
              {metadata && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gray-800 p-4 rounded-xl">
                    <p className="text-sm text-gray-400">Resolution</p>
                    <p className="font-semibold">
                      {metadata.width} × {metadata.height}
                    </p>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-xl">
                    <p className="text-sm text-gray-400">Frame Rate</p>
                    <p className="font-semibold">{metadata.frameRate}</p>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-xl">
                    <p className="text-sm text-gray-400">Surface</p>
                    <p className="font-semibold">{metadata.displaySurface}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {["ended", "denied", "cancelled", "error"].includes(status) && (
          <div className="mt-8 w-full max-w-md mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl text-center space-y-5 transition-all duration-300">

            {/* Status Icon */}
            <div className="text-4xl">
              {status === "ended" && "🛑"}
              {status === "denied" && "🚫"}
              {status === "cancelled" && "⚠️"}
              {status === "error" && "❌"}
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold">
              {status === "ended" && "Screen Sharing Stopped"}
              {status === "denied" && "Permission Denied"}
              {status === "cancelled" && "Screen Selection Cancelled"}
              {status === "error" && "Unexpected Error"}
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-400">
              {status === "ended" &&
                "You stopped screen sharing from the browser controls."}

              {status === "denied" &&
                "Browser blocked screen sharing permission."}

              {status === "cancelled" &&
                "You closed the screen picker without selecting a screen."}

              {status === "error" &&
                "Something went wrong while starting screen sharing."}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button onClick={startScreenShare}>
                Retry Screen Test
              </Button>

              <Button variant="secondary" onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}