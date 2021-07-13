import { Component } from "react";
import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";
import defaultImg from "../../images/default.jpg";

class ImageGalleryItem extends Component {
  static propTypes = {
    smallImg: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onImgClick: PropTypes.func.isRequired,
  };

  state = { loaded: false };

  handleImgLoad = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { loaded } = this.state;
    const { smallImg, tags, onImgClick } = this.props;

    return (
      <li className={s.ImageGalleryItem}>
        <img
          src={loaded ? smallImg : defaultImg}
          alt={tags}
          className={s.ImageGalleryItemImage}
          onClick={onImgClick}
          onLoad={this.handleImgLoad}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
