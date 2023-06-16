/* eslint-disable no-restricted-syntax */
import { describe, it } from "mocha";
import { assert } from "chai";
import GenerateService from "../scripts/openai/generate.js";
import crypto from "crypto";
import { isUndefinedOrNull } from "../shared/utils/index.js";
import fs from "fs";
import { OpenAI } from "../scripts/openai/OpenAI.js";

const kDefaultPromt = "test";

const testPromtSamples = [
  {
    prompt: "test prompt.",
    title: "test tietle.",
    imageCount: 1,
  },
];

function getPromtSample(index) {
  if (isUndefinedOrNull(testPromtSamples[index])) {
    index = 0;
  }
  const sample = testPromtSamples[index];
  sample.title = sample.title.trim() ?? crypto.randomUUID();
  sample.imageCount = sample.imageCount ?? 1;
  sample.prompt = sample.prompt ?? kDefaultPromt;
  sample.title = sample.title.replace(".", "");
  sample.title = sample.title.replace(",", "");
  sample.title = sample.title.trim();
  return sample;
}

describe("test ChatCPT text generation and Dall-E picture generation", async () => {
  let uuid;
  let picturePromt = null;

  const openai = new OpenAI();
  const gs = new GenerateService(openai.openai);

  for (let i = 0; i < testPromtSamples.length; i++) {
    const prompt = getPromtSample(i);
    uuid = prompt.title;
    it("test text generation | title: " + prompt.title, async () => {
      const generatedText = await gs.generateText(prompt.prompt, prompt.title);
      if (generatedText !== null) {
        picturePromt = generatedText.picturePrompt;
        uuid = generatedText.uuid;
      }
      console.log("text Generiert mit uuid ", uuid);
      assert.notEqual(generatedText, null);
    });

    it(
      "test picture generation | imgCount: " +
        prompt.imageCount +
        " | title: " +
        uuid,
      async () => {
        if (picturePromt === null) {
          assert(false);
        }
        const generatedPictures = await gs.generatePicture(
          picturePromt,
          prompt.imageCount
        );
        console.log("image Generiert mit uuid ", uuid);
        assert(
          generatedPictures !== null &&
            generatedPictures.length === prompt.imageCount
        );
      }
    );
  }
});
