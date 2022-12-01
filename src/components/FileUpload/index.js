import React, { useState } from "react";
import api from "../../config/configApi";
import { CgTrash } from "react-icons/cg";
import axios from "axios";
import GetUrl from "../GetUrl";
import {
  AiFillFileAdd,
  AiOutlineCloudUpload,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import "./fileUpload.css";
var response;
var result;
const lambdaURL = process.env.REACT_APP_API_ENDPOINT;
console.log(lambdaURL);
export function FileUpload() {
  const [listFile, setListFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({});
  const [viewMessage, setViewMessage] = useState(false);

  function onChangeFile(e) {
    let files = e.target.files;
    if (files) {
      // console.log(e.target.files[0]);
      setListFile([...listFile, files[0]]);
    } else {
      return;
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (listFile.length !== 0) {
      setLoading(true);
      var file = listFile[0];
      var response = await GetUrl(lambdaURL);
      let uploadUrl = await response.data.uploadURL;

      await api
        .put(uploadUrl, file)
        .then((response) => {
          console.log(response);
          console.log("arquivo enviado");
          setLoading(false);
          setViewMessage(true);
          setMessage({
            text: "Arquivo enviado com sucesso!",
            color: "#198754",
          });
          setListFile([]);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setViewMessage(true);
          setMessage({ text: "Erro ao enviar o arquivo!", color: "#dc3545" });
        })
        .finally(() => {
          setTimeout(() => {
            setViewMessage(false);
          }, "3000");
        });
    } else {
      setViewMessage(true);
      setMessage({ text: "Selecione um arquivo!", color: "#dc3545" });
      setTimeout(() => {
        setViewMessage(false);
      }, "3000");
    }
  }

  function removeFile(event) {
    let indexValue = event.currentTarget.value;
    setListFile(listFile.filter((item) => item.name !== indexValue));
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
          <label
            className="btn btn-primary label-input-upload"
            htmlFor="input-upload"
          >
            <span style={{ fontSize: "18px", marginRight: "10px" }}>
              Selecionar arquivo
            </span>
            <AiFillFileAdd size={25} />
          </label>
          <input
            onChange={onChangeFile}
            type="file"
            id="input-upload"
            accept=".csv,.xls,.xlsx,.txt"
            className="input-upload"
          />
        </div>

        {listFile.length !== 0 && (
          <div className="views-file container">
            {listFile.map((item, index) => {
              return (
                <ul key={index}>
                  <li>
                    <div className="view-file-item">
                      <label>{item?.name}</label>
                      <button
                        onClick={removeFile}
                        type="button"
                        className="btn btn-outline-danger"
                        value={item?.name}
                      >
                        <CgTrash size={25} />
                      </button>
                    </div>
                  </li>
                </ul>
              );
            })}
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
