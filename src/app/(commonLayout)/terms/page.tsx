import { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  const sections = [
    { title: "Acceptance of Terms", content: "By accessing or using MediStore, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform. These terms apply to all users, including customers, sellers, and visitors." },
    { title: "Account Registration", content: "You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must be at least 18 years old to create an account." },
    { title: "Ordering & Payments", content: "All orders are subject to availability and confirmation. Prices are displayed in USD and may change without notice. Payment must be made at the time of order through our accepted payment methods. We reserve the right to cancel orders if fraud is suspected." },
    { title: "Prescription Medicines", content: "Prescription medicines require a valid prescription from a licensed healthcare provider. Prescriptions are verified by our pharmacists before order processing. We reserve the right to reject prescriptions that appear invalid or altered." },
    { title: "Shipping & Delivery", content: "We aim to deliver orders within the estimated timeframe, but delivery times are not guaranteed. Risk of loss transfers to you upon delivery. Free shipping is available on orders above $25." },
    { title: "Returns & Refunds", content: "Unopened and undamaged products may be returned within 7 days of delivery. Prescription medicines cannot be returned due to regulatory requirements. Refunds are processed within 5-7 business days after return approval." },
    { title: "Seller Terms", content: "Sellers must maintain valid pharmacy licenses and comply with all applicable regulations. Sellers are responsible for product quality, accurate descriptions, and timely fulfillment. MediStore reserves the right to suspend seller accounts for policy violations." },
    { title: "Limitation of Liability", content: "MediStore is a marketplace platform and does not practice medicine. We are not liable for adverse reactions to medicines or medical advice. Always consult your healthcare provider before starting any medication." },
    { title: "Governing Law", content: "These terms are governed by applicable laws. Any disputes shall be resolved through binding arbitration. These terms constitute the entire agreement between you and MediStore." },
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: April 2026</p>
        <p className="text-muted-foreground mb-8 leading-relaxed">Please read these terms carefully before using MediStore. By using our services, you agree to these terms.</p>
        <div className="space-y-8">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-xl font-semibold mb-3">{i + 1}. {section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 p-6 bg-muted/50 rounded-xl">
          <p className="text-sm text-muted-foreground">For questions about these terms, contact <a href="mailto:legal@medistore.com" className="text-blue-600 dark:text-blue-400 hover:underline">legal@medistore.com</a></p>
        </div>
      </div>
    </div>
  );
}
