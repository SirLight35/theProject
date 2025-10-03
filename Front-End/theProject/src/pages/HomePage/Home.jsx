import HeroSection from "./HeroSection";
import FeatureSection from "./FeaturesSection";
import CoursesPreview from "./CoursesPreview";
import Testimonials from "./Testimonials";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <CoursesPreview />
      <Testimonials />
    </div>
  );
}
