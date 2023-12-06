import { useNavigate } from "react-router-dom";
import "./Contact.css";
import { ContactCard } from "./ContactCard";

export const Contact = ({language}) => {
  const navigate = useNavigate();

  return (
    <main>
      <div className="d-flex flex-direction-row gap-2">
        <ContactCard name={"Myron Giannakis"} />
        <ContactCard name={"Stelios Theofilou"} />
      </div>
      <br/>
      <button className="btn btn-secondary d-flex gap-1" onClick={() => navigate("/")}>
        <i class="bi bi-house-fill"></i>
        Back To Home
      </button>
    </main>
  )
}
