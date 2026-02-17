import React, { useState, useEffect } from "react";
import {
  UserPlus,
  Shield,
  CheckCircle,
  Search,
  Mail,
  X,
  Edit2,
  Check,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { ParentLink } from "../../types";

const ParentAccess: React.FC = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [linkedParents, setLinkedParents] = useState<ParentLink[]>([]);
  const [editingEmail, setEditingEmail] = useState<string | null>(null);
  const [newNickname, setNewNickname] = useState("");

  const fetchLinkedParents = async () => {
    if (!user) return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/parent-links?studentId=${user.id}`,
      );
      if (response.ok) {
        const data: ParentLink[] = await response.json();
        setLinkedParents(data);
      }
    } catch (error) {
      console.error("Error fetching linked parents:", error);
    }
  };

  useEffect(() => {
    fetchLinkedParents();
  }, [user, fetchLinkedParents]);

  const handleUpdateNickname = async (parentEmail: string) => {
    if (!newNickname || !user) return;
    try {
      const response = await fetch("http://localhost:5000/api/parent-links", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: user.id,
          parentEmail,
          nickname: newNickname,
        }),
      });
      if (response.ok) {
        setEditingEmail(null);
        setNewNickname("");
        fetchLinkedParents();
      }
    } catch (error) {
      console.error("Error updating nickname:", error);
    }
  };

  const handleGrantAccess = async () => {
    if (!email || !user) return;
    setIsSubmitting(true);
    setMessage(null);
    try {
      const response = await fetch("http://localhost:5000/api/parent-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: user.id,
          parentEmail: email,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage({
          type: "success",
          text: "Access granted! Your parent can now see your grades and attendance.",
        });
        setEmail("");
        fetchLinkedParents();
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to grant access.",
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: "Server error. Is the backend running?",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
              <Shield size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                Parent Access
              </h1>
              <p className="text-gray-500 font-medium tracking-tight">
                Manage who can view your academic progress
              </p>
            </div>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-2xl mb-8">
            <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <CheckCircle size={18} /> How it works
            </h3>
            <p className="text-sm text-blue-800 leading-relaxed">
              To protect your privacy, parents do not have access to your grades
              by default. When you add a parent's email below, they will be able
              to see your overall grades in each course and your attendance
              stats on their dashboard.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                Parent's Email Address
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="email"
                    placeholder="parent@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 font-bold tracking-tight transition-all"
                  />
                </div>
                <button
                  onClick={handleGrantAccess}
                  disabled={!email || isSubmitting}
                  className="px-8 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-gray-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    "Processing..."
                  ) : (
                    <>
                      <UserPlus size={18} /> Grant Access
                    </>
                  )}
                </button>
              </div>
            </div>

            {message && (
              <div
                className={`p-4 rounded-2xl flex items-center gap-3 animate-in zoom-in-95 duration-300 ${
                  message.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-100"
                    : "bg-red-50 text-red-700 border border-red-100"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle size={20} />
                ) : (
                  <X size={20} />
                )}
                <p className="text-sm font-bold">{message.text}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
          <Shield size={20} className="text-gray-400" />
          People with Access
        </h3>
        {linkedParents.length > 0 ? (
          <div className="space-y-4">
            {linkedParents.map((parent, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Mail size={20} />
                  </div>
                  <div className="flex flex-col">
                    {editingEmail === parent.parentEmail ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newNickname}
                          onChange={(e) => setNewNickname(e.target.value)}
                          className="px-3 py-1 bg-white border border-blue-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10"
                          autoFocus
                        />
                        <button
                          onClick={() =>
                            handleUpdateNickname(parent.parentEmail)
                          }
                          className="p-1 text-green-600 hover:bg-green-50 rounded-lg"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={() => setEditingEmail(null)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-900">
                          {parent.nickname}
                        </span>
                        {parent.nickname !== parent.parentEmail && (
                          <span className="text-xs text-gray-400 font-medium">
                            ({parent.parentEmail})
                          </span>
                        )}
                        <button
                          onClick={() => {
                            setEditingEmail(parent.parentEmail);
                            setNewNickname(
                              parent.nickname || parent.parentEmail,
                            );
                          }}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Edit2 size={14} />
                        </button>
                      </div>
                    )}
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                      Added on {new Date(parent.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button className="text-xs font-bold text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                  Revoke Access
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
            <Search size={40} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">
              None of your parents have access yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentAccess;
