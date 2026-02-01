"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="text-9xl font-bold text-gray-200">404</div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Page not found
          </h1>
          <p className="mt-3 text-gray-600">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            Go back home
          </Link>

          <div className="text-sm">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              ← Or go back
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Think this is an error?{" "}
            <Link
              href="/contact"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
