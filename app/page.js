"use client";
import Link from 'next/link';
import TaskCard from './components/TaskCard';
import { child, get, ref } from 'firebase/database';
import { db, auth } from '@/firebase';
import { useEffect, useState } from 'react';

export default function Home() {
  const [tasksList, setTasksList] = useState({
    "todo": {},
    "in_progress": {},
    "done": {}
  });

  const getTasksList = () => {
    get(child(ref(db), `tasks`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const filtered_data = {
            "todo": {},
            "in_progress": {},
            "done": {}
          };

          const userEmail = auth.currentUser.email;

          Object.keys(data).forEach(key => {
            const item = data[key];
            if (item.user_email === userEmail) {
              filtered_data[item['status']][key] = item;
            }
          });
          setTasksList(filtered_data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getTasksList();
  }, []);

  return (
    <main>
      <div className='d-flex'>
        <div className='col-3 mx-3'>
          <div className='bg-primary px-3 py-2 rounded'>TODO</div>
          <div>
            {Object.keys(tasksList["todo"]).map(key => (
              <TaskCard key={key} task={{ ...tasksList["todo"][key], id: key }} />
            ))}
          </div>
        </div>
        <div className='col-3 mx-3'>
          <div className='bg-warning px-3 py-2 rounded'>In Progress</div>
          <div>
            {Object.keys(tasksList["in_progress"]).map(key => (
              <TaskCard key={key} task={{ ...tasksList["in_progress"][key], id: key }} />
            ))}
          </div>
        </div>
        <div className='col-3 mx-3'>
          <div className='bg-success px-3 py-2 rounded'>Done</div>
          <div>
            {Object.keys(tasksList["done"]).map(key => (
              <TaskCard key={key} task={{ ...tasksList["done"][key], id: key }} />
            ))}
          </div>
        </div>
        <div className='col-3 mx-3'>
          <Link href={"/tasks/create"} className="btn btn-dark rounded">Add new task +</Link>
        </div>
      </div>
    </main>
  );
}
