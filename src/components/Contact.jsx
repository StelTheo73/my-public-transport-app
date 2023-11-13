import { useNavigate } from "react-router-dom";

export const Contact = ({language}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  }

  return (
    <main>
      <div>Contact</div>
      <button onClick={() => handleClick()}>Back To Home</button>
    </main>
  )
}
