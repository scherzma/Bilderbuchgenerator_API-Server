import axios from "axios";
import { ResponseCode } from "../../shared/types/Api.js";
import { isUndefinedOrNull } from "../../shared/utils/index.js";

export default class GenerateService {
  constructor(openai) {
    this.openai = openai;
  }

  async generateText(prompt, uuid) {
    try {
      const response = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content:
              "Deine Rolle ist ein Bilderbuchgenerator. Du bekommt einen Prompt und schreibst eine kurze Geschichte dazu. Ca. 500 Wörter. Als Bild kommt am Ende der Geschichte ein Prompt, der das Bild beschreibt. Befolge die Spezifikation (mit den eckigen Klammern, etc.) exakt. Hier ein Beispiel:\n" +
              "\n" +
              '"""\n' +
              'Prompt: "Schreib was über einen Ritter."\n' +
              "\n" +
              "Response:\n" +
              "```\n" +
              "[Geschichte über einen Ritter, ca. 500 Wörter]\n" +
              "[Kurze allgemeine Beschreibung eines passenden Bildes in eckigen Klammern. ca. 10 Wörter]\n" +
              "```\n" +
              '"""\n' +
              `\n${'Dein erster Prompt: "'.concat(prompt).concat('"')}`,
          },
        ],
      });

      if (response.status !== ResponseCode.RESPONSE_CODE_Ok) {
        return null;
      }

      const storyWithPicture = response.data.choices[0].message.content;
      const match = storyWithPicture.match(/([\s\S]*)(\[\s*([\s\S]*)\s*\])/);
      if (isUndefinedOrNull(match)) {
        return null;
      }
      let story = match[1].trim();
      const picturePrompt = match[3].trim();
      return { story, picturePrompt, uuid };
    } catch (e) {
      console.log("error text gen", e);
      return null;
    }
  }

  async generatePicture(picturePrompt, n) {
    const picture = await this.openai.createImage({
      prompt: picturePrompt,
      n: n ?? 1,
      size: "1024x1024",
    });
    const images = picture.data.data;
    const imageurls = [];

    for (let img of images) {
      imageurls.push(img.url);
    }

    let imageBufferList = [];

    for (const imageurl of imageurls) {
      const response = await axios({
        method: "get",
        url: imageurl,
        responseType: "arraybuffer",
      });

      if (response.status !== ResponseCode.RESPONSE_CODE_Ok) {
        return null;
      }

      imageBufferList.push(Buffer.from(response.data, "binary"));
    }
    return imageBufferList;
  }
}
