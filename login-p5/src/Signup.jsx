/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = () => {
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
  };

  return (
    <div className="mainContainer">
    <div>
        <button className="bg-primary" onClick={() => {navigate('/')}} > Go back</button>
    </div>
      <div className="titleContainer">
        <div>Crea a tu cuenta</div>
      </div>
      <br />
      <div className="inputContainer">
        <input
          value={email}
          placeholder="Ingresa tu correo electrónico"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <input
          value={password}
          placeholder="Ingresa tu contraseña"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
          type="password"
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
        <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Confirma tu contraseña"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
          type="password"
        />
        <label className="errorLabel">{passwordError}</label>
        </div>

      <br />
        <div className={"inputContainer"}>
            <input
            value={password}
            placeholder="Ingresa tu nombre"
            onChange={(ev) => setPassword(ev.target.value)}
            className={"inputBox"}
            />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Ingresar"}
        />
      </div>
    </div>
  );
};

export default Signup;
