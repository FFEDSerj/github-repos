import { Input } from '@material-ui/core';
import React, { useRef } from 'react';
import PropTypes from 'prop-types'

const SearchForm = ({ onSearch, text, totalRepos = 0 }) => {
  const inputEl = useRef('');

  const changeHandler = () => {
    const value = inputEl.current.firstChild.value;
    onSearch(value.trim());
  }

  return (
    <form action="#" className="search-form">
      <Input
        autoFocus
        className="search-input"
        color="primary"
        placeholder="type to search"
        type='search'
        value={text}
        ref={inputEl}
        onChange={changeHandler}
      />
      <div className="search-result">Found {totalRepos} repositories</div>
    </form>
  )
}

SearchForm.propTypes = {
  onSearch: PropTypes.func,
  text: PropTypes.string,
  totalRepos: PropTypes.number,
}

export default SearchForm;
