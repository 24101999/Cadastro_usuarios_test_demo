import React from "react";
import { useState, ChangeEvent } from "react";
import styles from "./Cadastro.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type dados = string;

const Cadastro = () => {
  const regexSenha = /^[a-z0-9]+$/i;
  const regexNome = /^[a-z à-ú À-Ú]+$/i;
  const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const [nome, setNome] = useState<dados>("");
  const [email, setEmail] = useState<dados>("");
  const [senha, setSenha] = useState<dados>("");
  const [msg, setMsg] = useState<dados>("");
  const [inp, setInp] = useState<string>("");
  const [ms, setMs] = useState<dados>("");
  const nav = useNavigate();
  const Submit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    nav("/");
    if (!email || !senha || !nome) {
      setMs("Campo vazio");
      setInp(styles.inputActive);
      nav("/cadastro");
    }
    if (!regexNome.test(nome)) {
      setMsg("Nome invalido");
      nav("/cadastro");
    } else if (!regEmail.test(email)) {
      setMsg("Tipo de email invalido");
      nav("/cadastro");
    } else if (!regexSenha.test(senha)) {
      setMsg("Senha invalida");
      nav("/cadastro");
    } else {
      setInp("");
      nav("/");
      axios.post("https://henriquedeveloper.com.br/backendSite/insert.php", {
        nome,
        email,
        senha,
      });
      //   setMs("");
      setMsg("");
      setNome("");
      setEmail("");
      setSenha("");
      alert("Cadastro realizado com sucesso");
    }
  };

  return (
    <div className={styles.cadastro}>
      <h1>Cadastro</h1>
      <h2>{msg}</h2>
      <form onSubmit={Submit}>
        <label>
          <span>Nome</span>
          <input
            className={inp}
            value={nome}
            placeholder={ms}
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNome(e.target.value)
            }
          />
        </label>
        <label>
          <span>Email</span>
          <input
            className={inp}
            value={email}
            placeholder={ms}
            type="email"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </label>
        <label>
          <span>Senha</span>
          <input
            className={inp}
            value={senha}
            placeholder={ms}
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSenha(e.target.value)
            }
          />
        </label>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;
