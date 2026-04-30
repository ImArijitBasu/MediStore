import FeaturedMedicines from "@/components/homepage/FeaturedMedicines";
import { FeaturedMedicinesSkeleton } from "@/components/homepage/FeaturedMedicineSkeleton";
import { HeroSection } from "@/components/homepage/HeroSection";
import MedicineCategory from "@/components/homepage/MedicineCategory";
import TrustJourneySection from "@/components/homepage/TrustJourney";
import StatsCounter from "@/components/homepage/StatsCounter";
import Testimonials from "@/components/homepage/Testimonials";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import HealthBlog from "@/components/homepage/HealthBlog";
import FAQ from "@/components/homepage/FAQ";
import Newsletter from "@/components/homepage/Newsletter";
import LoadingSpinner from "@/components/layout/loadingSpinner";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Stats Counter */}
      <StatsCounter />

      {/* 3. Featured Medicines */}
      <Suspense fallback={<FeaturedMedicinesSkeleton />}>
        <FeaturedMedicines />
      </Suspense>

      {/* 4. Why Choose Us */}
      <WhyChooseUs />

      {/* 5. Categories */}
      <Suspense fallback={<LoadingSpinner />}>
        <MedicineCategory />
      </Suspense>

      {/* 6. Trust Journey / How It Works */}
      <Suspense fallback={<LoadingSpinner />}>
        <TrustJourneySection />
      </Suspense>

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. Health Blog */}
      <HealthBlog />

      {/* 9. FAQ */}
      <FAQ />

      {/* 10. Newsletter CTA */}
      <Newsletter />
    </div>
  );
}
