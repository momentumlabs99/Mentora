import { useState, useEffect } from "react";
import { fetchStudentCertificates } from "../api/students";
import { useAuth } from "../state/auth";

function CertificateCard({ certificate }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-slate-800">
            {certificate.courseName || certificate.title || "Certificate"}
          </h3>
          {certificate.issuer && (
            <p className="mt-1 text-xs text-slate-500">
              Issued by: {certificate.issuer}
            </p>
          )}
          {certificate.issueDate && (
            <p className="mt-1 text-xs text-slate-500">
              Date: {new Date(certificate.issueDate).toLocaleDateString()}
            </p>
          )}
          {certificate.verificationId && (
            <p className="mt-1 text-xs font-mono text-slate-400">
              ID: {certificate.verificationId}
            </p>
          )}
        </div>
        <div className="flex-none rounded-lg bg-teal-deep/10 px-3 py-2 text-center">
          <svg
            className="mx-auto h-5 w-5 text-teal-deep"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function CertificatesPage() {
  const { token, user } = useAuth();
  const [certificates, setCertificates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadCertificates = async () => {
    if (!user?.userId && !user?.studentId) {
      setError("Student ID not available");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const data = await fetchStudentCertificates(
        user.studentId || user.userId,
        token,
      );
      setCertificates(data);
    } catch (err) {
      setError(err.message || "Unable to load certificates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, [user, token]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 p-4 shadow-card">
        <div>
          <h2 className="text-lg font-bold text-slate-900">My Certificates</h2>
          <p className="mt-0.5 text-xs text-slate-600">
            View and verify all your earned certificates
          </p>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-teal-deep border-t-transparent" />
        </div>
      )}

      {error && (
        <div className="rounded-2xl bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
          {error}
        </div>
      )}

      {/* Certificates List */}
      {!loading && !error && certificates && certificates.length > 0 && (
        <div>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            Earned Certificates
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {certificates.map((cert) => (
              <CertificateCard
                key={cert.id || cert.certificateId || cert._id}
                certificate={cert}
              />
            ))}
          </div>
        </div>
      )}

      {!loading && !error && certificates && certificates.length === 0 && (
        <div className="rounded-2xl bg-surface p-6 text-center">
          <svg
            className="mx-auto h-12 w-12 text-slate-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <p className="mt-3 text-sm font-medium text-slate-500">
            You haven't earned any certificates yet
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Complete courses to earn certificates
          </p>
        </div>
      )}
    </div>
  );
}

export default CertificatesPage;
