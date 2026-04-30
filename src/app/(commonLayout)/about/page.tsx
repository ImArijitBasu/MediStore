import { Metadata } from "next";
import { Shield, Heart, Users, Award, Target, Globe } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about MediStore - your trusted online pharmacy committed to delivering genuine medicines with care and reliability.",
};

const values = [
  {
    icon: Shield,
    title: "Trust & Authenticity",
    description: "Every medicine is sourced from licensed pharmacies and verified for authenticity before reaching our customers.",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Your health and satisfaction are our top priorities. We go above and beyond to ensure the best experience.",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/20",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "We build meaningful relationships with our customers, sellers, and healthcare partners to create a healthier community.",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Rigorous quality control processes ensure that only genuine, safe, and effective medicines reach your doorstep.",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "We leverage technology and AI to make healthcare more accessible, convenient, and personalized for everyone.",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    icon: Globe,
    title: "Accessibility",
    description: "Making quality healthcare accessible to everyone, regardless of location, through our nationwide delivery network.",
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
  },
];

const teamMembers = [
  { name: "Dr. Sarah Ahmed", role: "Chief Medical Officer", initials: "SA" },
  { name: "Rajesh Kumar", role: "CEO & Founder", initials: "RK" },
  { name: "Emily Chen", role: "Head of Operations", initials: "EC" },
  { name: "Michael Roberts", role: "CTO", initials: "MR" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-background dark:from-blue-950/20 dark:to-background">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <Heart className="h-4 w-4" />
            About MediStore
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Making Healthcare <span className="text-blue-600 dark:text-blue-400">Accessible</span> for Everyone
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Founded with a mission to bridge the gap between patients and genuine medicines, MediStore has grown into a trusted platform serving thousands of customers with quality healthcare products.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="prose dark:prose-invert max-w-none space-y-4 text-muted-foreground">
              <p>
                MediStore was born from a simple yet powerful idea: everyone deserves easy access to genuine, affordable medicines. In 2024, our founders recognized the challenges people face in finding authentic medicines — from counterfeit products to inflated prices and limited availability in rural areas.
              </p>
              <p>
                We built MediStore as a bridge between licensed pharmacies and customers, creating a marketplace where trust, quality, and convenience come together. Our platform connects verified sellers with health-conscious customers, ensuring every transaction is transparent and every medicine is authentic.
              </p>
              <p>
                Today, MediStore serves over 10,000 customers across the country with a catalog of 500+ verified medicines from trusted pharmacies. Our commitment to quality healthcare remains as strong as ever, and we continue to innovate with AI-powered features to make your healthcare journey smoother.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These values guide every decision we make and every product we deliver.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {values.map((value) => (
              <div key={value.title} className="bg-card rounded-2xl p-6 border hover:shadow-md transition-shadow">
                <div className={`inline-flex p-3 rounded-xl ${value.bg} mb-4`}>
                  <value.icon className={`h-6 w-6 ${value.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A passionate team of healthcare and technology professionals working to make a difference.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mb-4 group-hover:scale-105 transition-transform">
                  {member.initials}
                </div>
                <h4 className="font-semibold text-sm">{member.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience MediStore?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Join thousands of satisfied customers who trust us with their healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/medicines" className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
              Browse Medicines
            </Link>
            <Link href="/register" className="px-8 py-3 bg-white/10 border border-white/30 text-white font-medium rounded-lg hover:bg-white/20 transition-colors">
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}