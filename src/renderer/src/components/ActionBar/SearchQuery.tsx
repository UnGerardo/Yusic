import { useContext } from "react";
import { SearchQueryContext } from "@contexts/SearchQueryContext";
import styled from "styled-components";

const SearchQuery = (): JSX.Element =>{
  const { setSearchQuery } = useContext(SearchQueryContext);

  const onChangeHandler = (event) => setSearchQuery(event.target.value);

  return (
    <StyledSearchQuery>
      <SearchIcon />
      <SearchInput type="text" id="search" onChange={onChangeHandler} />
    </StyledSearchQuery>
  );
}

export default SearchQuery;

const SearchIcon = styled.div`
  border: 2px solid gray;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  position: absolute;
  top: 2.5px;
  left: 1.5px;
  transform: scale(0.7);

  &::after {
    background-color: gray;
    content: "";
    height: 8px;
    width: 2px;
    position: absolute;
    bottom: -5.5px;
    right: -1.5px;
    transform: rotate(-45deg);
  }
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  padding: 5px 5px 5px 32px;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const StyledSearchQuery = styled.section`
  background-color: transparent;
  border: 1px solid black;
  border-radius: 5px;
  margin-right: 10px;
  width: 50%;
  position: relative;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    border: 1px solid #666;
  }

  &:has(${SearchInput}:focus) {
    border: 1px solid white;

    ${SearchIcon} {
      border-color: white;
      &::after {
        background-color: white;
      }
    }
  }
`;