"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How can I order medicines from MediStore?",
    answer: "Simply search for your medicine, add it to your cart, and proceed to checkout. You can pay via COD, debit card, credit card, or digital wallet. If it is a prescription medicine, you will need to upload a valid prescription.",
  },
  {
    question: "Are all medicines on MediStore genuine?",
    answer: "Yes, absolutely. All medicines on MediStore are sourced directly from licensed pharmacies and verified manufacturers. We conduct rigorous quality checks to ensure authenticity and safety of every product.",
  },
  {
    question: "What is the delivery time for orders?",
    answer: "We offer same-day delivery in major metro cities for orders placed before 2 PM. For other locations, standard delivery takes 2-3 business days. Express delivery options are also available for urgent medication needs.",
  },
  {
    question: "Can I return or cancel my order?",
    answer: "Orders can be cancelled before they are shipped. For returns, we accept unopened and unused medicines within 7 days of delivery. Prescription medicines cannot be returned due to regulatory requirements.",
  },
  {
    question: "Do I need a prescription to buy medicines?",
    answer: "Over-the-Counter (OTC) medicines can be purchased without a prescription. Prescription (Rx) medicines require a valid prescription from a licensed healthcare provider, which you can upload during checkout.",
  },
  {
    question: "How do I become a seller on MediStore?",
    answer: "You can register as a seller during sign-up by checking the 'I want to become a seller' option. Once registered, you can list your medicines, manage inventory, and track orders through the seller dashboard.",
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes, we use bank-grade 256-bit SSL encryption to protect all transactions. Your payment details are never stored on our servers. We are PCI-DSS compliant and follow the highest security standards.",
  },
  {
    question: "How can I track my order?",
    answer: "You can track your order from the Orders section in your dashboard. You will also receive email and SMS notifications with real-time status updates from placement to delivery.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="text-blue-600 dark:text-blue-400">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about ordering, delivery, and using MediStore.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-8 h-1 bg-blue-600 dark:bg-blue-500 rounded-full" />
            <div className="w-3 h-1 bg-blue-400 rounded-full" />
            <div className="w-3 h-1 bg-blue-300 rounded-full" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border overflow-hidden transition-shadow hover:shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left gap-4"
              >
                <span className="font-medium text-sm md:text-base">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 pb-4" : "max-h-0"
                }`}
              >
                <p className="px-6 text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
