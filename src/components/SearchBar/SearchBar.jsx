import { Component } from 'react';

import {
  SearchForm,
  SearchInput,
  SearchButton,
  SearchSpan,
} from './SearchBar.styled';

class SearchBar extends Component {
  state = {
    searchName: '',
    inputValue: '',
  };

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = event => {
    event.preventDevauly();
    const searchQuery = event.target.elements.searchName.value.trim();
    this.props.onSubmit(searchQuery);
    event.target.reset();
  };

  render() {
    return (
      <header>
        {/* <form onSubmit={this.submitQuery}> */}
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <SearchSpan>Search</SearchSpan>
          </SearchButton>

          <SearchInput
            name="searchName"
            type="text"
            placeholder="Search images and photos"
            id="search"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </SearchForm>
      </header>
    );
  }
}
export default SearchBar;
