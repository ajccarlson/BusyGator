/**
 * COPYRIGHT San Francisco State University SCS648 Team 4 - SP22
 *
 *
 *
 * This File contains the source of listings, categories, locations, and users mapped over the database.
 */
import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

const DataContext = createContext(null);

function DataProvider({ children }) {
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useState({
    categoryId: null,
    searchText: null,
    minPrice: null,
    maxPrice: null,
  });
  const [sortAsc, setSortAsc] = useState(null);

  return (
    <DataContext.Provider
      value={{
        listings,
        setListings,
        categories,
        setCategories,
        locations,
        setLocations,
        users,
        setUsers,
        searchParams,
        setSearchParams,
        sortAsc,
        setSortAsc,
        totalCount,
        setTotalCount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const DataConsumer = DataContext.Consumer;

export { DataProvider, DataConsumer };
export default DataContext;
