
import React from 'react';

import Grid from '@mui/material/Grid';

import City from './city';


const sortCities = (cities, sortAZ) => {
  if(cities.length > 0){
    if(sortAZ){
        //If sortAZ is true, sort the array from A to Z
        cities.sort((a, b) => {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        });
    } else {
        //If sortAZ is false, sort the array from Z to A
        cities.sort((a, b) => {
          if (a.name > b.name) { return -1; }
          if (a.name < b.name) { return 1; }
          return 0;
        });
    }
  }
  return cities;
}

// filter the cities array by country value
const filterByCountry = (cities, country) => {
  if(cities.length >= 1){
    if(country){
        //If country is true, filter the array by country value
        cities = cities.filter(city => city.country === country);
    } else {
        //If country is false, filter the array by country value
        cities = cities.filter(city => city.country !== country);
    }
  }
  return cities;
}



function Cities(props){
  const {prefered, removeCity, sortAZ, countrySelected} = props;

  let sorted_prefered = filterByCountry(prefered, countrySelected);

  sorted_prefered = sortCities(sorted_prefered, sortAZ);

  
  return (
      <Grid container spacing={4}>
        {sorted_prefered.map((city) => (
          <Grid item key={city.geonameid} xs={12} sm={6} md={4}>
            <City removeCity={removeCity} {...city} />
          </Grid>
        ))}
      </Grid>
    );
}

export default Cities;
