import React, {Component} from 'react';

import { withStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import clsx from 'clsx';

import { apiCities } from '../api/cities';
import { apiPreferedCities } from '../api/preferedCities';

import Cities from '../components/cities';  


const styles = {  
    root: {      
      backgroundColor: '#aae8f5',
      height: '100vh',      
      background:'url("./img/vakantie.jpeg") no-repeat center -520px #aae8f5',
      backgroundSize: 'cover',
    },
    topSection: {
      
    },
    textField:{
        backgroundColor: 'transparent',
        width: '100%',
        padding: '10px 5px',
        "& .MuiOutlinedInput-root":{
          backgroundColor: '#FFF',
        }
    },
    autocomplete:{
        width: '100%',
        "& .MuiAutocomplete-listbox": {
          border: "2px solid yellow",
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
        }
    },
    option: {
      cursor: 'pointer',
    },
    optionSelected: {
      backgroundColor: 'green',
      color: 'white',
    },
    popper: {
      backgroundColor: 'white',
    }
};



class Main extends Component {
  constructor(props) {
        super(props);
        this.state = {
          cities: [],
          prefered: [],
          query: undefined,
          typing: false,
          typingTimeout: 0,
          latestSearch: [],
        };
  }

  onCitiesChanges = (event, values) => {
    const self = this;

    if (self.state.typingTimeout) {
       clearTimeout(self.state.typingTimeout);
    }

    self.setState({
       loading: true,
       typing: false,
       typingTimeout: setTimeout(function () {   
         if(event.target.value !== ''){
          self.getCities(`?filter=${event.target.value}&limit=35&offset=0`);
          self.setState({
            latestSearch: [...self.state.latestSearch, {name: event.target.value, date: new Date()}],
          });
         }else{
          self.setState({
            cities: [],
            loading: false,
          })
         }               
       }, 600)
    });
  };

  handlePreferred = (e, cityID) => {
    e.preventDefault();


    //Check if the city is already in the array of preferred cities
    if(!this.state.prefered.find(city => city.geonameid === cityID)){
      this.getCity([cityID]);
      apiPreferedCities.patch({[cityID]: true});
    }else{
      //remove it from the array of preferred cities
      this.setState({
        prefered: this.state.prefered.filter(city => city.geonameid !== cityID)
      });

      apiPreferedCities.patch({[cityID]: false,});
    }
     
  };


  getCity = (cities) => {      
    if (cities) {
      cities.map((city) => {
        apiCities.getSingle(city).then((res) => { 
          this.setState({
            prefered: [...this.state.prefered, {...res.data, date: new Date()}],
          })          
        });
        return true;
      });            
    }    
  };

  getCities (query){
    if(query){
      apiCities.getAllFilter(query).then((res) => {
        this.setState({
          cities: res.data.data,
          loading: false,
        })
      });
    }
  }

  getPrefCities (){
    apiPreferedCities.getAll().then((res) => {     
      this.getCity(res.data.data);
    });
  }

  componentDidMount(){
    this.getPrefCities();
  }
  


    
  render(){  
    const { classes } = this.props;
    const { cities, prefered, loading, latestSearch } = this.state;

    const filterOptions = createFilterOptions({
      matchFrom: "any",
      limit: 50,
    });

    console.log(latestSearch)
    return (
      <>
        <CssBaseline />
        <main className={classes.root}>
          {/* Hero unit */}
          <Box
            sx={{
              pt: 8,
              pb: 6,
            }}
            className={classes.topSection}
          >
            <Container maxWidth="sm" >
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="#000"
                gutterBottom
              >
                <img src="./img/logo.webp" alt="ASAPP" />
              </Typography>
              <Typography variant="h3" align="center" color="#FFF" paragraph>
                This app will help you plan your next trip.
              </Typography>
              <Typography variant="body1" align="center" color="#FFF" paragraph>
                Search and save your favourite cities
              </Typography>
              <Stack
                sx={{ pt: 4, position: 'relative' }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                  <Autocomplete                    
                    options={cities}
                    getOptionLabel={(option) => option.name}
                    id="disable-close-on-select"
                    disablePortal
                    disableCloseOnSelect
                    onInputChange={(event, newInputValue) => {
                      console.log("onchangeinput")
                      this.onCitiesChanges(event, newInputValue);
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
                            this.handlePreferred(e, option.geonameid);
                          }}
                          className={clsx(classes.option, {[classes.optionSelected]:isPresent})}
                        >
                          <Box p={1}>
                            <Typography variant="body1">
                              {option.name}
                            </Typography>
                            <Stack direction="row" spacing={1}>
                              <Typography variant="caption">
                                {option.country} - {option.subcountry}
                              </Typography>
                            </Stack>
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
                    loadingText="Loading..."
                    className={classes.autocomplete}
                  />
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">     
              <Typography variant="h5" align="center" color="#FFF" elevation={3} paragraph>
                My favourite cities
              </Typography>       
            {prefered && (<Cities prefered={prefered} removeCity={this.handlePreferred}  />)}        
          </Container>
        </main>
      </>
    );
  }
}



export default withStyles(styles)(Main);