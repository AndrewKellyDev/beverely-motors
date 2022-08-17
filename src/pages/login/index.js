import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth/action";
import { useRef, useState } from "react";
import axios from "axios";
import { api_url } from "../../config/api";
import Swal from "sweetalert2";

export const LoginPage = () => {
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleLogin = async (ev) => {
    ev.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);
    const res = await axios.post(`${api_url}/auth/login`, {
      userName: userNameRef.current.value,
      password: passwordRef.current.value,
    });
    if (res.data.authentication === true) {
      dispatch(login(true));
      navigate(state?.path || "/admin");
      Swal.fire("Login Success");
      setLoading(false);
    } else {
      setError("Authentication Error");
      setLoading(false);
    }
  };
  return (
    <div className="py-40">
      <form
        onSubmit={(ev) => handleLogin(ev)}
        className="border max-w-sm mx-auto p-10 rounded-lg flex flex-col justify-center"
      >
        <div className="text-center font-bold text-2xl text-primary mb-4">
          Login
        </div>
        <div>User Name:</div>
        <input
          ref={userNameRef}
          className="border mt-2 px-3 py-1 rounded"
          required
        />
        <div className="mt-3">Password:</div>
        <input
          ref={passwordRef}
          type={"password"}
          className="border mt-2 px-3 py-1 rounded"
          required
        />
        {error && <div className="text-red-700 mt-1">{error}</div>}
        <button
          type="submit"
          className="bg-primary text-white rounded mt-10 p-2"
        >
          {loading ? "Loading..." : "LogIn"}
        </button>
      </form>
    </div>
  );
};
