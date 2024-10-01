"use client"; // เพิ่มบรรทัดนี้

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth, db } from "@/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, get } from "firebase/database";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        get(ref(db, 'users/' + uid)).then((snapshot) => {
          if (snapshot.exists()) {
            setUser(snapshot.val());
          } else {
            console.log("No user data available");
          }
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // ทำความสะอาดเมื่อคอมโพเนนต์ถูกลบ
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <nav className="navbar bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
        <div className="container">
          <Link href={"/"} className="navbar-brand">To-Do List</Link>
          {user ? (
            <div className="d-flex align-items-center">
              <span className="navbar-text text-white me-3">
                Hello, {user.username}!
              </span>
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <Link href={"/Login"} className="btn btn-outline-success" type="submit">
              Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
