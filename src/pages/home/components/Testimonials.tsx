import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "Robert Fox",
    role: "UI/UX Designer",
    avatar: "https://i.pravatar.cc/150?img=11",
    text: '"Trải nghiệm tìm việc trên nền tảng này thực sự tuyệt vời. Giao diện thân thiện, dễ sử dụng và tôi đã tìm được công việc ưng ý chỉ sau 1 tuần!"',
  },
  {
    id: 2,
    name: "Bessie Cooper",
    role: "Creative Director",
    avatar: "https://i.pravatar.cc/150?img=47",
    text: '"Hệ thống gợi ý công việc rất thông minh. Nó tự động match chính xác các kỹ năng của tôi với yêu cầu của nhà tuyển dụng. Rất đáng dùng!"',
  },
  {
    id: 3,
    name: "Jane Cooper",
    role: "Software Engineer",
    avatar: "https://i.pravatar.cc/150?img=32",
    text: '"Quy trình nộp CV diễn ra vô cùng nhanh chóng. Tôi đặc biệt thích tính năng theo dõi trạng thái ứng tuyển (Application Status)."',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section className="w-full py-16 lg:py-24 px-8 bg-gray-50 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-12"
        >
          Clients Testimonial
        </motion.h2>

        <div className="relative flex items-center justify-center min-h">
          <button
            onClick={handlePrev}
            className="hidden md:flex items-center justify-center w-12 h-12 bg-bg-white rounded-full shadow-md text-gray-400 hover:text-primary-500 absolute -left-6 z-20 transition-transform hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="w-full max-w-2xl relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-bg-white p-8 md:p-12 rounded-2xl shadow-sm text-center flex flex-col items-center relative"
              >
                <div className="absolute top-6 right-8 text-gray-100">
                  <Quote size={64} fill="currentColor" className="rotate-180" />
                </div>

                <div className="flex gap-1 mb-6 text-[#FFAA00] relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>

                <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8 italic relative z-10">
                  {reviews[currentIndex].text}
                </p>

                <div className="flex flex-col items-center gap-3 relative z-10">
                  <img
                    src={reviews[currentIndex].avatar}
                    alt="Avatar"
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-primary-50"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      {reviews[currentIndex].name}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {reviews[currentIndex].role}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={handleNext}
            className="hidden md:flex items-center justify-center w-12 h-12 bg-bg-white rounded-full shadow-md text-gray-400 hover:text-primary-500 absolute -right-6 z-20 transition-transform hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-8 bg-primary-500"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
