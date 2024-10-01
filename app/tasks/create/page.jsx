"use client"; // ต้องมีบรรทัดนี้เพื่อให้เป็น Client Component
import { v4 as uuidv4 } from 'uuid';
import { db, auth } from "@/firebase"; // นำเข้า auth
import { child, get, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ใช้ next/navigation สำหรับ useRouter

export default function CreateTask() {
  const router = useRouter(); // ใช้ useRouter
  const [usersList, setUsersList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Select Status",
    assigned_user: "Select User",
    deadline: "",
  });

  const getUserList = async () => {
    try {
      const snapshot = await get(child(ref(db), `users`));
      if (snapshot.exists()) {
        setUsersList(Object.values(snapshot.val()));
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error getting user list:", error);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskId = uuidv4();
    const taskWithUserEmail = {
      ...formData,
      user_email: auth.currentUser.email,
    };

    try {
      await set(ref(db, 'tasks/' + taskId), taskWithUserEmail);
      router.push('/'); // เปลี่ยนเส้นทางไปยังหน้าแรก
    } catch (error) {
      console.error("Error creating task: ", error);
      window.alert("Failed to create task. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows={6}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="d-flex">
          <div className="mb-3 col-3 me-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              name="status"
              className="form-select"
              aria-label="Default select example"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option disabled>Select Status</option>
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="mb-3 col-3 me-3">
            <label htmlFor="assigned_user" className="form-label">Assigned User</label>
            <select
              name="assigned_user"
              className="form-select"
              aria-label="Default select example"
              value={formData.assigned_user}
              onChange={handleChange}
              required
            >
              <option disabled>Select User</option>
              {usersList.map((item) => (
                <option key={item.id} value={item.id}>
                  {`${item.username} <${item.email}>`}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3 col-3 me-3">
            <label htmlFor="deadline" className="form-label">Deadline</label>
            <input
              onChange={handleChange}
              type="date"
              className="form-control"
              name="deadline"
              id="deadline"
              min={new Date().toISOString().split("T")[0]}
              value={formData.deadline}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-success">Create New Task</button>
      </form>
    </div>
  );
}
