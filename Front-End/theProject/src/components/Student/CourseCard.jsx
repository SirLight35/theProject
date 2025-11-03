export default function CourseCard({ course, onContinue, onEnroll }) {
  return (
    <div className="bg-white shadow p-4 rounded">
      <h3 className="text-lg font-semibold">{course.title}</h3>
      <p className="text-sm text-gray-500 mb-2">
        {course.instructor?.userName}
      </p>
      <div className="flex justify-between items-center">
        {course.progress !== undefined && (
          <p className="text-sm text-gray-700">Progress: {course.progress}%</p>
        )}
        {onContinue && (
          <button
            onClick={onContinue}
            className="text-blue-600 hover:underline"
          >
            Continue
          </button>
        )}
        {onEnroll && (
          <button
            onClick={onEnroll}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Enroll
          </button>
        )}
      </div>
    </div>
  );
}
