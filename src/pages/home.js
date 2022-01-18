import React, {Component} from 'react';

//MUI
import { withStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



//API
import { apiCities } from '../api/cities';
import { apiPreferedCities } from '../api/preferedCities';

//Components
import Cities from '../components/cities';  
import Filters from '../components/filters';
import Search from '../components/search';


const styles = {  
    root: {      
      backgroundColor: '#FFF',
      height: '100%',            
    },
    topSection: {
      background:'url("./img/travel-planning-tips-1920x1280.jpeg") no-repeat center -150px transparent',
      backgroundSize: 'cover',
    },
    bg: {
      backgroundColor: '#0000007d',
      height: '100%',
    }

};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


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
          sortAZ: true,
          countrySelected: null,
          openNotification: false,
        };

        this.onCitiesChanges = this.onCitiesChanges.bind(this);
        this.handlePrefered = this.handlePrefered.bind(this);
        this.sortPrefered = this.sortPrefered.bind(this);
        this.countryFilter = this.countryFilter.bind(this);
        this.handleClose = this.handleClose.bind(this);
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

  handlePrefered = (e, cityID) => {
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
        }).catch((err) => {
          this.setState({
            openNotification: true,
            severity: 'error',  
            responseMsg: 'Error getting prefered city',
          }); 
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
      }).catch((err) => {
        this.setState({
          openNotification: true,
          severity: 'error',  
          responseMsg: 'Error getting searched city',
        }); 
      });
    }
  }

  getPrefCities (){
    apiPreferedCities.getAll().then((res) => {    
      this.getCity(res.data.data);
    }).catch((err) => {
      this.setState({
        openNotification: true,
        severity: 'error',  
        responseMsg: 'Error getting prefered cities',
      }); 
    });
  }

  sortPrefered (value){    
    this.setState({
      sortAZ: value
    })
  }

  countryFilter (value){    
    console.log(value);
    console.log(this.state.countrySelected);
    if(value !== this.state.countrySelected){
      this.setState({
        countrySelected: value
      })
    }else{
      this.setState({
        countrySelected: null
      })
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      openNotification: false
    });
  };

  componentDidMount(){
    this.getPrefCities();
  }
  


    
  render(){  
    const { classes } = this.props;
    const { cities, prefered, loading, countrySelected, sortAZ, openNotification, responseMsg, severity } = this.state;

    return (
      <>
        <CssBaseline />
        <main className={classes.root}>
          {/* Hero unit */}
          <Box sx={{position: 'relative'}} className={classes.topSection} >
            <Box sx={{pt: 8, pb: 6}} className={classes.bg}>
              <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="#000" gutterBottom>
                  <img src="./img/logo.webp" alt="ASAPP" />
                </Typography>
                <Typography variant="h3" align="center" color="#FFF" paragraph>
                  This app will help you plan your next trip
                </Typography>
                <Typography variant="body1" align="center" color="#FFF" paragraph>
                  Search and save your favourite cities
                </Typography>
                <Stack sx={{ pt: 4, position: 'relative' }} direction="row" spacing={2} justifyContent="center">                
                    <Search cities={cities} onCitiesChanges={this.onCitiesChanges} prefered={prefered} handlePrefered={this.handlePrefered} loading={loading}/>
                </Stack>
              </Container>
            </Box>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">     
              <Typography variant="h5" align="center" color="#000" mb={3} paragraph>
                My favourite cities
              </Typography>       
              <Box mb={3}>
                 <Filters sortPrefered={this.sortPrefered} sortAZ={sortAZ} prefered={prefered} countryFilter={this.countryFilter} countrySelected={countrySelected}/>
              </Box>
              <Box spacing={2}>
                 {prefered && (<Cities prefered={prefered} removeCity={this.handlePrefered} sortAZ={sortAZ} countrySelected={countrySelected}/>)}        
              </Box>
          </Container>
        </main>
        <Snackbar open={openNotification} autoHideDuration={6000} onClose={this.handleClose} message="Note archived" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert onClose={this.handleClose} severity={severity} sx={{ width: '100%' }}>
            {responseMsg}
          </Alert>
        </Snackbar>
      </>
    );
  }
}



export default withStyles(styles)(Main);