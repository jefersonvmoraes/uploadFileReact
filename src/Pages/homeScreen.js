import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Navigate } from "react-router-dom";
import LoginButton from "../components/LoginButton";

export function HomeScreen (){
  const { isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    return <Navigate to="/fileupload"/>
  }
  return (
    <main className="column">
      <h1>Entrar</h1>
      <LoginButton />
    </main>
  ) 

}