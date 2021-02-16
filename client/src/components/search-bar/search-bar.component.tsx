import React from 'react'

import './search-bar.styles.scss'

interface IProps {
  handleChange: any
  [key: string]: any
}

const SearchBar = ({ handleChange, ...otherProps }: IProps) => {
  return (
    <div className="search-bar">
      <div className="search-icon">
        <i className="fas fa-search"></i>
      </div>
      <input
        type="text"
        className="search-input"
        onChange={handleChange}
        {...otherProps}
      />
    </div>
  )
}

export default SearchBar
