import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image1 from "../../assets/avatarHome/image1.jpeg";
import Image2 from "../../assets/avatarHome/image2.jpg";
import Image3 from "../../assets/avatarHome/image3.jpg";
const reviews = [
  {
    id: 1,
    name: "Sul Kyung Gu",
    role: "UI/UX Designer",
    avatar: { Image1 },
    text: '"Ut ullamcorper hendrerit venenatis. Praesent efficitur iaculis vulputate. Sed aliquet congue congue. Vivamus ut lacinia nisi, id in gravida urna."',
    active: false,
  },
  {
    id: 2,
    name: "Bessie Cooper",
    role: "Creative Director",
    avatar: { Image2 },
    text: '"Mauris eget lorem odio. Aliquam nec efficitur enim. Nullam id est hendrerit, ullamcorper arcu in, scelerisque lectus. Maecenas blandit at nunc."',
    active: true,
  },
  {
    id: 3,
    name: "Jane Cooper",
    role: "Photographer",
    avatar: { Image3 },
    text: '"Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse potenti. Ut gravida tortor vitae facilisis."',
    active: false,
  },
];

export default function Testimonials() {
  return (
    <section className="w-full py-16 lg:py-24 px-8 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Clients Testimonial
        </h2>

        <div className="relative flex items-center justify-center gap-6">
          <button className="hidden xl:flex items-center justify-center w-12 h-12 bg-bg-white rounded-full shadow-sm text-gray-400 hover:text-primary-500 transition-colors absolute -left-16 z-10">
            <ChevronLeft size={24} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-bg-white p-8 rounded-xl shadow-sm text-left flex flex-col justify-between relative group hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-4 text-[#FFAA00]">
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-8 italic relative z-10">
                  {review.text}
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src="{review.avatar}"
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <span className="text-sm text-gray-500">{review.role}</span>
                  </div>
                </div>
                <div className="absolute bottom-6 right-6 text-gray-100 group-hover:text-primary-50 transition-colors z-0">
                  <Quote size={48} fill="currentColor" className="rotate-180" />
                </div>
              </div>
            ))}
          </div>
          <button className="hidden xl:flex items-center justify-center w-12 h-12 bg-bg-white rounded-full shadow-sm text-gray-400 hover:text-primary-500 transition-colors absolute -right-16 z-10">
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 mt-10">
          <div className="w-2 h-2 rounded-full bg-gray-300 cursor-pointer hover:bg-primary-500 transition-colors"></div>
          <div className="w-6 h-2 rounded-full bg-primary-500 cursor-pointer"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300 cursor-pointer hover:bg-primary-500 transition-colors"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300 cursor-pointer hover:bg-primary-500 transition-colors"></div>
        </div>
      </div>
    </section>
  );
}
