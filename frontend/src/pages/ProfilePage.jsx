import { useState, useEffect } from "react";
import { useAuth } from "../state/auth";
import { fetchUserProfile } from "../api/auth";

function ProfilePage() {
  const { token, role, user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, [token]);

  const loadProfile = async () => {
    if (!token) return;

    setLoading(true);
    setError("");
    try {
      const data = await fetchUserProfile(token);
      setProfileData(data);
    } catch (err) {
      setError(err.message || "Unable to load profile");
    } finally {
      setLoading(false);
    }
  };

  const renderProfileFields = () => {
    // Combine user data from auth context and API response
    const userData = profileData?.user || user;
    const ngoData = profileData?.ngo;

    let fields = [];

    if (role === "STUDENT") {
      fields = [
        { key: "name", label: "Full Name" },
        { key: "email", label: "Email", type: "email" },
        { key: "studentId", label: "Student ID" },
        { key: "phone", label: "Phone", type: "phone" },
        { key: "address", label: "Address" },
        { key: "department", label: "Department" },
        { key: "course", label: "Course" },
        { key: "year", label: "Year of Study" },
        { key: "createdAt", label: "Joined On", type: "date" },
      ];
    } else if (role === "NGO") {
      fields = [
        { key: "ngoId", label: "NGO ID" },
        { key: "name", label: "NGO Name" },
        { key: "email", label: "Email", type: "email" },
        { key: "phone", label: "Phone", type: "phone" },
        { key: "address", label: "Address" },
        { key: "registrationNumber", label: "Registration Number" },
        { key: "description", label: "Description" },
        { key: "country", label: "Country" },
        { key: "region", label: "Region" },
        { key: "contactPerson", label: "Contact Person" },
        { key: "contactEmail", label: "Contact Email", type: "email" },
        { key: "website", label: "Website", type: "website" },
        { key: "status", label: "Status" },
        { key: "createdAt", label: "Registered On", type: "date" },
      ];
    } else if (role === "ADMIN") {
      fields = [
        { key: "name", label: "Name" },
        { key: "email", label: "Email", type: "email" },
        { key: "phone", label: "Phone", type: "phone" },
        { key: "role", label: "Role" },
        { key: "createdAt", label: "Joined On", type: "date" },
      ];
    } else if (role === "DONOR") {
      fields = [
        { key: "name", label: "Donor Name" },
        { key: "email", label: "Email", type: "email" },
        { key: "phone", label: "Phone", type: "phone" },
        { key: "organization", label: "Organization" },
        { key: "address", label: "Address" },
        { key: "createdAt", label: "Registered On", type: "date" },
      ];
    }

    return fields.map((field) => {
      const value =
        role === "NGO" && ngoData
          ? ngoData[field.key] || userData[field.key]
          : userData[field.key];

      if (value === null || value === undefined || value === "") {
        return null;
      }

      let displayValue = value;
      let Component = "span";
      let props = {};

      if (field.type === "email") {
        Component = "a";
        props.href = `mailto:${value}`;
        props.target = "_blank";
        props.rel = "noopener noreferrer";
      } else if (field.type === "website") {
        Component = "a";
        const url = value.startsWith("http") ? value : `https://${value}`;
        props.href = url;
        props.target = "_blank";
        props.rel = "noopener noreferrer";
        displayValue = value;
      } else if (field.type === "phone") {
        Component = "a";
        props.href = `tel:${value}`;
        props.target = "_blank";
        props.rel = "noopener noreferrer";
      } else if (field.type === "date") {
        const dateOptions = {
          year: "numeric",
          month: "short",
          day: "numeric",
        };
        displayValue = new Date(value).toLocaleDateString(
          undefined,
          dateOptions,
        );
      }

      return (
        <div key={field.key} className="flex items-start">
          <div className="w-24 text-slate-500 text-xs font-medium">
            {field.label}:
          </div>
          <div className="flex-1 text-slate-700 text-xs">
            <Component {...props} className="hover:underline">
              {displayValue}
            </Component>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="space-y-4">
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

      {/* Profile Card */}
      <div className="rounded-2xl bg-white p-4 shadow-card">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          My Profile
        </p>
        <div className="space-y-3">{renderProfileFields()}</div>
      </div>
    </div>
  );
}

export default ProfilePage;
