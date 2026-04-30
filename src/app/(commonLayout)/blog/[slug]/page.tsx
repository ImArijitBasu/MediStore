import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

const articles: Record<string, { title: string; category: string; date: string; readTime: string; content: string[] }> = {
  "understanding-otc-medicines": {
    title: "Understanding Over-the-Counter Medicines",
    category: "Health Education", date: "April 28, 2026", readTime: "5 min read",
    content: [
      "Over-the-counter (OTC) medicines are drugs you can buy without a prescription. They treat a variety of illnesses and their symptoms, including pain, coughs and colds, diarrhea, constipation, acne, and others.",
      "Common categories of OTC medicines include analgesics (pain relievers like acetaminophen and ibuprofen), antacids, antihistamines, decongestants, and cough suppressants.",
      "While OTC medicines are generally safe when used as directed, it is important to read labels carefully, follow dosage instructions, and be aware of potential interactions with other medications you may be taking.",
      "Always consult with a healthcare professional if you are unsure about which OTC medicine is right for your symptoms, especially if you have existing health conditions or are taking prescription medications.",
      "Store OTC medicines in a cool, dry place away from direct sunlight. Check expiration dates regularly and dispose of expired medications properly.",
    ],
  },
  "building-home-first-aid-kit": {
    title: "How to Build the Perfect Home First Aid Kit",
    category: "Wellness Tips", date: "April 25, 2026", readTime: "4 min read",
    content: [
      "A well-stocked first aid kit is an essential part of every household. Having the right supplies on hand can make the difference in effectively treating minor injuries and illnesses at home.",
      "Essential medications to include: pain relievers (acetaminophen, ibuprofen), antihistamines for allergies, antacids, antiseptic solution, hydrocortisone cream, and antibiotic ointment.",
      "Supplies you will need: adhesive bandages in various sizes, sterile gauze pads, medical tape, elastic bandages, scissors, tweezers, disposable gloves, and a digital thermometer.",
      "Check your first aid kit every 3-6 months. Replace any used or expired items. Keep a list of emergency numbers inside the kit.",
      "Consider adding items specific to your family needs, such as an EpiPen for severe allergies, an inhaler for asthma, or specific medications for chronic conditions.",
    ],
  },
  "seasonal-allergies-guide": {
    title: "Seasonal Allergies: Prevention and Treatment",
    category: "Health Guide", date: "April 22, 2026", readTime: "6 min read",
    content: [
      "Seasonal allergies affect millions of people worldwide. Understanding your triggers and having the right treatment plan can significantly improve your quality of life during allergy season.",
      "Common symptoms include sneezing, runny or stuffy nose, itchy eyes, and throat irritation. These are caused by the immune system overreacting to pollen, mold spores, or other airborne allergens.",
      "Treatment options include antihistamines (cetirizine, loratadine), nasal corticosteroid sprays, decongestants, and eye drops. Many of these are available over the counter.",
      "Prevention tips: monitor pollen counts, keep windows closed during high pollen days, shower after being outdoors, use HEPA air filters, and start medications before allergy season begins.",
      "If OTC treatments are not sufficient, consult an allergist who may recommend immunotherapy (allergy shots) or prescription-strength medications for more effective relief.",
    ],
  },
};

const defaultArticle = {
  title: "Health Article",
  category: "Health", date: "April 2026", readTime: "5 min read",
  content: ["This article is coming soon. Please check back later for updated content.", "In the meantime, browse our other health articles or visit our medicines page for your healthcare needs."],
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const article = articles[slug] || defaultArticle;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <article>
          <div className="mb-8">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">{article.category}</span>
            <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">{article.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{article.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{article.readTime}</span>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none space-y-4">
            {article.content.map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">{para}</p>
            ))}
          </div>

          <div className="mt-12 p-6 bg-muted/50 rounded-2xl text-center">
            <h3 className="font-semibold mb-2">Need medicines mentioned in this article?</h3>
            <p className="text-sm text-muted-foreground mb-4">Browse our verified collection of genuine medicines.</p>
            <Link href="/medicines" className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Browse Medicines
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
