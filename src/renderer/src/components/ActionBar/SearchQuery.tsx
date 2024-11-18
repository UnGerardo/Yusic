import { useContext } from "react";
import { SearchQueryContext } from "@contexts/SearchQueryContext";
import styled from "styled-components";

const SearchQuery = (): JSX.Element =>{
  const { searchQuery, setSearchQuery } = useContext(SearchQueryContext);

  const onChangeHandler = (event) => setSearchQuery(event.target.value);

  const clearSearch = () => setSearchQuery('');

  return (
    <StyledSearchQuery>
      <SearchIcon />
      <SearchInput type="text" id="search" value={searchQuery} onChange={onChangeHandler} />
      <ClearSearchIcon onClick={clearSearch} searching={!!searchQuery.length} />
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
  padding: 5px 28px 5px 32px;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const ClearSearchIcon = styled.div<{ searching: boolean }>`
  background: transparent;
  display: ${props => props.searching ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
  position: absolute;
  transform: rotate(45deg);
  top: 6px;
  right: 3px;

  &:before {
    background-color: gray;
    content: '';
    height: 2px;
    width: 20px;
    position: absolute;
  }

  &:after {
    background-color: gray;
    content: '';
    height: 20px;
    width: 2px;
    position: absolute;
  }

  &:hover::before,
  &:hover::after { background-color: white; }

  &:active::before,
  &:active::after { background-color: #666; }
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