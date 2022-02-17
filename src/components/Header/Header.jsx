import "./Header.scss";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <nav>
      <div className="container">
        <Link to={"/"}>
          <h1>Google books app</h1>
        </Link>
      </div>
    </nav>
  );
};
