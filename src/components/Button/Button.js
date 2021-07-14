import PropTypes from "prop-types";
import s from "./Button.module.css";

function Button({ onClick }) {
  return (
    <button type="button" className={s.button} onClick={onClick}>
      Load more
    </button>
  );
}

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
