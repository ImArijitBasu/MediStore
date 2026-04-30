import { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  const sections = [
    { title: "Information We Collect", content: "We collect information you provide directly, such as your name, email, shipping address, and payment details when you create an account or place an order. We also collect usage data including browsing patterns, device information, and IP addresses to improve our services." },
    { title: "How We Use Your Information", content: "Your information is used to process orders, deliver medicines, provide customer support, send order updates, improve our platform, and personalize your experience. We may also use anonymized data for analytics and service improvement." },
    { title: "Data Security", content: "We implement industry-standard security measures including 256-bit SSL encryption, secure payment processing (PCI-DSS compliant), and regular security audits. Your payment information is never stored on our servers." },
    { title: "Information Sharing", content: "We do not sell your personal information to third parties. We may share your data with delivery partners (for order fulfillment), payment processors (for transaction processing), and law enforcement (when required by law)." },
    { title: "Cookies & Tracking", content: "We use cookies and similar technologies to maintain your session, remember preferences, and analyze site usage. You can manage cookie preferences through your browser settings." },
    { title: "Your Rights", content: "You have the right to access, correct, or delete your personal data. You can update your profile information from your dashboard or contact us to request data deletion. We will respond to all requests within 30 days." },
    { title: "Data Retention", content: "We retain your personal data for as long as your account is active or as needed to provide services. Order records are kept for 7 years for legal and tax compliance purposes." },
    { title: "Changes to This Policy", content: "We may update this privacy policy periodically. We will notify you of significant changes via email or a prominent notice on our platform. Continued use of MediStore after changes constitutes acceptance." },
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: April 2026</p>
        <p className="text-muted-foreground mb-8 leading-relaxed">At MediStore, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information when you use our platform.</p>
        <div className="space-y-8">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-xl font-semibold mb-3">{i + 1}. {section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 p-6 bg-muted/50 rounded-xl">
          <p className="text-sm text-muted-foreground">For privacy-related inquiries, contact us at <a href="mailto:privacy@medistore.com" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@medistore.com</a></p>
        </div>
      </div>
    </div>
  );
}
