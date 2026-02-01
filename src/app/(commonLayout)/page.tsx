import FeaturedMedicines from "@/components/homepage/FeaturedMedicines";
import { FeaturedMedicinesSkeleton } from "@/components/homepage/FeaturedMedicineSkeleton";
import { HeroSection } from "@/components/homepage/HeroSection";
import MedicineCategory from "@/components/homepage/MedicineCategory";
import TrustJourneySection from "@/components/homepage/TrustJourney";
import LoadingSpinner from "@/components/layout/loadingSpinner";
import { Button } from "@/components/ui/button";
import { userService } from "@/services/user.service";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
    const { data } = await userService.getSession();
    const userInfo = data?.user.email;
  return (
    <div className="">
      <HeroSection />
      <Suspense fallback={<FeaturedMedicinesSkeleton/>}>
        <FeaturedMedicines />
      </Suspense>
      <Suspense fallback={<LoadingSpinner/>}>
        <MedicineCategory/>
      </Suspense>
      <Suspense fallback={<LoadingSpinner/>}>
        <TrustJourneySection/>
      </Suspense>
      
    </div>
  );
}
