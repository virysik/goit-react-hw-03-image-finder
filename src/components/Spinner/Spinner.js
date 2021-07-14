import Loader from "react-loader-spinner";
import s from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={s.wrapper}>
      <Loader type="ThreeDots" color="#ff347f" height={150} width={150} />
    </div>
  );
}

export default Spinner;
