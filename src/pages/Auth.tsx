
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [type, setType] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const nav = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, _session) => {
      setSession(_session);
      if (_session) nav("/", { replace: true });
    });
    // בדיקה אם כבר מחובר
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) nav("/", { replace: true });
    });
    return () => subscription.unsubscribe();
  }, [nav]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    if (type === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErr(error.message);
    } else {
      // signUp מחייב תמיד לפרט emailRedirectTo (חובה לפי Lovable)
      const redirectTo = `${window.location.origin}/`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectTo },
      });
      if (error) setErr(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md w-full border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-800 text-center mb-4" dir="rtl">
          {type === "login" ? "התחברות" : "הרשמה"}
        </h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Input
            type="email"
            placeholder="אימייל"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            autoComplete="username"
          />
          <Input
            type="password"
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={type === "login" ? "current-password" : "new-password"}
          />
          {err && <div className="text-red-600 text-sm text-center">{err}</div>}
          <Button className="w-full mt-2" type="submit" disabled={loading}>
            {loading ? "טוען..." : type === "login" ? "התחבר" : "הרשמה"}
          </Button>
        </form>
        <div className="flex justify-between mt-4 text-sm">
          <button className="underline text-blue-600" type="button" onClick={() => setType(type === "login" ? "signup" : "login")}>
            {type === "login" ? "אין לך חשבון? הרשמה" : "יש לך חשבון? התחבר"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
