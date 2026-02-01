import { HeroSection } from "@/components/homepage/HeroSection";
import { Button } from "@/components/ui/button";
import { userService } from "@/services/user.service";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
    const { data } = await userService.getSession();
    const userInfo = data?.user.email;
    console.log("user info from homepage", userInfo);
  return (
    <div className="">
      <HeroSection/>
    </div>
  );
}
