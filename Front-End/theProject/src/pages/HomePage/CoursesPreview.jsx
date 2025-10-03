import { Star } from "lucide-react";

export default function CoursesPreview() {
  const Course = [
    {
      id: 1,
      title: "Full-Stack Web Development",
      instructor: "John Doe",
      image: "/assets/Course1.jpeg",
      rating: 4.8,
      students: 1200,
    },
    {
      id: 2,
      title: "Data Science With Python",
      instructor: "Sara Lee",
      image: "/assets/Course1.jpeg",
      rating: 4.7,
      students: 900,
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      instructor: "Alex Kim",
      image: "/assets/Course1.jpeg",
      rating: 4.6,
      students: 700,
    },
    {
      id: 4,
      title: "Devops Enginner",
      instructor: "Hary Mack",
      image: "/assets/Course1.jpeg",
      rating: 4.6,
      students: 700,
    },
  ];
  return (
    <sectioni id="course" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          popular <span className="text-blue-600">Courses</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid cols-3">
          {Course.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transtion overflow-hidden"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-2">By {course.instructor}</p>
                <div className="flex items-center text-sm text-yellow-500 mb-4">
                  <Star className="w-4 h-4 fill-yellow-500" />
                  <span className="ml-1">{course.rating}</span>
                  <span className="ml-2 text-gray-500">
                    ({course.students} students)
                  </span>
                </div>
                <a
                  href={`/courses/${course.id}`}
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="/courses"
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700"
          >
            Browse All Courses
          </a>
        </div>
      </div>
    </sectioni>
  );
}
