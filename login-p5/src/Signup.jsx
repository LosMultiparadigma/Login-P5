/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "aws-amplify/auth";
import currentConfig from "./main";


async function signUpUser({ username, password, email, phone_number }) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username,
      password,
      attributes: {
        email,
        phone_number,
      },
      autoSignIn: true,
    });

    console.log(userId);
  } catch (error) {
    console.error("Error signing up user", error);
  }
}

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const onButtonClick = async () => {
    setEmailError("");
    setPasswordError("");

    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Por favor ingresa un correo electrónico válido");
      return;
    }

    if (!password || password.length < 7) {
      setPasswordError("Tu contraseña debe tener al menos 7 caracteres");
      return;
    }

    try {
      if (password !== confirmPassword) {
        setPasswordError("Las contraseñas no coinciden");
        return;
      }

      const result = await signUpUser({
        username,
        password,
        email,
        phone_number: phoneNumber,
      });

      console.log("Sign up success:", result);
      
      navigate("/dashboard"); // Navegar a otra página tras el registro exitoso
    } catch (error) {
      console.error("Error signing up:", error);
      // Mostrar un mensaje de error genérico
      setPasswordError("Error en el registro, intente de nuevo.");
    }
  };

  return (
    <div className="mainContainer">
      <div>
        <button
          className="bg-primary"
          onClick={() => {
            navigate("/");
          }}
        >
          Go back
        </button>
      </div>
      <div className="titleContainer">
        <div>Crea a tu cuenta</div>
      </div>
      <br />
{/*       Correo electrónico */}
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
      <div className="inputContainer">
        <input
          value={confirmPassword}
          placeholder="Confirma tu contraseña"
          onChange={(ev) => setConfirmPassword(ev.target.value)}
          className={"inputBox"}
          type="password"
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <input
          value={username}
          placeholder="Ingresa tu nombre de usuario"
          onChange={(ev) => setUsername(ev.target.value)}
          className={"inputBox"}
        />
      </div>
      <br />
      <div className="inputContainer">
        <input
          value={phoneNumber}
          placeholder="Número de teléfono"
          onChange={(ev) => setPhoneNumber(ev.target.value)}
          className={"inputBox"}
        />
      </div>
      <br />
      <input
        className="inputButton bg-primary"
        type="button"
        onClick={onButtonClick}
        value="Ingresar"
      />
    </div>
  );
};

export default Signup;
