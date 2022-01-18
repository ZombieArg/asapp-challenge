import React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

function City(props) {
    const {country, name, subcountry, geonameid, removeCity} = props; 
    
    return (

      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }} elevation={3} >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {name ? name : <Skeleton variant="text" />}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Typography color={"#626262"}>            
                {country ? country : <Skeleton variant="text" width={40 } />} - {subcountry ? subcountry : <Skeleton variant="text"  width={40}/> }            
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>   
          <Button  size="medium" onClick={(e) => {removeCity(e, geonameid)}} startIcon={<DeleteIcon fontSize="small"/>} sx={{ lineHeight : "26px" }}>Remove</Button>
        </CardActions>
      </Card>
    );
} 


export default City;