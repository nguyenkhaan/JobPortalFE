import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import PopularVacancies from "../components/home/PopularVacancies";
import JobPilot from "../components/home/JobPilot";
import PopularCategories from "../components/home/PopularCategories";
import FeaturedJobs from "../components/home/FeaturedJobs";
import Testimonials from "../components/home/Testimonials";
import CallToRegister from "../components/home/CallToRegister";
export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Stats />
      <PopularVacancies />
      <JobPilot />
      <PopularCategories />
      <FeaturedJobs />
      <Testimonials />
      <CallToRegister />
    </div>
  );
}
