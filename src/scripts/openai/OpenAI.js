import { Configuration, OpenAIApi } from "openai";
import { extractGeneratedPicturesResponse } from "../Utils.js";
import GenerateService from "./generate.js";
import { isUndefinedOrNull } from "../../shared/utils/index.js";
import { getOpenAIApiConfig } from "../../configuration/index.js";

export let openai;

export class OpenAI {
  constructor() {
    this.getOpenAIApiLocalConfiguration = new Configuration({
      organization:
        process.env.OPENAI_ORGANIZATION ?? getOpenAIApiConfig().organization,
        apiKey: process.env.OPENAI_API_KEY ?? getOpenAIApiConfig().apiKey,
    });
    this.openai = this.getOpenAIApi();
  }

  getOpenAIApi() {
    let oi = null;
    if (isUndefinedOrNull(openai)) {
      oi = new OpenAIApi(this.getOpenAIApiLocalConfiguration);
    } else {
      oi = openai;
    }
    return oi;
  }

  async generateText(promot) {
    const { prompt } = value;
    const gs = new GenerateService(this.openai);
    const res = await gs.generateText(prompt, id);
    if (
      isUndefinedOrNull(res) ||
      isUndefinedOrNull(res.story) ||
      isUndefinedOrNull(res.picturePrompt)
    ) {
      return false;
    }

    return res;
  }

  async generatePictures(prompt, count) {
    const { prompt, count } = value;
    const gs = new GenerateService(this.openai);
    const bufferList = extractGeneratedPicturesResponse(
      await gs.generatePicture(prompt, count)
    );
    if (isUndefinedOrNull(bufferList)) {
      return false;
    }
    return bufferList;
  }
}

export default class Bilderbuchgenerator extends OpenAI {
  constructor() {
    super();
  }
  /**
   *
   * @param {*} title: string -> title
   * @param {*} prompt: string -> openAI prompt
   * @param {*} imageCount: number -> image count
   * @returns book_id
   */
  async startGeneration(title, prompt, imageCount) {
    imageCount = 1;
    const value = { prompt, count: imageCount, title };
    return [await this.generateText(), await this.generatePictures()];
  }
}
