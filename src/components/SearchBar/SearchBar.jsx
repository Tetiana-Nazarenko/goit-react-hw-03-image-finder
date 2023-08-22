import {
  SearchForm,
  SearchInput,
  SearchButton,
  SearchSpan,
} from './SearchBar.styled';

export const SearchBar = ({ onSubmit }) => {
  return (
    <header>
      <SearchForm onSubmit={onSubmit}>
        <SearchButton type="submit">
          <SearchSpan>Search</SearchSpan>
        </SearchButton>

        <SearchInput
          name="query"
          type="text"
          placeholder="Search images and photos"
        />
      </SearchForm>
    </header>
  );
};
