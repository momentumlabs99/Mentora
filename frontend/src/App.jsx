import { useState } from 'react'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import CourseMarketplace from './pages/CourseMarketplace'
import TransparentPortal from './pages/TransparentPortal'
import VerificationPortal from './pages/VerificationPortal'

function App() {
  const [currentPage, setCurrentPage] = useState('menu')

  const pages = {
    login: <Login />,
    signup: <SignUp />,
    dashboard: <Dashboard />,
    marketplace: <CourseMarketplace />,
    portal: <TransparentPortal />,
    verify: <VerificationPortal />
  }

  if (currentPage !== 'menu') {
    return (
      <div className="relative min-h-screen">
        <button 
          onClick={() => setCurrentPage('menu')}
          className="fixed bottom-4 right-4 z-50 bg-slate-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-slate-800"
        >
          ← Back to Menu
        </button>
        {pages[currentPage]}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center justify-center font-sans text-slate-900">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <h1 className="text-2xl font-bold text-center mb-8 text-slate-800">Mentora UI Templates</h1>
        <div className="flex flex-col gap-4">
          <button onClick={() => setCurrentPage('login')} className="w-full text-left px-6 py-4 rounded-xl border-2 border-slate-100 hover:border-teal-500 hover:bg-teal-50 transition-all font-medium text-slate-700">
            Login Page
          </button>
          <button onClick={() => setCurrentPage('signup')} className="w-full text-left px-6 py-4 rounded-xl border-2 border-slate-100 hover:border-teal-500 hover:bg-teal-50 transition-all font-medium text-slate-700">
            Sign Up Page
          </button>
          <button onClick={() => setCurrentPage('dashboard')} className="w-full text-left px-6 py-4 rounded-xl border-2 border-slate-100 hover:border-teal-500 hover:bg-teal-50 transition-all font-medium text-slate-700">
            Dashboard
          </button>
          <button onClick={() => setCurrentPage('marketplace')} className="w-full text-left px-6 py-4 rounded-xl border-2 border-slate-100 hover:border-teal-500 hover:bg-teal-50 transition-all font-medium text-slate-700">
            Course Marketplace
          </button>
          <button onClick={() => setCurrentPage('portal')} className="w-full text-left px-6 py-4 rounded-xl border-2 border-slate-100 hover:border-teal-500 hover:bg-teal-50 transition-all font-medium text-slate-700">
            Transparent Portal
          </button>
          <button onClick={() => setCurrentPage('verify')} className="w-full text-left px-6 py-4 rounded-xl border-2 border-slate-100 hover:border-teal-500 hover:bg-teal-50 transition-all font-medium text-slate-700">
            Verification Portal
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
