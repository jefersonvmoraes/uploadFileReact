import React, { useState } from "react";
import api from "../../config/configApi";
import {
  AiFillFileAdd,
  AiOutlineCloudUpload,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import "./fileUpload.css";


export function FileUpload() {

  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({});
  const [viewMessage, setViewMessage] = useState(false);
  
  function onChangeFile(e) {
    setViewMessage(false);
    let file = e.target.files;
    if (file[0].name !== "") {
      setFile([file[0]]);
    } 
    return;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (file.length !== 0) {
      let formData = new FormData();
      formData.append("file", file);
      console.log(file)
      setLoading(true);
      setViewMessage(false);

      const headers = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await api
        .post("/upload-file", formData, headers)
        .then((response) => {
          console.log("arvivo enviado");
          setLoading(false);
          setViewMessage(true);
          setMessage({ text: "Arquivo enviado com sucesso!", color: "#198754"});
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setViewMessage(true);
          setMessage({ text: "Erro ao enviar o arquivo!", color: "#dc3545" });
        })
    } else {
      setViewMessage(true);
      setMessage({ text: "Selecione um arquivo!", color: "#dc3545" });
      setTimeout(() => {
        setViewMessage(false);
      }, "3000");
    }
  }
  return (
    <div className="upload-area container">
      <div className="text-center mt-4">
        <h1>
          Upload Files <AiOutlineCloudUpload />
        </h1>
      </div>
      {loading && (
        <div className="text-center mt-4 loading">
          <AiOutlineLoading3Quarters size={40} />
        </div>
      )}
      {viewMessage && (
        <div>
          <p
            className="text-center mt-4"
            style={{
              color: message.color,
              fontSize: "20px",
            }}
          >
            {message.text}
          </p>
        </div>
      )}

      <form className="form" onSubmit={onSubmit}>
        <div className="text-center mt-4 button-upload-area">
          <label className="btn btn-primary label-input-upload" htmlFor="input-upload">
            <span style={{ fontSize: "18px", marginRight: "10px" }}>
              Selecionar arquivo
            </span>
            <AiFillFileAdd size={25} />
          </label>
          <input
            onChange={onChangeFile}
            type="file"
            id="input-upload"
            accept=".txt"
            className="input-upload"
          />
        </div>

        {file.length !== 0 && (
          <div className="views-file container"> 
            <ul>
              <li>
                <div className="view-file-item">
                  <label>{file[0]?.name}</label>
                </div>
              </li>
            </ul>            
          </div>
        )}
        <div className="d-grid gap-2 col-6 mx-auto btn-submit">
          <button className="btn btn-primary" type="submit">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
