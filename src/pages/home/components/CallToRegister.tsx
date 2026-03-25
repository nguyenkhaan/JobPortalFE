import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CallToRegister() {
  return (
    <section className="w-full py-16 px-8 bg-bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-2xl p-10 lg:p-14 flex flex-col items-start bg-[url('path/to/pattern1.png')] bg-no-repeat bg-botttom-right">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Become a Candidate
          </h2>
          <p className="text-gray-500 mb-8 max-w-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus
            a dolor convallis efficitur.
          </p>
          <Link
            to="/register"
            className="flex items-center gap-2 px-6 py-3 bg-bg-white text-primary-500 font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            Register Now <ArrowRight size={20} />
          </Link>
        </div>
        <div className="bg-[#0B3A82] rounded-2xl p-10 lg:p-14 flex flex-col items-start bg-[url('path/to/pattern2.png')] bg-no-repeat bg-bottom-right">
          <h2 className="text-3xl font-bold text-bg-white mb-4">
            Become a Employers
          </h2>
          <p className="text-blue-100 mb-8 max-w-sm leading-relaxed">
            Cras in massa pellentesque, mollis ligula non, luctus dui. Morbi sed
            efficitur dolor. Pelentesque massa.
          </p>
          <Link
            to="/register"
            className="flex items-center gap-2 px-6 py-3 bg-bg-white text-primary-500 font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            Register Now <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
