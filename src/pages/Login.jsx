import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("STEP 1");
  
    setError("");
    setLoading(true);
  
    try {
      console.log("STEP 2");
  
      // في ملف تسجيل الدخول
    const res = await api.post("/token/", { username, password }); 


  
      console.log("STEP 3", res.data);
  
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
  
      console.log("STEP 4 BEFORE NAV");
  
      navigate("/home", { replace: true });
  
      console.log("STEP 5 AFTER NAV");
  
    } catch (err) {
      console.log("ERROR:", err);
    } finally {
      console.log("STEP 6 FINALLY");
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* ✅ هنا التعديل */}
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Log in</h2>

        {error && <p className="auth-error">{error}</p>}

        <div className="form">

          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ✅ احذف onClick */}
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>

        </div>
      </form>
    </div>
  );
}
export default Login;