import { useEffect, useState } from "react";
import { fetchNgoProfile, fetchPublicNgos } from "../api/ngos";
import { useAuth } from "../state/auth";

function NgoPage() {
  const { token, role, signOut } = useAuth();
  const [ngos, setNgos] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fields = [
    { key: "ngoId", label: "NGO ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email", type: "email" },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address" },
    { key: "registrationNumber", label: "Registration Number" },
    { key: "description", label: "Description" },
    { key: "country", label: "Country" },
    { key: "region", label: "Region" },
    { key: "contactPerson", label: "Contact Person" },
    { key: "contactEmail", label: "Contact Email", type: "email" },
    { key: "website", label: "Website", type: "website" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "Created At", type: "date" },
    { key: "updatedAt", label: "Updated At", type: "date" },
  ];

  const loadPublicNgos = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await fetchPublicNgos();
      setNgos(result);
    } catch (err) {
      setError(err.message || "Unable to load NGOs.");
      setNgos(null);
    } finally {
      setLoading(false);
    }
  };

  const loadMyProfile = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await fetchNgoProfile(token);
      setProfile(result);
    } catch (err) {
      setError(err.message || "Unable to load NGO profile.");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPublicNgos();
  }, []);

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

      {/* NGO grid */}
      {ngos && ngos.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ngos.map((ngo) => (
            <div
              key={ngo.id || ngo.ngoId || ngo._id}
              className="rounded-2xl bg-white p-4 shadow-card"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-light text-base font-bold text-teal-deep">
                  {(ngo.name || "N")[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">
                    {ngo.name || "NGO Partner"}
                  </p>
                  {ngo.country && (
                    <p className="text-[11px] text-slate-500">
                      📍 {ngo.country}
                    </p>
                  )}
                </div>
              </div>
              {ngo.focusAreas && (
                <div className="mt-2.5 flex flex-wrap gap-1">
                  {(Array.isArray(ngo.focusAreas)
                    ? ngo.focusAreas
                    : [String(ngo.focusAreas)]
                  ).map((area) => (
                    <span
                      key={area}
                      className="rounded-lg bg-green-light px-2 py-0.5 text-[10px] font-semibold text-green-earth"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Profile */}
      {profile && (
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            My NGO Profile
          </p>
          <div className="space-y-3">
            {fields.map((field) => {
              const value = profile[field.key];
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
                const url = value.startsWith("http")
                  ? value
                  : `https://${value}`;
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
                  <div className="w-20 text-slate-500 text-xs font-medium">
                    {field.label}:
                  </div>
                  <div className="flex-1 text-slate-700 text-xs">
                    <Component {...props}>{displayValue}</Component>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default NgoPage;
