"use client";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase";
import { ref, set } from "firebase/database";

export default function Register() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, username, password } = e.target.elements;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
      const user = userCredential.user;
      console.log(user);

      await set(ref(db, 'users/' + user.uid), {
        username: username.value,
        email: email.value,
        id: user.uid,
      });

      window.alert("Successfully created user");
    } catch (error) {
      const errorMessage = error.message;
      window.alert("Error: " + errorMessage);
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
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <div className="my-3">
          <Link href="/Login" className="my-3">Existing user? Login</Link>
        </div>
      </form>
    </div>
  );
}
