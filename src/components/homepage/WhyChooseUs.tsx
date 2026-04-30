import { Shield, Truck, Clock, HeartPulse, BadgeCheck, Headphones } from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "100% Genuine Medicines",
    description: "Every medicine is sourced from licensed pharmacies and verified for authenticity before reaching you.",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: Truck,
    title: "Express Delivery",
    description: "Same-day delivery in metro cities. Standard delivery within 2-3 business days nationwide.",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Bank-grade encryption protects every transaction. Multiple payment options including COD.",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    icon: HeartPulse,
    title: "Health First Approach",
    description: "Our pharmacists review every prescription order to ensure your safety and well-being.",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/20",
  },
  {
    icon: Clock,
    title: "Easy Refills & Reminders",
    description: "Set up auto-refills and get timely reminders so you never miss your medication schedule.",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    icon: Headphones,
    title: "24/7 Expert Support",
    description: "Our medical experts and customer care team are available around the clock to help you.",
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-blue-600 dark:text-blue-400">MediStore</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We go beyond just selling medicines. Experience healthcare that truly cares about your well-being.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-8 h-1 bg-blue-600 dark:bg-blue-500 rounded-full" />
            <div className="w-3 h-1 bg-blue-400 rounded-full" />
            <div className="w-3 h-1 bg-blue-300 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex p-3 rounded-xl ${feature.bg} mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
