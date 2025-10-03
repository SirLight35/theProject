import RegisterForm from "../components/RegisterForm";
import { registerUser } from "../api/auth";
export default function RegisterPage() {
  const handleRegister = async (data) => {
    try {
      await registerUser(data);
      alert("Registeration Successfull");
    } catch (error) {
      console.error(error);

      alert("Failed To Register");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600">
      <RegisterForm
        onSubmit={(data) => {
          console.log(data);
          handleRegister(data);
        }}
      />
    </div>
  );
}
