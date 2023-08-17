import { Component } from 'react';

export class ImageApp extends Component {
  state = {
    guery: '',
    images: [],
    page: 1,
    loading: false,
    error: false,
    per_page: 12,
  };

  changeQuery = newQuery => {
    this.setState({
      query: `${Date.now()}  / ${newQuery}`,
      images: [],
      page: 1,
    });
  };

  setImages = () => {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const API_KEY = '38081191-44fc2de709a1cfc57ee790b0d';
    const URl = 'https://pixabay.com/api/';
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      console.log(
        `Запрос за квері ${this.state.query} u page ${this.state.page} `
      );
      //Http запрос
      // this.setState ({ images: результат запроса})
      this.setState({ loading: true });

      fetch(
        `${URl}?q=cat&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${this.state.per_page}`
      )
        .then(response => response.json())
        //.then(console.log)
        .then(data => this.setState({ images: data.hits }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  loader = () => {};
  error = () => {};

  render() {
    return (
      <div>
        <header>
          <form
            onSubmit={evt => {
              evt.preventDefault();
              this.changeQuery(evt.target.elements.query.value);
              evt.target.reset();
            }}
          >
            <button type="submit">
              <span>Search</span>
            </button>

            <input
              name="query"
              type="text"
              placeholder="Search images and photos"
            />
          </form>
        </header>
        <div>
          {this.state.loading && <div> Загружаем картинки...</div>}
          {!this.state.query && <div>Введите имя картинки</div>}
        </div>
        {/* 
          <ul>
            key={this.state.images.hits.id}
            Gallery
            <li>
              <img src={this.state.images.hits.webformatURL} alt="" />
            </li>
          </ul>
        )} */}
        {this.state.images && (
          <ul>
            {this.state.images.map(image => (
              <li key={image.id}>
                <img src={image.webformatURL} alt="" width="300" />
              </li>
            ))}
          </ul>
        )}
        <div>
          <button onClick={this.handleLoadMore}>Load more</button>
        </div>
      </div>
    );
  }
}
