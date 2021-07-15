import { Component } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import { fetchPhotos } from "../../services/api";
import { toast } from "react-toastify";
import Searchbar from "../Searchbar";
import ImageGallery from "../ImageGallery";
import Button from "../Button";
import Spinner from "../Spinner";
import Modal from "../Modal";
import "react-toastify/dist/ReactToastify.css";
import s from "./App.module.css";

class App extends Component {
  state = {
    query: "",
    page: 1,
    photos: [],
    selectedImg: null,
    reqStatus: "idle",
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ reqStatus: "pending" });

      try {
        const photos = await fetchPhotos(query, page);

        if (!photos.length) {
          toast("⚠️Please enter the correct search query name");
        }

        this.setState((prevState) => ({
          photos: [...prevState.photos, ...photos],
          reqStatus: "resolved",
        }));
      } catch (error) {
        this.setState({ reqStatus: "rejected" });
        console.log(error);
      }

      page > 1 &&
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
    }
  }

  resetState = () => {
    this.setState({
      query: "",
      page: 1,
      photos: [],
      selectedImg: null,
      reqStatus: "idle",
    });
  };

  handleSubmit = (query) => {
    const sameQuery = this.state.query === query;

    if (sameQuery) {
      return;
    }

    this.resetState();
    this.setState({ query });
  };

  onLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  onSelectImg = (src, alt) => {
    this.setState({ selectedImg: { src, alt } });
    document.body.classList.add("modal-open");
  };

  onModalClose = () => {
    this.setState({ selectedImg: null });
    document.body.classList.remove("modal-open");
  };

  render() {
    const { photos, selectedImg, reqStatus } = this.state;

    if (reqStatus === "idle" || reqStatus === "rejected") {
      return (
        <div className={s.app}>
          <Searchbar onSubmit={this.handleSubmit} />
          <ToastContainer autoClose={2000} transition={Zoom} />
        </div>
      );
    }

    if (reqStatus === "pending") {
      return (
        <div className={s.app}>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery photos={photos} onSelectImg={this.onSelectImg} />
          <Spinner />
          {photos.length > 0 && <Button onClick={this.onLoadMore} />}
          <ToastContainer autoClose={2000} transition={Zoom} />
        </div>
      );
    }

    if (reqStatus === "resolved") {
      return (
        <div className={s.app}>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery photos={photos} onSelectImg={this.onSelectImg} />
          {photos.length > 0 && <Button onClick={this.onLoadMore} />}
          {selectedImg && (
            <Modal photo={selectedImg} onClose={this.onModalClose} />
          )}

          <ToastContainer autoClose={2000} transition={Zoom} />
        </div>
      );
    }
  }
}

export default App;
