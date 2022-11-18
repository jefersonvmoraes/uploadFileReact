import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { FileUpload } from "./components/FileUpload";
import Profile from "./components/Profile";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isLoading, error, isAuthenticated } = useAuth0();
  return isAuthenticated ? (
    <main className="column">
      <FileUpload />
      <LogoutButton />
    </main>
  ) : (
    <main className="column">
      <h1>Entrar</h1>
      {error && <p>Erro de autenticação</p>}
      {!error && isLoading && <p>Carregando...</p>}
      {!error && !isLoading && (
        <>
          <LoginButton />
          <LogoutButton />
          <Profile />
        </>
      )}
    </main>
  );
}

export default App;
