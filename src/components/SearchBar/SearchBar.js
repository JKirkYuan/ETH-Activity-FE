import React from 'react'
import TextField from '@material-ui/core/TextField'

const SearchBar = ({ handleSearch }) => {
  const [searchUrl, searchUrlUpdated] = React.useState('')
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSearch(searchUrl)
      }}
    >
      <div>
        <TextField
          placeholder="Search an Address!"
          value={searchUrl}
          onChange={(e) => {
            searchUrlUpdated(e.target.value)
          }}
        ></TextField>
      </div>
    </form>
  )
}

export default SearchBar
