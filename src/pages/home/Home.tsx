import Hero from "./components/Hero";
import Stats from "./components/Stats";
import PopularVacancies from "./components/PopularVacancies";
import JobPilot from "./components/JobPilot";
import PopularCategories from "./components/PopularCategories";
import FeaturedJobs from "./components/FeaturedJobs";
import Testimonials from "./components/Testimonials";
import CallToRegister from "./components/CallToRegister";
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
