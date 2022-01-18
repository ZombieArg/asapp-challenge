
import React from 'react';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

function City(props) {
    const {country, name, subcountry, geonameid, removeCity} = props; 
    
    return (

      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }} elevation={2}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {name ? name : <Skeleton variant="text" />}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Typography>            
                {country ? country : <Skeleton variant="text" width={40 } />} - {subcountry ? subcountry : <Skeleton variant="text"  width={40}/> }            
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>          
          <Button size="small" onClick={(e) => {removeCity(e, geonameid)}}>Remove</Button>
        </CardActions>
      </Card>
    );
}


function Cities(props){
  const {prefered, removeCity} = props
  var sorted_prefered = prefered.sort((a, b) => a.name.localeCompare(b.name))
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
