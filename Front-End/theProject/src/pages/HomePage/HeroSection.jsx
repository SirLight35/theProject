export default function HeroSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-6">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold loading-tight mb-6">
            Learn Anytime, <span className="text-blue-600">Anywhere</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Access thousands of courses from top instructors and boost your
            career with flexible learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="/register"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              Get Started
            </a>
            <a
              href="#course"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
            >
              Browse Courses
            </a>
          </div>
        </div>
        <div className="flex-1 mt-10 md:mt-0">
          <img
            src="/assets/learning-education.jpg"
            alt="Learning Illustration"
            className="w-full max-w-2xl mx-auto rounded-2xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
