import React from 'react'

import { makeStyles } from '@mui/styles';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

import clsx from 'clsx';

// Grouped cities by country
const groupCities = (cities) => {
    let groupedCities = {};
    if(cities.length > 0){
        cities.forEach((city) => {
            if(groupedCities[city.country]){
                groupedCities[city.country].push(city);
            } else {
                groupedCities[city.country] = [city];
            }
        });
    }
    return groupedCities;
}

function CustomAvatar(props) {    
    return (
        <Avatar sx={{width: '20px', height: '20px', borderRadius: '50%', fontSize: '12px', marginLeft: '5px'}}>
            {props.qty}
        </Avatar>
    )
}

const filterStyles = makeStyles( theme => ({
    selected: {
        backgroundColor: '#CCC' 
    }
}));

function Filters(props) {
    const { sortAZ, countrySelected } = props;
    let groupedCities = groupCities(props.prefered);
    const classes = filterStyles();
    
    return (
        <Box>
            <Grid container>
                <Grid item xs={12} sm={6} md={11}>                    
                        {props.prefered && (    
                            Object.keys(groupedCities).map((key, index) => {
                                return (                                              
                                    <Chip key={index} avatar={<CustomAvatar qty={groupedCities[key].length} />} label={key} variant="outlined" sx={{ color: "#000", borderColor: "#ccc", marginBottom: '10px' }} onClick={(e) =>{props.countryFilter(key)}} className={clsx({[classes.selected]: countrySelected === key})}/>                                
                                )                                                                        
                            })
                        )}                               
                </Grid>
                <Grid item xs={12} sm={6} md={1} align="center" >
                    <Box sx={{ alignItems: 'center' }}>
                        <SortByAlphaIcon  title="Sort Alphabetically" alt="Sort Alphabetically" sx={{ color: "#000", cursor: "pointer" }} onClick={(e) => {props.sortPrefered(!sortAZ)}}/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}


export default Filters;

