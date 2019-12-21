import React, { useState, Fragment } from 'react';
import axios from 'axios';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Autosuggest from 'react-autosuggest';
import {
  TextField,
  InputAdornment,
  CircularProgress,
  Grid,
  Typography,
  Paper,
  ListItem,
  Button,
  MenuItem
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

import styles from './styles';

const ProductSearchBar = () => {
  const classes = styles();

  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const onSuggestionsFetchRequested = async ({ value }) => {
    setLoading(true);
    const query = value.trim().toLowerCase();
    const response = await axios.get(
      `http://localhost:3091/products?q=${query}`
    );
    setSuggestions(response.data);
    setLoading(false);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
    setValue('');
  };

  const onChange = (e, { newValue }) => {
    setValue(newValue);
  };
  const renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);

    return (
      <MenuItem selected={isHighlighted}>
        <div selected={isHighlighted}>
          {parts.map((part, index) => (
            <span
              key={index}
              style={{ fontWeight: part.highlight ? 700 : 400 }}
            >
              {part.text}
            </span>
          ))}
          <div>{suggestion.variation}</div>
          <div>{suggestion.price}</div>
        </div>
      </MenuItem>
    );
  };

  const inputProps = {
    value,
    onChange
  };
  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      renderSuggestion={renderSuggestion}
      highlightFirstSuggestion
      getSuggestionValue={suggestion => suggestion.name}
      inputProps={inputProps}
      renderSuggestionsContainer={({ containerProps, children }) => (
        <Paper {...containerProps} square className={classes.container}>
          {children}
        </Paper>
      )}
      renderInputComponent={inputProps => {
        return (
          <TextField
            {...inputProps}
            className={classes.productSearchInput}
            classes={{ root: classes.inputRoot }}
            label="Search for products..."
            color="secondary"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  <InputAdornment
                    className={classes.searchIconHolder}
                    position="end"
                  >
                    <Search />
                  </InputAdornment>
                </React.Fragment>
              )
            }}
          />
        );
      }}
      theme={{
        container: classes.container,
        suggestionContainer: classes.suggestionContainer,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion
      }}
    />
  );
};

export default ProductSearchBar;
