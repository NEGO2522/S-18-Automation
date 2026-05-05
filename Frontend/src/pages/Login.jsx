import { useSearchParams } from 'react-router-dom';

const LOGO = 'https://upload.wikimedia.org/wikipedia/en/f/f4/Poornima_University.png';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const BG2 = 'https://content.jdmagicbox.com/comp/jaipur/g3/0141px141.x141.230201230302.m1g3/catalogue/school-of-design-and-arts-poornima-university-vidhani-jaipur-colleges-0hpavyad5r.jpg';
const BG1 = 'https://poornima.edu.in/assets/images/Online_meta.png';

const LogoFallback = ({ size = 36 }) => (
  <div style={{
    width: size, height: size,
    background: '#3C3489', borderRadius: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 700, fontSize: size * 0.36, color: 'white',
  }}>PU</div>
);

function Login() {
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">

      {/* BG images */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${BG2}')` }} />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `url('${BG1}')`,
            maskImage: 'linear-gradient(to right, black 0%, transparent 60%)',
            WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.60) 50%, rgba(0,0,0,0.75) 100%)' }}
      />

      {/* Navbar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5 z-20">
        <div className="flex items-center gap-3">
          <img
            src={LOGO}
            alt="Poornima University"
            className="h-10 w-10 object-cover rounded-full bg-white shadow-sm"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.insertAdjacentHTML('afterend',
                '<div style="display:flex;align-items:center;gap:10px"><div style="width:36px;height:36px;background:#3C3489;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;color:white">PU</div><span style="color:white;font-weight:600;font-size:15px">Poornima University</span></div>'
              );
            }}
          />
        </div>
        <div
          className="flex items-center gap-2 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm"
          style={{ background: 'rgba(0,0,0,0.3)' }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>Portal Active</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-5xl mx-4 flex items-center justify-between gap-8">

        {/* LEFT — copy */}
        <div className="hidden lg:flex flex-col flex-1 pr-8">
          <div
            className="text-xs font-semibold px-3 py-1.5 rounded-full inline-block mb-6 w-fit"
            style={{ color: '#c4b5fd', backgroundColor: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.25)' }}
          >
            Student Participation Portal · 2025
          </div>
          <h1 className="text-6xl font-extrabold text-white leading-none tracking-tight mb-4">
            S18<br />
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>Automation</span>
          </h1>
          <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.8 }}>
            Hackathons, events, meetups mein participate karo<br />
            aur bonus attendance pao — bina ek bhi physical form bhare.
          </p>
          <div className="flex flex-col gap-3">
            {[
              { num: '01', text: 'Online S18 form submit karo' },
              { num: '02', text: 'Tutor → HOD → Chief Proctor digital approval' },
              { num: '03', text: 'Bonus attendance auto credit' },
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-4">
                <span className="text-xs font-mono font-bold w-6" style={{ color: 'rgba(167,139,250,0.6)' }}>{s.num}</span>
                <div className="h-px w-5" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Glassmorphism card */}
        <div className="w-full lg:w-[400px] flex-shrink-0">
          <div
            className="rounded-2xl p-8"
            style={{
              background: 'rgba(255, 255, 255, 0.07)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img
                src={LOGO}
                alt="Poornima University"
                className="h-16 w-16 object-cover rounded-full bg-white shadow-md"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.insertAdjacentHTML('afterend',
                    '<div style="display:flex;align-items:center;gap:10px"><div style="width:48px;height:48px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:18px;color:white">PU</div><div><div style="color:white;font-weight:bold;font-size:17px">Poornima</div><div style="color:rgba(255,255,255,0.45);font-size:13px">University</div></div></div>'
                  );
                }}
              />
            </div>

            {/* Heading */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2" style={{ color: 'rgba(255,255,255,0.95)' }}>
                Welcome Back
              </h2>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Sign in with your university account
              </p>
            </div>

            {/* Error */}
            {error && (
              <div
                className="rounded-xl p-4 mb-6 flex items-start gap-3 text-sm"
                style={{
                  background: 'rgba(239,68,68,0.10)',
                  border: '1px solid rgba(239,68,68,0.25)',
                  color: '#fca5a5',
                }}
              >
                <span className="mt-0.5">⚠️</span>
                <span>
                  {error === 'invalid_domain'
                    ? 'Only @poornima.edu.in accounts are allowed.'
                    : error === 'auth_failed'
                    ? 'Google login failed. Please try again.'
                    : decodeURIComponent(error)}
                </span>
              </div>
            )}

            {/* Google Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl font-medium transition-all duration-150 focus:outline-none"
              style={{
                background: 'rgba(255,255,255,0.09)',
                border: '1px solid rgba(255,255,255,0.16)',
                color: 'rgba(255,255,255,0.88)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.26)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)';
              }}
            >
              <GoogleIcon />
              Continue with Google
            </button>

            {/* Domain note */}
            <div className="mt-6 text-center">
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.22)' }}>
                Restricted to{' '}
                <span style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>
                  @poornima.edu.in
                </span>
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { val: 'S18', label: 'Form Online' },
              { val: '4x', label: 'Faster' },
              { val: '0', label: 'Paperwork' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-white font-bold text-lg">{s.val}</div>
                <div className="text-xs mt-1 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.28)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center z-10">
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.18)' }}>
          2025 Poornima University - Jaipur, Rajasthan
        </p>
      </div>
    </div>
  );
}

export default Login;
