import { Link } from "react-router-dom";
import {
  ArrowRight,
  PenTool,
  Code,
  Megaphone,
  MonitorPlay,
  Music,
  LineChart,
  HeartPulse,
  Database,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

const categories = [
  { id: 1, name: "Graphics & Design", openPositions: 357, icon: PenTool },
  { id: 2, name: "Code & Programming", openPositions: 312, icon: Code },
  { id: 3, name: "Digital Marketing", openPositions: 297, icon: Megaphone },
  { id: 4, name: "Video & Animation", openPositions: 247, icon: MonitorPlay },
  { id: 5, name: "Music & Audio", openPositions: 204, icon: Music },
  { id: 6, name: "Account & Finance", openPositions: 167, icon: LineChart },
  { id: 7, name: "Health & Care", openPositions: 125, icon: HeartPulse },
  { id: 8, name: "Data & Science", openPositions: 57, icon: Database },
];
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function PopularCategories() {
  return (
    <section className="w-full py-16 lg:py-24 px-8 bg-bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Popular category
          </h2>
          <Link
            to="/categories"
            className="hidden sm:flex items-center gap-2 text-primary-500 font-medium hover:underline"
          >
            View All <ArrowRight size={20} />
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div variants={itemVariants} key={category.id}>
                <Link
                  to={`categories/${category.id}`}
                  className="group flex items-center gap-4 p-5 rounded-xl border border-gray-100 bg-bg-white hover:border-primary-500 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="p-4 rounded-lg bg-primary-50 text-primary-500 group-hover:bg-primary-500 group-hover:text-bg-white transition-colors duration-300">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-500 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {category.openPositions} Open position
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
