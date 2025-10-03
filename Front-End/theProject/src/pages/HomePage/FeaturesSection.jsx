import { BookOpen, UserCheck, Clock, Award, icons } from "lucide-react";
export default function FeatureSection() {
  const Feature = [
    {
      icon: <BookOpen className="w-10 h-10 text-blue-600" />,
      title: "Wide Range of Courses",
      desc: "Explore topics from Buisness to Technology and beyond",
    },
    {
      icon: <UserCheck className="w-10 h-10 text-blue-600" />,
      title: "Experts Instructors",
      desc: "Learn from industry professionals with real-world experience.",
    },
    {
      icon: <Clock className="w-10 h-10 text-blue-600" />,
      title: "Flexible Learning",
      desc: "Study anytime, anywhere, and learn at your own pace.",
    },
    {
      icon: <Award className="w-10 h-10 text-blue-600" />,
      title: "Certificate",
      desc: "Earn recognized certificates to boost your career..",
    },
  ];

  return (
    <section className="py-20 bg-grey">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Why Choose <span className="text-blue-600">Our LMS</span>
        </h2>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {Feature.map((f, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
