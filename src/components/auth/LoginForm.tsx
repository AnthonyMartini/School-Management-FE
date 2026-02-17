import React, { useState } from "react";
import { Mail, Lock, Loader } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
    } catch {
      setError("Invalid email or password");
    }
  };

  const demoAccounts = [
    { email: "student@school.edu", role: "Student", password: "student123", color: "from-blue-400 to-blue-600" },
    { email: "teacher@school.edu", role: "Teacher", password: "teacher123", color: "from-purple-400 to-purple-600" },
    { email: "admin@school.edu", role: "Admin", password: "admin123", color: "from-red-400 to-red-600" },
    { email: "parent@school.edu", role: "Parent", password: "parent123", color: "from-green-400 to-green-600" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform">
              <span className="text-white font-black text-3xl">S</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-4xl font-black text-gray-900 tracking-tight">
            School Hub
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500 font-medium tracking-wide uppercase">
            Sign in to your learning portal
          </p>
        </div>

        <form className="mt-8 space-y-6 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden group" onSubmit={handleSubmit}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-900"
                  placeholder="name@school.edu"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-900"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-xs font-bold text-center bg-red-50 py-2 rounded-lg animate-bounce">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-700 hover:scale-[1.02] active:scale-95 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader className="animate-spin h-5 w-5" />
              ) : (
                "Sign In to School Hub"
              )}
            </button>
          </div>
        </form>

        <div className="mt-10">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-gray-50 text-gray-400 font-bold uppercase tracking-widest">Quick Demo Login</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                onClick={() => {
                  setEmail(account.email);
                  setPassword(account.password);
                }}
                className="group relative w-full text-left p-4 bg-white border border-gray-100 rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:border-transparent active:scale-95 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${account.color} group-hover:w-full group-hover:opacity-[0.03] transition-all`}></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-gray-900 text-sm group-hover:text-blue-600 transition-colors uppercase tracking-tight">{account.role}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors`}>Select</span>
                  </div>
                  <p className="text-[11px] text-gray-400 group-hover:text-gray-600 mt-1 font-medium">{account.email}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
