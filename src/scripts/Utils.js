import { isUndefinedOrNull } from "../shared/utils/index.js";

export const extractGeneratedTextResponse = async (response) => {
  const { story, picturePrompt } = response;
  return {
    story,
    prompt: picturePrompt,
  };
};

export const extractGeneratedPicturesResponse = async (data) => {
  let images = [];

  if (!isUndefinedOrNull(data)) {
    for (const buffer of data) {
      let myBuffer = Buffer.alloc(data.length);
      for (var i = 0; i < data.length; i++) {
        myBuffer[i] = data[i];
      }
      images.push(myBuffer);
    }

    return images;
  }

  return null;
};
