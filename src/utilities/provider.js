// provider.js

import axios from 'axios'; 
import { handleResponse, handleError } from './response'; 

const BASE_URL = 'http://localhost:3030'; 

const client = axios.create({
  baseURL: BASE_URL 
});

/** @param {string} resource */ 
const getAll = (resource, query) => { 
  try {
    const result =  client.get(`${BASE_URL}/${resource}`);     
    return handleResponse(result);
  } catch (err) {
    handleError(err)
  }
}; 

/** @param {string} resource */ 
/** @param {string} query */ 
const getAllFilter = (resource, query) => { 
  try {
    const result =  client.get(`${BASE_URL}/${resource}${query}`);     
    return handleResponse(result);
  } catch (err) {
    handleError(err)
  }
}; 

/** @param {string} resource */ 
/** @param {string} id */ 
const getSingle =  (resource, id) => { 
  try {
    const result = client.get(`${BASE_URL}/${resource}/${id}`); 

    return handleResponse(result)
  } catch (err) {
    handleError(err);
  }
}; 

/** @param {string} resource */ 
/** @param {object} model */ 
const post =  (resource, model) => { 
  try{
    const result = client.post(`${BASE_URL}/${resource}`, model);
    return handleResponse(result);
  } catch (err) {
    handleError(err);
  }
}; 

/** @param {string} resource */ 
/** @param {object} model */ 
const put =  (resource, model) => { 
  try{
    const result = client.put(`${BASE_URL}/${resource}`, model);
    return handleResponse(result);
  } catch (err) {
    handleError(err);
  }
}; 

/** @param {string} resource */ 
/** @param {object} model */ 
const patch =  (resource, model) => { 
  try{
    const result = client.patch(`${BASE_URL}/${resource}`, model);
    return handleResponse(result);
  } catch (err) {
    handleError(err);
  }
}; 

/** @param {string} resource */ 
/** @param {string} id */ 
const remove =  (resource, id) => { 
  try{
    const result = client.delete(`${BASE_URL}/${resource}/${id}`);
    return handleResponse(result);
  } catch (err) {
    handleError(err);
  }
}; 

const apiProvider = { 
  getAll, 
  getAllFilter,
  getSingle, 
  post, 
  put, 
  patch, 
  remove, 
};

export default apiProvider;