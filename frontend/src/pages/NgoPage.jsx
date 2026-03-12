import { useEffect, useState } from 'react';
import { fetchNgoProfile, fetchPublicNgos } from '../api/ngos';
import { useAuth } from '../state/auth';

function NgoPage() {
  const { token } = useAuth();
  const [ngos, setNgos] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadPublicNgos = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await fetchPublicNgos();
      setNgos(result);
    } catch (err) {
      setError(err.message || 'Unable to load NGOs.');
      setNgos(null);
    } finally {
      setLoading(false);
    }
  };

  const loadMyProfile = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await fetchNgoProfile(token);
      setProfile(result);
    } catch (err) {
      setError(err.message || 'Unable to load NGO profile.');
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadPublicNgos(); }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="rounded-2xl bg-white p-4 shadow-card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Partner NGOs</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Organizations delivering Mentora programs on the ground.
            </p>
          </div>
          <button
            type="button"
            onClick={loadMyProfile}
            className="flex-none rounded-xl bg-teal-deep px-3 py-2 text-xs font-semibold text-white shadow-card transition active:scale-95"
          >
            My profile
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-teal-deep border-t-transparent" />
        </div>
      )}

      {error && (
        <div className="rounded-2xl bg-red-50 px-4 py-3 text-xs font-medium text-red-600">{error}</div>
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
                  {(ngo.name || 'N')[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">{ngo.name || 'NGO Partner'}</p>
                  {ngo.country && (
                    <p className="text-[11px] text-slate-500">📍 {ngo.country}</p>
                  )}
                </div>
              </div>
              {ngo.focusAreas && (
                <div className="mt-2.5 flex flex-wrap gap-1">
                  {(Array.isArray(ngo.focusAreas) ? ngo.focusAreas : [String(ngo.focusAreas)]).map(
                    (area) => (
                      <span
                        key={area}
                        className="rounded-lg bg-green-light px-2 py-0.5 text-[10px] font-semibold text-green-earth"
                      >
                        {area}
                      </span>
                    ),
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Profile */}
      {profile && (
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">My NGO Profile</p>
          <pre className="max-h-56 overflow-auto rounded-xl bg-slate-900 p-4 text-xs leading-relaxed text-slate-100">
{JSON.stringify(profile, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default NgoPage;
