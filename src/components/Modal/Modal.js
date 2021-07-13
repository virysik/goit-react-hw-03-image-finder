import { Component } from "react";
import { createPortal } from "react-dom";
import Spinner from "../Spinner";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  static propTypes = {
    photo: PropTypes.objectOf(PropTypes.string).isRequired,
    onClose: PropTypes.func.isRequired,
  };

  state = { loaded: false };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleOverlayClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }

    this.props.onClose();
  };

  handleImgLoaded = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { photo, onClose } = this.props;
    const { loaded } = this.state;

    return createPortal(
      <div className={s.Overlay} onClick={this.handleOverlayClick}>
        <div className={s.Modal}>
          <img src={photo.src} alt={photo.alt} onLoad={this.handleImgLoaded} />
          {loaded ? (
            <button type="button" onClick={onClose}>
              x
            </button>
          ) : (
            <Spinner />
          )}
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
