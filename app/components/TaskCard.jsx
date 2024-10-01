import Link from 'next/link';

export default function TaskCard({ task }) {
  if (!task) {
    return null; // หรือแสดงข้อความว่าไม่พบงาน
  }

  return (
    <Link href={`/tasks/${task.id}`} className="text-decoration-none">
      <div className="bg-light">
        <div className="card mt-3 shadow-sm">
          <div className="card-body">{task.title}</div>
        </div>
      </div>
    </Link>
  );
}
