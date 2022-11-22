import React from "react";
import { FileUpload } from "../components/FileUpload";
import LogoutButton from "../components/LogoutButton";

export function UploadScreen (){
  return (
    <main className="column">
      <FileUpload />
      <LogoutButton />
    </main>
  );
}