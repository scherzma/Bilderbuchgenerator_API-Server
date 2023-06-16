/* eslint-disable no-restricted-syntax */
import { describe, it } from 'mocha';
import { assert } from 'chai';
import { generateText, generatePicture } from '../controllers/BookController.js';

const chatGTPPromt = 'string';

/* describe('test chatGTP text generation', () => {
  it(('test text generation'), () => generateText(chatGTPPromt).then((res) => {
    assert.notEqual(res, null);
  }));
});
*/

describe('test ChatCPT text generation and Dall-E picture generation', async () => {
  let picturePromt = null;

  it('test text generation', async () => {
    const generatedText = await generateText(chatGTPPromt);
    if (generatedText !== null) {
      picturePromt = generatedText.picturePrompt;
    }
    assert.notEqual(generatedText, null);
  });

  it('test picture generation', async () => {
    if (picturePromt === null) {
      assert(false);
    }
    const generatedPicture = await generatePicture(picturePromt);
    assert.notEqual(generatedPicture, null);
  });
});
