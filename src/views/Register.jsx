import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../utils/http";
import "./Register.css";

const Register = () => {
  const toast = useRef(null);
  const api = useApi();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState({});

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const body = {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      };

      const { data } = await api.post("/register", body);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
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
    <Card title="Register" className="register">
      <Toast ref={toast} />
      <form onSubmit={handleRegister}>
        <InputText
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          invalid={errors?.name}
        />
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
        <InputText
          type="password"
          placeholder="Password Confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          invalid={errors?.password}
        />
        <div className="actions">
          <Button link type="button" onClick={() => navigate("/login")}>
            Go to Login
          </Button>
          <Button>Register</Button>
        </div>
      </form>
    </Card>
  );
};

export default Register;
