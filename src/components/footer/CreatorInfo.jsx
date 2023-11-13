import { Link } from "react-router-dom";

export const CreatorInfo = ({
    language,
    name,
    email,
    githubLink,
    linkedinLink,
}) => {
  return (
    <div className="col-12 col-md-6 creator-info d-flex">
        <div className="creator-info-mail-link">
        <Link className="creator-info-link"
                to={`mailto:${email}}`}
                title={`mailto:${email}`}
        >{name}
        </Link>
        </div>
        <div className="">
        <Link className="creator-info-link creator-info-media-link"
                to={`${githubLink}}`} target="_blank"
                title={`${githubLink}}`}>
            <i className="bi bi-github"></i>
        </Link>
        <Link className="creator-info-link creator-info-media-link"
                to={`${linkedinLink}`} target="_blank"
                title={`${linkedinLink}`}>
            <i className="bi bi-linkedin"></i>
        </Link>
        </div>
    </div>
  )
}
