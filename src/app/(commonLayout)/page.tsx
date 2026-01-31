import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Medistore</h1>
      <p className="text-lg text-center mb-8">
        Your one-stop solution for all medical supplies and healthcare products.
      </p>
      <Button size="lg" asChild>
        <Link href="/shop" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Shop Now
        </Link>
      </Button>
    </div>
  );
}
