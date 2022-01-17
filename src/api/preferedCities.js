import ApiCore from "../utilities/core"

// Prefered API

const url = 'preferences/cities';

// plural and single may be used for message logic if needed in the ApiCore class.

export const apiPreferedCities = new ApiCore({
  getAll: true,
  getAllFilter: false,
  getSingle: false,
  post: false,
  put: false,
  patch: true,
  delete: false,
  url: url,
});


