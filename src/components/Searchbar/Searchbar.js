import { Component } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import s from "./Searchbar.module.css";

class Searchbar extends Component {
  static propTypes = { onSubmit: PropTypes.func.isRequired };

  state = {
    value: "",
  };

  handleInputChange = (e) => {
    const value = e.currentTarget.value.toLowerCase();
    this.setState({ value });
  };

  handleFormSublit = (e) => {
    e.preventDefault();

    if (this.state.value.trim() === "") {
      return toast("⚠️Please enter search query name");
    }

    this.props.onSubmit(this.state.value);
    this.setState({ value: "" });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleFormSublit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            onChange={this.handleInputChange}
            value={this.state.value}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
