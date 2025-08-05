import axios from 'axios';
import { rapidApiKey } from '../constants';

const baseUrl = 'https://exercisedb.p.rapidapi.com/';
const proxyUrl = 'http://192.168.18.49:3000/exercise-gif'; // replace with your actual server URL

const apiCall = async (url) => {
  try {
    const options = {
      method: 'GET',
      url,
      headers: {
        'x-rapidapi-key': rapidApiKey,
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
      },
    };
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 👇 Instead of actually fetching the image binary, just return the proxy URL
const fetchExerciseGif = (exerciseId) => {
  return `${proxyUrl}?id=${exerciseId}`;
};

export const fetchExercisesByBodyPart = async (bodyPart) => {
  const exerciseData = await apiCall(`${baseUrl}exercises/bodyPart/${bodyPart}`);
  const data = [];

  for (const e of exerciseData) {
    const gif = fetchExerciseGif(e.id); // just generate the URL
    data.push({ ...e, gif });
  }
  return data;
};
