import axios from 'axios';
import { populateGlobal } from 'vitest/environments';
import { beforeAll } from 'vitest';
const FormData = require('form-data');
const fs = require('fs');

declare global {
  var tempVoiceId: string;
  var baseVoiceId: string;
}

// beforeAll(async () => {
//   try {
//     // Create a FormData object
//     const formData = new FormData();
//     formData.append('displayName', 'Test Voice');
//     const fileStream = fs.createReadStream('./tests/waves/voice-for-cloning.wav');
//     formData.append('file', fileStream);

//     // Make API call to add a new voice
//     const response = await axios.post(
//       'https://waves-api.smallest.ai/api/v1/lightning-large/add_voice',
//       formData,
//       {
//         headers: {
//           'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2UyNmI5NjAxYTRlNTMxOWU5OTJjYWMiLCJpYXQiOjE3NDI4OTE5MjZ9.tu78sI2Pg3e7_-ylG78jggjjWrJGA2iI94C_7JG_dUc`,
//           ...formData.getHeaders()
//         },
//         timeout: 50000
//       }
//     );

//     console.error('done uploading voice', response.data.data);

//     globalThis.tempVoiceId = response.data.data.voiceId;

//     // // Add the same voice again for base voice
//     // const baseResponse = await axios.post(
//     //   'https://waves-api.smallest.ai/api/v1/lightning-large/add_voice',
//     //   formData,
//     //   {
//     //     headers: {
//     //       'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2UyNmI5NjAxYTRlNTMxOWU5OTJjYWMiLCJpYXQiOjE3NDI4OTE5MjZ9.tu78sI2Pg3e7_-ylG78jggjjWrJGA2iI94C_7JG_dUc`,
//     //       ...formData.getHeaders()
//     //     },
//     //     timeout: 50000
//     //   }
//     // );

//     // console.error('done uploading base voice', baseResponse.data.data);
//     // globalThis.baseVoiceId = baseResponse.data.data.voiceId;

//   } catch (error) {
//     console.error('Failed to setup global state:', error);
//     throw error;
//   }
// }, 100000);

export async function setup() {
  try {
    // Create a FormData object
    const formData = new FormData();
    formData.append('displayName', 'Test Voice');
    const fileStream = fs.createReadStream('./tests/waves/voice-for-cloning.wav');
    formData.append('file', fileStream);

    // Make API call to add a new voice
    const response = await axios.post(
      'https://waves-api.smallest.ai/api/v1/lightning-large/add_voice',
      formData,
      {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2UyNmI5NjAxYTRlNTMxOWU5OTJjYWMiLCJpYXQiOjE3NDI4OTE5MjZ9.tu78sI2Pg3e7_-ylG78jggjjWrJGA2iI94C_7JG_dUc`,
          ...formData.getHeaders()
        },
        timeout: 50000
      }
    );

    console.error('done uploading voice', response.data.data);
    process.env.TEMP_VOICE_ID = response.data.data.voiceId;
  } catch (error) {
    console.error('Failed to setup global state:', error);
    throw error;
  }
}
