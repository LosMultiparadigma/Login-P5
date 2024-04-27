/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from 'aws-amplify/auth';

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = async () => {
    setEmailError("");
    setPasswordError("");

    if ("" === email) {
      setEmailError("Por favor ingresa tu correo electrónico");
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Por favor ingresa un correo electrónico válido");
      return;
    }

    if ("" === password) {
      setPasswordError("Por favor ingresa tu contraseña");
      return;
    }

    if (password.length < 7) {
      setPasswordError("Tu contraseña debe tener al menos 7 caracteres");
      return;
    }

    try {
      const { isSignedIn, nextStep } = await signIn({ username: email, password });
      if (isSignedIn) {
        navigate('/dashboard'); // Asume que existe una ruta '/dashboard'
      } else if (nextStep) {
        // Manejar los próximos pasos según la respuesta de Amplify
        console.log(nextStep);
      }
    } catch (error) {
      console.error('error signing in:', error);
      setPasswordError(error.message); // Mostrar errores específicos de inicio de sesión al usuario
    }
  };

  return (
    <div className="mainContainer">
    <div className="text-gray-50">
        <button className="bg-secondary  " onClick={() => {navigate('/')}} > Go Back</button>
    </div>
      <div className={"titleContainer"}>
        <div>Ingresa a tu cuenta</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Ingresa tu correo electrónico"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Ingresa tu contraseña"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className="bg-primary"
          type="button"
          onClick={onButtonClick}
          value={"Ingresar"}
        />
      </div>
    </div>
  );
};

export default Login;
