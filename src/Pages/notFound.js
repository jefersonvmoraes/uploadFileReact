import { useNavigate } from "react-router-dom"

export function NotFoundScreen (){
  const navigate = useNavigate()
  return (
    <main className="column">
      <h1>Página não encontrada</h1>
      <button type="button" className="btn btn-outline-primary" onClick={()=>(navigate('/'))}>Voltar</button>
    </main>
  )
}