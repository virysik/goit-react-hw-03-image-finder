import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import s from "./ImageGallery.module.css";

function ImageGallery({ photos, onSelectImg }) {
  return (
    <ul className={s.imageGallery}>
      {photos.map((photo) => {
        const { id, webformatURL, largeImageURL, tags } = photo;
        return (
          <ImageGalleryItem
            key={id}
            smallImg={webformatURL}
            tags={tags}
            onImgClick={() => {
              onSelectImg(largeImageURL, tags);
            }}
          />
        );
      })}
    </ul>
  );
}

export default ImageGallery;

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelectImg: PropTypes.func.isRequired,
};
