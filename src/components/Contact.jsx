import { useNavigate } from "react-router-dom";

export const Contact = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  }

  return (
    <main>
      <div className="component">Contact</div>
      <button onClick={() => handleClick()}>Back To Home</button>
    </main>
  )
}
