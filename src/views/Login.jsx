import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../utils/http";
import "./Login.css";

const Login = () => {
  const toast = useRef(null);
  const api = useApi();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const body = {
        email: email,
        password: password,
      };

      const { data } = await api.post("/login", body);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setErrors(error.response.data.errors);
      toast.current.show({
        severity: "error",
        detail: error.response.data.message,
      });
    }
  }
  return (
    <Card title="Login" className="login">
      <Toast ref={toast} />
      <form onSubmit={handleLogin}>
        <InputText
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          invalid={errors?.email}
        />
        <InputText
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          invalid={errors?.password}
        />
        <div className="actions">
          <Button link type="button" onClick={() => navigate("/register")}>
            Go to Register
          </Button>
          <Button>Login</Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
