import { useNavigate } from "react-router-dom";
import SuccessIcon from "../../../assets/successIcon.svg";
import { ArrowRight } from "lucide-react";
import Button from "../../../components/ui/Button";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function SetupSuccess() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  const handleGoToDashboard = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/employer/dashboard");
  };

  const handleGoToPostJob = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/employer/post-job");
  };
  return (
    <div className="w-full flex flex-col items-center justify-center text-center mt-10 animate-in fade-in slide-in-from-bottom-5 duration-700 bg-white p-6">
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
        colors={["#10B981", "#FFC107", "#3B82F6", "#FF6384"]}
      />

      <div className="flex flex-col justify-center items-center">
        <img src={SuccessIcon} alt="success" className="w-24 h-24 mb-6" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Congratulations, You profile is 100% complete!
        </h2>
        <p className="text-gray-600 mb-6">
          Your account setup is now complete. You can start posting jobs and
          attracting top talent.
        </p>
      </div>
      <div className="flex justify-center gap-4">
        <Button
          type="button"
          variant="social"
          onClick={handleGoToDashboard}
          className="px-6 py-3 font-semibold bg-primary-50 text-primary-500 hover:bg-primary-100 transition-colors"
        >
          View Dashboard
        </Button>
        <Button
          type="button"
          onClick={handleGoToPostJob}
          className="px-6 py-3 font-semibold rounded-md bg-gray-100 text-bg-white hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          Post Job <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}
