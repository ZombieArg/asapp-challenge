import ApiCore from "../utilities/core"

// Cities API

const url = 'cities';

// plural and single may be used for message logic if needed in the ApiCore class.

export const apiCities = new ApiCore({
  getAll: true,
  getAllFilter: true,
  getSingle: true,
  post: false,
  put: false,
  patch: false,
  delete: false,
  url: url,
});


