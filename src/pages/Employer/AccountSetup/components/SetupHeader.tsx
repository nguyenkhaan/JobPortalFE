import JobLogo from "../../../../assets/JobLogo.svg";
interface SetupHeaderProps {
  progress: number;
  isSuccessPage: boolean;
}

export default function SetupHeader({
  progress,
  isSuccessPage,
}: SetupHeaderProps) {
  return (
    <header className="flex justify-between items-center py-5 px-8 border-b border-gray-100">
      <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
        <span className="text-primary-500 flex items-center">
          <img
            src={JobLogo}
            alt="My Job Logo"
            className="w-8 h-8 object-contain"
          />
        </span>
        <p> MyJob </p>
      </div>
      {!isSuccessPage && (
        <div className="w-72">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Setup Progress</span>
            <span className="text-primary-500 font-medium">
              {progress}% Completed
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </header>
  );
}
