export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-gray-900 text-gray-300 py-4 w-full  bottom-0 left-0 text-center"
    >
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8">
        <div id="about" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-white mb-4">About Us</h2>
          <p className="text-gray-400">
            A modern learning platform to help you achieve your career goals.
          </p>
        </div>

        <div
          id="contact"
          className="scroll-mt-20 flex flex-col space-y-3 md:items-end"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
          <p>Email: support@mylms.com</p>
          <p>Phone: +20 1024952163</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MyLMS. All rights reserved.
      </div>
    </footer>
  );
}
