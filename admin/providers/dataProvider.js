import jsonServerProvider from 'ra-data-json-server';
import { fetchUtils } from 'react-admin';
import axios from 'axios';
import ObjectID from 'bson-objectid';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  // add your own headers here
  options.headers.set(
    'Authorization',
    'Bearer ' + JSON.parse(localStorage.getItem('token'))
  );
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = jsonServerProvider(
  `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1`,
  httpClient
);

const myDataProvider = {
  ...dataProvider,
  create: async (resource, params) => {
    if (resource !== 'categories' && resource !== 'questions') {
      // fallback to the default implementation
      return dataProvider.create(resource, params);
    }

    if (resource === 'questions') {
      console.log(params.data);
      let image = params.data.image;

      if (image) {
        const file = image.rawFile;
        // Get signed url
        const urlResponse = await axios({
          url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/get-signed-url`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          },
          params: {
            resource: `questions`,
            fileType: file.type,
            key: ObjectID(),
          },
        });
        // Update the file
        image = urlResponse.data.data.url;
        const signedUrl = urlResponse.data.data.signedUrl;

        console.log(image);

        // Upload file
        await axios.put(signedUrl, file, {
          headers: {
            'Content-Type': file.type,
          },
        });
      }

      // Clean up the data sent to the api
      params.data.credits = params.data.credits
        ? params.data.credits.filter((credit) => !!credit)
        : [];
      params.data.status = 'approved';
      params.data.type === 'boolean' &&
        (params.data.options = ['True', 'False']);

      console.log(params.data);

      // Create the question
      return dataProvider.create(resource, {
        ...params,
        data: {
          ...params.data,
          image,
        },
      });
    }

    if (resource === 'categories') {
      const file = params.data.image.rawFile;
      // Get signed url
      const urlResponse = await axios({
        url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/get-signed-url`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        },
        params: {
          resource: `categories`,
          fileType: file.type,
        },
      });

      console.log(urlResponse);

      const image = urlResponse.data.data.url;
      const signedUrl = urlResponse.data.data.signedUrl;
      const key = urlResponse.data.data.key;

      // Upload file
      await axios.put(signedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      // Upload data
      return dataProvider.create(resource, {
        ...params,
        data: {
          ...params.data,
          image,
          key,
        },
      });
    }
  },
  update: async (resource, params) => {
    if (resource !== 'categories' && resource !== 'questions') {
      // fallback to the default implementation
      return dataProvider.update(resource, params);
    }

    if (resource === 'questions') {
      console.log(params);
      let image = params.data.image;
      console.log(image);

      if (image && typeof image !== 'string' && typeof image !== null) {
        console.log(params);
        const file = image.rawFile;
        // Get signed url
        const urlResponse = await axios({
          url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/get-signed-url`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          },
          params: {
            resource: `questions`,
            fileType: file.type,
            key: params.id,
          },
        });
        // Update the file
        image = urlResponse.data.data.url;
        const signedUrl = urlResponse.data.data.signedUrl;

        console.log(image);

        // Upload file
        await axios.put(signedUrl, file, {
          headers: {
            'Content-Type': file.type,
          },
        });
      }

      // Update the category
      return dataProvider.update(resource, {
        ...params,
        data: {
          ...params.data,
          image,
        },
      });
    }

    if (resource === 'categories') {
      let image = params.data.image;

      if (typeof image !== 'string' && typeof image !== null) {
        console.log(params);
        const file = image.rawFile;
        // Get signed url
        const urlResponse = await axios({
          url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/get-signed-url`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          },
          params: {
            resource: `categories`,
            fileType: file.type,
            key: params.data.key,
          },
        });
        // Update the file
        image = urlResponse.data.data.url;
        const signedUrl = urlResponse.data.data.signedUrl;

        console.log(image);

        // Upload file
        await axios.put(signedUrl, file, {
          headers: {
            'Content-Type': file.type,
          },
        });
      }

      console.log(params.data.name === params.previousData.name);
      if (params.data.name === params.previousData.name) {
        delete params.data.name;
      }
      // Update the category
      return dataProvider.update(resource, {
        ...params,
        data: {
          ...params.data,
          image,
        },
      });
    }
  },
};

export default myDataProvider;
