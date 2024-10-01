"use client";
import { db } from "@/firebase";
import { child, get, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ViewUpdateDeletePage({ params }) {
  const router = useRouter();
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

  const getTaskDetails = async () => {
    try {
      const snapshot = await get(child(ref(db), `tasks/${params.id}`));
      if (snapshot.exists()) {
        setFormData(snapshot.val());
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error getting task details:", error);
    }
  };

  useEffect(() => {
    getUserList();
    getTaskDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await set(ref(db, `tasks/${params.id}`), formData);
      window.alert("Updated Details");
    } catch (error) {
      console.error("Error updating task:", error);
      window.alert("Failed to update task. Please try again.");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await remove(ref(db, "tasks/" + params.id));
      window.alert("Task deleted successfully!");
      router.push("/"); // ใช้ useRouter สำหรับการเปลี่ยนเส้นทาง
    } catch (error) {
      console.error("Error deleting task:", error);
      window.alert("Failed to delete task. Please try again.");
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
            onChange={handleChange}
            value={formData.title}
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
            onChange={handleChange}
            value={formData.description}
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
              onChange={handleChange}
              value={formData.status}
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
              onChange={handleChange}
              value={formData.assigned_user}
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

        <div className='d-flex mt-3'>
          <button type="submit" className="btn btn-success">Update Task</button>
          <button className="btn btn-outline-danger mx-3" onClick={handleDelete}>Delete Task</button>
        </div>
      </form>
    </div>
  );
}
