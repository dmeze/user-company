import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";

import { Autocomplete, TextField, Button } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import { HandleInputProps, Name, SearchProps } from "types/search_interfaces";

import styles from "styles/search.module.scss";

const Search = ({ options }: SearchProps) => {
  const { push } = useRouter();
  const [input, setInput] = useState<String>();

  const handleInputChange = ({ target }: HandleInputProps) => {
    setInput(target.value);
  };

  const handleAutoCompleteChange = (event: ChangeEvent<{}>, value: string) => {
    setInput(value);
  };

  const handleInputSubmit = () => {
    const name: Name = options.find((option) => option.name === input)!;
    if (name) {
      push({
        pathname: "/users/",
        query: { id: name.id },
      });
    }
  };

  return (
    <Autocomplete
      freeSolo
      id="search-component"
      className={styles.searchInput}
      disableClearable
      options={options.map((option: Name) => option.name)}
      onChange={handleAutoCompleteChange}
      renderInput={(params) => (
        <>
          <TextField
            {...params}
            label="User search"
            className={styles.textField}
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
            onChange={handleInputChange}
          />
          <div className={styles.buttonDiv}>
            <Button
              className={styles.inputButton}
              variant="contained"
              onClick={handleInputSubmit}
            >
              <SearchIcon />
            </Button>
          </div>
        </>
      )}
    />
  );
};

export default Search;
