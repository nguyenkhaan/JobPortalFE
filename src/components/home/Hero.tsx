import { Search, MapPin } from "lucide-react";
import Button from "../ui/Button";
import IllustrationImage from "../../assets/IllustrationImage.svg";

export default function Hero() {
  return (
    <section className="w-full bg-gray-50 py-16 lg:py-24 px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 flex flex-col items-start gap-6 w-full">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Find a job that suits <br className="hidden lg:block" />
            your interest & skills.
          </h1>
          <p className="text-gray-500 text-lg max-w-lg">
            A place where your dreams and passions are transformed into a
            meaningful and fulfilling career
          </p>
          <div className="w-full max-w-3xl mt-4 bg-bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1 flex items-center gap-3 px-3 w-full border-b sm:border-b-0 sm:border-r border-gray-100 pb-3 sm:pb-0">
              <Search className="text-primary-500" size={24} />
              <input
                type="text"
                placeholder="Job title, Keyword..."
                className="w-full bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-3 w-full pb-3 sm:pb-0">
              <MapPin className="text-primary-500" size={24} />
              <input
                type="text"
                placeholder="Your Location"
                className="w-full bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <Button
              variant="primary"
              className="w-full sm:w-auto px-8 py-3 text-lg rounded-lg"
            >
              Find Job
            </Button>
          </div>
          <div className="text-sm mt-2">
            <span className="text-gray-500">Suggestion: </span>
            <span className="text-gray-900 font-medium">
              Designer, Programming,{" "}
              <span className="text-primary-500">Digital Marketing</span>,
              Video, Animation.
            </span>
          </div>
        </div>
        <div className="flex-1 w-full flex justify-center lg:justify-end">
          <img src={IllustrationImage} alt="Illustration image for hero" />
        </div>
      </div>
    </section>
  );
}
