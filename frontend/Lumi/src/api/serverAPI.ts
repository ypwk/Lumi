import axios from 'axios';
const Transform = require('stream').Transform;

const BASE_URL = 'http://127.0.0.1:5000/';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // Optional: set a timeout for requests
});

export const streamData = async (query: string) => {
  try {
    const response = await instance.get(`/query/${encodeURIComponent(query)}`);

    // Process the received data similarly to your C++ implementation
    // Here, I'm just returning it, but you can adjust as needed
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};

function streamFromAxios() {
  // Create Stream, Writable AND Readable
  const inoutStream = new Transform({
    transform(chunk, _encoding, callback) {
      this.push(chunk);
      callback();
    },
  });

  // Return promise
  axios({
    method: 'get',
    url: BASE_URL,
    responseType: 'stream',
  })
    .then(function (res) {
      res.data.pipe(inoutStream);
    })
    .catch(function (err) {
      console.log(err);
    });

  return inoutStream;
}

function caller() {
  streamFromAxios().on('data', (chunk: any) => {
    console.log(chunk);
  });
}
