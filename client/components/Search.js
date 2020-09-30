import React, {Component} from 'react'

class Search extends Component {
  render() {
    return (
      <form className="form-inline">
        <input
          className="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    )
  }
}

export default Search
