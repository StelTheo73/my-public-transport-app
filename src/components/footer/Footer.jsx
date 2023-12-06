import { CreatorInfo } from "./CreatorInfo";

import "./Footer.css";

export const Footer = ({language}) => {
  return (
    <footer>
        <hr></hr>

        {/* <div className="row">

          <div className="col-12 col-md-6">
            <div>info here</div>
          </div>


          <div className="col-12 col-md-6">
            <div>more info here</div>
          </div>

        </div>

        <hr></hr> */}

        <div className="row">
          <CreatorInfo
            language={language} name="Giannakis Myron"
            email="up1072899@upnet.gr"
            githubLink="https://github.com/G-Myron"
            linkedinLink="https://www.linkedin.com/in/myron-giannakis/"
          />
          <CreatorInfo
            language={language} name="Theofilou Stylianos"
            email="up1072791@upnet.gr"
            githubLink="https://github.com/StelTheo73"
            linkedinLink="https://www.linkedin.com/in/stylianos-theofilou-976ab923b"
          />
        </div>

        <hr/>

        <div className="row">

          <div className="col-12 d-flex justify-content-center">
            <span>myrong x steltheo73 © 2023</span>
          </div>

        </div>
    </footer>
  )
}
