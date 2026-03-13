import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/auth";
import {
  fetchStudentCertificates,
  fetchStudentEnrollments,
  fetchStudentScholarships,
} from "../api/students";

function StudentDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (user?.userId || user?.studentId) {
        try {
          const [enrollmentsData, certificatesData, scholarshipsData] =
            await Promise.all([
              fetchStudentEnrollments(
                user.studentId || user.userId,
                localStorage.getItem("authToken"),
              ),
              fetchStudentCertificates(
                user.studentId || user.userId,
                localStorage.getItem("authToken"),
              ),
              fetchStudentScholarships(
                user.studentId || user.userId,
                localStorage.getItem("authToken"),
              ),
            ]);
          setEnrollments(enrollmentsData);
          setCertificates(certificatesData);
          setScholarships(scholarshipsData);
        } catch (error) {
          console.error("Error loading student data:", error);
        }
      }
    };

    loadData();
  }, [user?.id]);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-20">
      <main className="flex flex-col gap-6 p-4 mt-0">
        <section className="@container">
          <div className="bg-primary rounded-xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-1">
                Welcome back, {user?.name?.split(" ")[0] || "Student"}!
              </h2>
              <p className="text-primary/20 text-sm opacity-90 mb-4">
                You've completed 75% of this week's goals.
              </p>
            </div>
            <div className="absolute right-[-20px] top-[-20px] opacity-10">
              <span className="material-symbols-outlined text-[120px]">
                school
              </span>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight">My Courses</h2>
            <button
              className="text-primary text-sm font-semibold"
              onClick={() => navigate("/app/student")}
            >
              View all
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {enrollments.slice(0, 2).map((enrollment) => (
              <div
                key={enrollment.id}
                className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-primary/5"
              >
                <div
                  className="h-32 bg-cover bg-center"
                  alt="Abstract digital network visualization in teal colors"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDKrQQdZwFkFjIvb4wlETc80mSPeMlCcrYuCnjlj_DgFyEd3IlIjkVpOVEmzQG_MCVHQQO6AwiaAq7gY1dO273ZzJ4iLpwqG5SX72Q9PS0s0Jc10WHdwYUvIocrHJkixWwQaamcdNdUA2hdynFPChx_3ddg_PRl7CojHrKrfUmwDcewuffRmwtvCD0Hs6aFXfVacGuGtALMfNyBvmdIYIgmLL_XBXGs4xkmenYW9ReuS8nqbqQpUi46LT0JZZHnmS0BxtTLMstxVHI")',
                  }}
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">
                    {enrollment.courseName}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Module 4: Prototyping
                  </p>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mb-4">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${enrollment.progress || 0}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-400">
                      {enrollment.progress || 0}% Complete
                    </span>
                    <button
                      className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold"
                      onClick={() => navigate("/app/student")}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4">
            Scholarship Status
          </h2>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border-l-4 border-primary shadow-sm">
            {scholarships.length > 0 ? (
              scholarships.slice(0, 1).map((scholarship) => (
                <div key={scholarship.id}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {scholarship.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        Applied on Oct 12, 2023
                      </p>
                    </div>
                    <span className="bg-primary/10 text-primary text-[10px] uppercase font-bold px-2 py-1 rounded">
                      Under Review
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex flex-col items-center flex-1">
                      <div className="size-2 rounded-full bg-primary mb-1"></div>
                      <p className="text-[10px] text-slate-400">Applied</p>
                    </div>
                    <div className="h-[2px] bg-primary flex-1"></div>
                    <div className="flex flex-col items-center flex-1">
                      <div className="size-2 rounded-full bg-primary mb-1"></div>
                      <p className="text-[10px] text-slate-400">Review</p>
                    </div>
                    <div className="h-[2px] bg-slate-200 flex-1"></div>
                    <div className="flex flex-col items-center flex-1">
                      <div className="size-2 rounded-full bg-slate-200 mb-1"></div>
                      <p className="text-[10px] text-slate-400">Interview</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-slate-500">
                  No scholarships applied yet
                </p>
                <button
                  className="mt-2 text-primary text-sm font-semibold"
                  onClick={() => navigate("/app/donor")}
                >
                  View scholarships
                </button>
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight">
              My Certificates
            </h2>
            <button
              className="text-primary text-sm font-semibold"
              onClick={() => navigate("/app/certificates")}
            >
              View all
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {certificates.slice(0, 3).map((certificate) => (
              <div
                key={certificate.id}
                className="min-w-[140px] bg-white dark:bg-slate-900 p-4 rounded-xl border border-primary/10 flex flex-col items-center text-center shadow-sm"
              >
                <div className="size-16 bg-primary/5 rounded-full flex items-center justify-center mb-3 text-primary">
                  <span className="material-symbols-outlined text-3xl">
                    verified
                  </span>
                </div>
                <p className="text-xs font-bold mb-1">
                  {certificate.courseName}
                </p>
                <p className="text-[10px] text-slate-400">
                  Blockchain Verified
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default StudentDashboard;
