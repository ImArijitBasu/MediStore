// components/home/TrustJourneySection.tsx

const TrustJourneySection = () => {
  return (
    <section className="py-16 bg-linear-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Your{" "}
            <span className="text-blue-600 dark:text-blue-400">Trusted</span>{" "}
            Healthcare Partner
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience seamless medicine ordering with guaranteed quality,
            security, and reliability
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-8 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
            <div className="w-3 h-1 bg-blue-400 dark:bg-blue-400 rounded-full"></div>
            <div className="w-3 h-1 bg-blue-300 dark:bg-blue-300 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: How It Works */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                  How It Works
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Simple 4-step process
                </p>
              </div>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-6 relative">
              {/* Connecting Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-blue-200 via-blue-400 to-blue-200 dark:from-blue-700 dark:via-blue-500 dark:to-blue-700"></div>

              {/* Step 1 */}
              <div className="flex items-start gap-4 relative group">
                <div className="shrink-0 w-12 h-12 rounded-full bg-linear-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
                  1
                </div>
                <div className="flex-1 pt-2">
                  <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-1">
                    Browse & Find
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Search medicines by name or browse categories. Check
                    detailed descriptions and doctor recommendations.
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <span>Search 5000+ medicines</span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4 relative group">
                <div className="shrink-0 w-12 h-12 rounded-full bg-linear-to-r from-indigo-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
                  2
                </div>
                <div className="flex-1 pt-2">
                  <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-1">
                    Add to Cart
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Select your required medicines and quantities. Upload
                    prescription if needed for prescription medicines.
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>Easy quantity adjustment</span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4 relative group">
                <div className="shrink-0 w-12 h-12 rounded-full bg-linear-to-r from-purple-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
                  3
                </div>
                <div className="flex-1 pt-2">
                  <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-1">
                    Secure Checkout
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Enter delivery details and choose payment method. All
                    transactions are 100% secure and encrypted.
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-purple-600 dark:text-purple-400 text-sm">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span>Multiple secure payment options</span>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-4 relative group">
                <div className="shrink-0 w-12 h-12 rounded-full bg-linear-to-r from-green-500 to-green-600 text-white flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
                  4
                </div>
                <div className="flex-1 pt-2">
                  <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-1">
                    Fast Delivery
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Get timely doorstep delivery. Track your order in real-time
                    with our live tracking system.
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span>Same-day dispatch in most cities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Why Choose Us */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                  Why Choose MediStore
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Trusted by 50,000+ customers
                </p>
              </div>
            </div>

            {/* Trust Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Feature 1: Verified Medicines */}
              <div className="group p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-500/30 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      className="w-5 h-5 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-1">
                      100% Verified Medicines
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      All medicines are sourced from licensed pharmacies and
                      verified for authenticity.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2: Secure Payment */}
              <div className="group p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-500/30 hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      className="w-5 h-5 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-1">
                      Secure Payment
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Bank-level encryption ensures your payment information is
                      always safe and secure.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3: Fast Delivery */}
              <div className="group p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-amber-200 dark:hover:border-amber-500/30 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      className="w-5 h-5 text-amber-600 dark:text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-1">
                      Fast Delivery
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Same-day dispatch in metro cities. Express delivery
                      options available for urgent needs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 4: Expert Support */}
              <div className="group p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-500/30 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      className="w-5 h-5 text-purple-600 dark:text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-1">
                      24/7 Expert Support
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Our medical experts are available round-the-clock to
                      assist with any queries or concerns.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 5: Free Shipping */}
              <div className="group p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-rose-200 dark:hover:border-rose-500/30 hover:bg-rose-50/50 dark:hover:bg-rose-900/10 transition-all duration-300 md:col-span-2">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      className="w-5 h-5 text-rose-600 dark:text-rose-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-1">
                      Free Shipping & Easy Returns
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Free delivery on orders above $25. Easy return policy
                      within 7 days if unsatisfied.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                    50K+
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">
                    5K+
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Medicines
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">
                    24/7
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Support
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400">
                    98%
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Satisfaction
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center bg-linear-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 md:p-8 shadow-md">
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Ready to Experience Hassle-Free Medicine Delivery?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Join thousands of satisfied customers who trust us with their
                healthcare needs.
              </p>
            </div>
            <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl">
              Start Shopping Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustJourneySection;
