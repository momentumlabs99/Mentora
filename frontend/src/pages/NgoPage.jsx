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

  useEffect(() => {
    loadPublicNgos();
  }, []);

  return (
    <section className="space-y-3 rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-200">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Partner NGOs</h2>
          <p className="mt-0.5 text-xs text-slate-600">
            Discover organizations delivering Mentora programs on the ground.
          </p>
        </div>
        <button
          type="button"
          onClick={loadMyProfile}
          className="mt-1 inline-flex items-center justify-center rounded-full bg-teal-deep px-3 py-1.5 text-xs font-semibold text-white shadow-sm sm:mt-0"
        >
          View my NGO profile
        </button>
      </div>

      {loading && <p className="text-xs text-slate-600">Loading NGO data…</p>}
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}

      {ngos && ngos.length > 0 && (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {ngos.map((ngo) => (
            <article
              key={ngo.id || ngo.ngoId || ngo._id}
              className="rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-xs"
            >
              <p className="text-sm font-semibold text-slate-900">
                {ngo.name || 'NGO Partner'}
              </p>
              {ngo.country && (
                <p className="mt-0.5 text-[11px] text-slate-600">Country: {ngo.country}</p>
              )}
              {ngo.focusAreas && (
                <p className="mt-1 text-[11px] text-slate-600">
                  Focus:{' '}
                  {Array.isArray(ngo.focusAreas)
                    ? ngo.focusAreas.join(', ')
                    : String(ngo.focusAreas)}
                </p>
              )}
            </article>
          ))}
        </div>
      )}

      {profile && (
        <div className="space-y-1">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            My NGO profile
          </h3>
          <pre className="max-h-56 overflow-auto rounded-xl bg-slate-900 p-3 text-[11px] leading-relaxed text-slate-50">
{JSON.stringify(profile, null, 2)}
          </pre>
        </div>
      )}
    </section>
  );
}

export default NgoPage;

