export default function Testimonials() {
  const testimonials = [
    {
      name: "Sam Winchester",
      role: "Web Developer",
      text: "This LMS helped me land my first job its will structred",
      image: "/assets/MStudent1.jpg",
    },
    {
      name: "Dean Winchester",
      role: "Mobile Developer",
      text: "Amazing Instructors I learned Mobile Development in 28 min And landed a job in Macdonalds",
      image: "/assets/MStudent2.jpg",
    },
    {
      name: "Jhon Winchester",
      role: "IOS Developer",
      text: "The flexible learning schedule made it possible to study while working full-time.",
      image: "/assets/MStudent3.jpg",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          What Our <span className="text-blue-600">Students Say</span>
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 rounded-2xl shadow hover:shaodw-lg tansition"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold ">{t.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{t.role}</p>
              <p className="text-gray-500 italic">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
