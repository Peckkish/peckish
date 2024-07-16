interface AppFooterProps {}

export default function AppFooter({}: AppFooterProps) {
  return (
    <div className="bg-white border-t border-gray-200 py-8 text-center">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-[5fr_3fr_3fr] gap-8">
        <div className="flex flex-col items-center justify-center">
          <img
            src="/assets/peckish-logo-4.png"
            alt="Company Logo"
            className="mb-4 w-64"
          />
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Peckish. All rights reserved.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Company</h3>
          <a
            href="/about"
            className="block mt-2 text-xs text-gray-600 hover:text-gray-900"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="block mt-2 text-xs text-gray-600 hover:text-gray-900"
          >
            Contact
          </a>
          <a
            href="/careers"
            className="block mt-2 text-xs text-gray-600 hover:text-gray-900"
          >
            Careers
          </a>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Support</h3>
          <a
            href="/privacy"
            className="block mt-2 text-xs text-gray-600 hover:text-gray-900"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="block mt-2 text-xs text-gray-600 hover:text-gray-900"
          >
            Terms of Service
          </a>
          <a
            href="/faq"
            className="block mt-2 text-xs text-gray-600 hover:text-gray-900"
          >
            FAQ
          </a>
          <a
            href="/support"
            className="block mt-2 text-xs text-gray-600 hover:text-gray-900"
          >
            Customer Support
          </a>
        </div>
      </div>
    </div>
  );
}
