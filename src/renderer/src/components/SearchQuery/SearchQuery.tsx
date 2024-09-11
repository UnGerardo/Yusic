import { useContext } from "react"
import { SearchQueryContext } from "@contexts/SearchQueryContext"

const SearchQuery = (): JSX.Element =>{
  const { setSearchQuery } = useContext(SearchQueryContext);

  const onChangeHandler = (event) => setSearchQuery(event.target.value);

  return (
    <input type="text" id="search" onChange={onChangeHandler} />
  );
}

export default SearchQuery;