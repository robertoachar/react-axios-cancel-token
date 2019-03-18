import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: null,
      data: null,
      error: null
    };

    this.handleFetch = this.handleFetch.bind(this);
    this.handleAbort = this.handleAbort.bind(this);
  }

  handleFetch() {
    this.source = axios.CancelToken.source();

    this.setState({ status: 'loading...' });

    axios
      .get('https://swapi.co/api/people/1', { cancelToken: this.source.token })
      .then(({ data }) =>
        this.setState({ status: 'loaded', error: null, data })
      )
      .catch((error) => this.setState({ error }));
  }

  handleAbort() {
    if (this.source) {
      this.source.cancel();
      this.setState({ status: 'aborted' });
    }
  }

  render() {
    const { data, status, error } = this.state;

    return (
      <div>
        <h1>React + Axios + Cancel Token</h1>

        <button type="button" onClick={this.handleFetch}>
          Fetch data
        </button>
        <button type="button" onClick={this.handleAbort}>
          Abort
        </button>

        <p>{`Status: ${status}`}</p>
        <p>{`Error: ${error}`}</p>

        <p>Data</p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }
}

export default App;
