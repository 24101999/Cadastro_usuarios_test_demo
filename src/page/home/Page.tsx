import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Page.module.css";
type Props = {};

interface d {
  id?: number;
  nome?: string;
}

const Page = (props: Props) => {
  const nav = useNavigate();
  const [dado, setDado] = useState<boolean | string | null>(
    sessionStorage.getItem("val")
  );
  const [dados, setDados] = useState<Array<d>>();
  useEffect(() => {
    if (!dado) {
      nav("/");
    }
    axios
      .get("https://henriquedeveloper.com.br/backendSite/index.php")
      .then((res) => {
        setDados(res.data);
      });
  }, []);

  return (
    <div className={styles.page}>
      <h1>Usuarios cadastrados</h1>
      <div className={styles.us}>
        {dados
          ? dados.map((d) => {
              return (
                <div key={d.id} className={styles.users}>
                  <p>{d.nome}</p>
                  <div className={styles.line}></div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Page;
