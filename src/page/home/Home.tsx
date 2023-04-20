import React from "react";
import { useState, ChangeEvent } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { type } from "os";
import axios from "axios";
type Props = {};

type inputs = string;

const Home = (props: Props) => {
  const regexSenha = /^[a-z0-9]+$/i;
  const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const [email, setEmail] = useState<inputs>("");
  const [senha, setSenha] = useState<inputs>("");
  const [msg, setMsg] = useState<string>("");
  const [ms, setMs] = useState<string>("");
  const [inp, setInp] = useState<string>("");

  const nav = useNavigate();

  const Submit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !senha) {
      setMs("Campo vazio");
      setInp(styles.inputActive);
      nav("/");
    } else {
      setInp("");
    }
    if (!regEmail.test(email)) {
      setMsg("Tipo de email invalido");
      nav("/");
    } else if (!regexSenha.test(senha)) {
      setMsg("Senha invalida");
      nav("/");
    } else {
      setMsg("");
      axios
        .post("https://henriquedeveloper.com.br/backendSite/val.php", {
          email: email,
          senha: senha,
        })
        .then((res) => {
          console.log(res.data);
          if (!res.data) {
            setMsg("Email ou senha incorreto");
            nav("/");
            sessionStorage.setItem("val", "");
          } else if (res.data) {
            // setMsg("");
            nav("/page");
            sessionStorage.setItem("val", res.data);
          }
        });
    }
  };

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <h2>{msg}</h2>
      <form onSubmit={Submit}>
        <label>
          <span>E-mail</span>
          <input
            className={inp}
            type="email"
            placeholder={ms}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </label>
        <label>
          <span>Senha</span>
          <input
            className={inp}
            type="password"
            placeholder={ms}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSenha(e.target.value)
            }
          />
        </label>
        <button type="submit">ENTRAR</button>
      </form>

      <p
        style={{ cursor: "pointer", padding: "5px" }}
        onClick={() => nav("/cadastro")}
      >
        Cadastre-se
      </p>
    </div>
  );
};

export default Home;
