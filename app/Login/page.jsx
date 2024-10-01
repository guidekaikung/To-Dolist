"use client";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = e.target.elements;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
      const user = userCredential.user;
      console.log(user);
      window.alert("Successfully logged in");
      router.replace("/"); // ใช้ replace เพื่อไม่ให้กลับไปยังหน้าเข้าสู่ระบบ
    } catch (error) {
      const errorMessage = error.message;
      window.alert("Error while Logging in: " + errorMessage);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: "80vh" }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
            aria-label="Email address"
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            required
            aria-label="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <div className="my-3">
          <Link href="/register" className="my-3">New user? Register</Link>
        </div>
      </form>
    </div>
  );
}
