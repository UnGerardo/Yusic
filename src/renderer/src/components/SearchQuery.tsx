import { useContext } from "react";
import { SearchQueryContext } from "@contexts/SearchQueryContext";
import styled from "styled-components";

const SearchQuery = (): JSX.Element =>{
  const { setSearchQuery } = useContext(SearchQueryContext);

  const onChangeHandler = (event) => setSearchQuery(event.target.value);

  return (
    <SearchInput type="text" id="search" onChange={onChangeHandler} />
  );
}

export default SearchQuery;

const SearchInput = styled.input`
  background-color: #444;
  border: none;
  border-radius: 5px;
  color: #CCC;
  padding: 5px;
  margin: 0 10px;
`;