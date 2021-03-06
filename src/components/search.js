import React from 'react';

import { makeStyles } from '@mui/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';



import clsx from 'clsx';

const searchStyles = makeStyles( theme => ({
    textField:{
        backgroundColor: 'transparent',
        width: '100%',
        padding: '10px 5px',
        "& .MuiOutlinedInput-root":{
          backgroundColor: '#FFF',
          outlineColor: "#000"
        },
        "& .MuiInputLabel-root.Mui-focused": {
            transform: 'translate(14px, 5px) scale(0.7)',
            backgroundColor: 'transparent',

        },
        "& .MuiOutlinedInput-root.Mui-focused": {
            "& fieldset": {
                backgroundColor: 'transparent',
                visibility: 'hidden',
            }
            
        }
    },
    autocomplete:{
        width: '100%',
        "& .MuiAutocomplete-listbox": {
          minHeight: 400,
          color: "green",
          fontSize: 18,
          //hover discussed above
          "& li": {
            //list item specific styling
            border: "2px solid green",
            borderRadius: 4
          }
        },
        "& .MuiInputLabel-root":{
          lineHeight: '45px'
        },
    },
    option: {
      cursor: 'pointer',
      '&[data-focus="true"]': {
        backgroundColor: '#F8F8F8',
        borderColor: 'transparent',
      },
      "&:hover":{
        backgroundColor: '#F2F2F2',
        color: '#4F4F4F',
      }
    },
    optionSelected: {
      backgroundColor: '#F2F2F2',
      color: '#4F4F4F',
    },
    popper: {
      backgroundColor: 'white',
    }
}));

function Search(props){
    const { cities, onCitiesChanges, prefered, handlePrefered, loading } = props;
    const classes = searchStyles();

    return (
        <Autocomplete                    
                    options={cities}
                    getOptionLabel={(option) => option.name}
                    id="disable-close-on-select"
                    disablePortal
                    disableCloseOnSelect
                    onInputChange={(event, newInputValue) => {                      
                      onCitiesChanges(event, newInputValue);
                    }}
                    noOptionsText="We couldn't find any city with that name"
                    renderOption={(props, option) => {
                      //Check if the option is present in the prefered cities array and return true if it is           
                      let isPresent = prefered.find(city => city.geonameid === option.geonameid) ? true : false;

                      return (
                        <li
                          {...props}
                          key={option.geonameid}
                          onClick={(e) => {
                            handlePrefered(e, option.geonameid);
                          }}
                          className={clsx(classes.option, {[classes.optionSelected]:isPresent})}
                        >
                          <Box p={1}>
                            <Box sx={{display: 'flex', alignItem: 'center', justifyContent:'space-between'}}>
                              <Stack direction="column" spacing={1}>
                                <Typography variant="body1">
                                  {option.name}
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                  <Typography variant="caption">
                                    {option.country} - {option.subcountry}
                                  </Typography>
                                </Stack>
                              </Stack>
                              
                              {isPresent && (
                                <Button align="end"  size="medium" onClick={(e) => {handlePrefered(e, option.geonameid)}}>
                                  <DeleteIcon fontSize="small"/>
                                </Button>
                              )}                             
                            </Box>
                          </Box>
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select your prefered cities"
                        className={classes.textField}          
                      />
                    )}
                    loading={loading}         
                    loadingText={loading && (
                      <Box sx={{ display: 'flex' }} size="small">
                        <CircularProgress />
                      </Box>
                    )}
                    className={classes.autocomplete}
                  />
    )
}

export default Search;