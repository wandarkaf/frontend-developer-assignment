import { useEffect, useMemo } from "react";
import debounce from "lodash/debounce";

const AppSearch = ({ debounceTime = 300, handleSearch }) => {
  const debounceWrapper = useMemo(() => {
    return debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      handleSearch(event.target.value);
    }, debounceTime);
  }, [debounceTime, handleSearch]);

  useEffect(() => {
    return () => {
      debounceWrapper.cancel();
    };
  });

  return (
    <>
      <input
        data-testid="search"
        type="search"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5"
        onChange={debounceWrapper}
        placeholder="Search"
      />
    </>
  );
};

export default AppSearch;
