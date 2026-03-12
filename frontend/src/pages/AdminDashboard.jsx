import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCourses } from "../api/courses";
import { fetchAllStudents } from "../api/students";
import { useAuth } from "../state/auth";

function AdminDashboard() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalCertificates: 0,
    totalNGOs: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const courses = await fetchCourses({ token });
      const students = await fetchAllStudents(token);
      setStats((prev) => ({
        ...prev,
        totalCourses: courses?.length || 0,
        totalStudents: students?.length || 0,
      }));
    } catch (err) {
      console.error("Failed to load stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      to: "/app/courses",
      icon: "📚",
      title: "Manage Courses",
      desc: "Create & edit courses",
      color: "bg-teal-light text-teal-deep",
    },
    {
      to: "/app/student",
      icon: "👥",
      title: "Manage Students",
      desc: "View all students",
      color: "bg-blue-50 text-blue-600",
    },
    {
      to: "/app/verify",
      icon: "✅",
      title: "Certificates",
      desc: "View all certificates",
      color: "bg-green-light text-green-earth",
    },
    {
      to: "/app/ngo",
      icon: "🏢",
      title: "NGO Partners",
      desc: "Manage organizations",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-5 text-white shadow-card">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
          Admin Dashboard
        </p>
        <h2 className="mt-1 text-lg font-bold leading-tight">
          System Overview
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-white/80">
          Manage the entire Mentora platform from here.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <p className="text-2xl font-bold text-teal-deep">
            {stats.totalCourses}
          </p>
          <p className="mt-1 text-xs text-slate-500">Total Courses</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <p className="text-2xl font-bold text-blue-600">
            {stats.totalStudents}
          </p>
          <p className="mt-1 text-xs text-slate-500">Students</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <p className="text-2xl font-bold text-green-earth">
            {stats.totalCertificates}
          </p>
          <p className="mt-1 text-xs text-slate-500">Certificates</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <p className="text-2xl font-bold text-purple-600">
            {stats.totalNGOs}
          </p>
          <p className="mt-1 text-xs text-slate-500">NGO Partners</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <button
            key={action.to}
            onClick={() => navigate(action.to)}
            className="group flex flex-col items-start rounded-2xl bg-white p-4 text-left shadow-card transition hover:shadow-card-hover active:scale-[0.97]"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${action.color}`}
            >
              {action.icon}
            </div>
            <h3 className="mt-3 text-sm font-semibold text-slate-900">
              {action.title}
            </h3>
            <p className="mt-0.5 text-[11px] leading-snug text-slate-500">
              {action.desc}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
