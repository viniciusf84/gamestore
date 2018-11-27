import React, { Component } from 'react';
import API from  './utils/api';

class App extends Component {

  getApiData() {
    const url = API;
    console.log(url)
    const fetching =  fetch(url).then((response) => response.json())
          .then(function(data) { })
          .catch((error) => console.log(error));

    return fetching;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.getApiData()}
        </header>
      </div>
    );
  }
}

export default App;
