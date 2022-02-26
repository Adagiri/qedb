import jsonServerProvider from 'ra-data-json-server';
import { fetchUtils } from 'react-admin';
import axios from 'axios';

const AUTH_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGNlY2ZiMmJmZTE0NjAwMGM1NjM1MiIsInJvbGUiOiJBZG1pbiIsImlzQWRtaW4iOnRydWUsImlzTW9kZXJhdG9yIjpmYWxzZSwiaWF0IjoxNjQ1MTgxMjU5LCJleHAiOjE2NTI5NTcyNTl9.IpT25KcpDgRU0MnjmJdJVBt-bVanJ-k2GWRPuaopu7c';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  // add your own headers here
  options.headers.set(
    'Authorization',
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGNlY2ZiMmJmZTE0NjAwMGM1NjM1MiIsInJvbGUiOiJBZG1pbiIsImlzQWRtaW4iOnRydWUsImlzTW9kZXJhdG9yIjpmYWxzZSwiaWF0IjoxNjQ1MTgxMjU5LCJleHAiOjE2NTI5NTcyNTl9.IpT25KcpDgRU0MnjmJdJVBt-bVanJ-k2GWRPuaopu7c'
  );
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = jsonServerProvider(
  'http://localhost:9000/api/v1',
  httpClient
);

const myDataProvider = {
  ...dataProvider,
  create: async (resource, params) => {
    if (resource !== 'categories') {
      // fallback to the default implementation
      return dataProvider.create(resource, params);
    }

    // Get signed url
    // const urlResponse = await axios({
    //   url: 'http://localhost:9000/api/v1/users/get-signed-url',
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: AUTH_TOKEN,
    //   },
    //   params: {
    //     key: `categories/29.png`,
    //   },
    // });

    // console.log(urlResponse);

    // const image = urlResponse.data.data.url;
    // const signedUrl = urlResponse.data.data.signedUrl;
    // const file = params.data.image.rawFile;

    // // Upload file
    // await axios.put(signedUrl, file, {
    //   headers: {
    //     'Content-Type': file.type,
    //   },
    // })

    // Upload data
    return dataProvider.create(resource, {
      ...params,
      data: {
        ...params.data,
        image: 'https://image.png',
      },
    });
  },
};

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file.rawFile);
  });

export default myDataProvider;
