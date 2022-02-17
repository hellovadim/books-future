import "./Error.scss";
import { errorMsg } from "../../api/api";

export const Error = () => {
  return (
    <div className="error">
      <h3>Ooops!!!</h3>
      <img src={errorMsg} alt="error" />
    </div>
  );
};
