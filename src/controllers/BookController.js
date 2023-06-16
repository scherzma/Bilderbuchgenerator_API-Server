import { Configuration, OpenAIApi } from 'openai';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { ResponseCode } from '../shared/types/Api.js';

const prisma = new PrismaClient();

const configuration = new Configuration({
  organization: 'org-2psiFsEO8LSKupS5scygvXsC',
  apiKey: 'sk-',
});
const openai = new OpenAIApi(configuration);

export async function generateText(prompt) {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'user',
        content: 'Deine Rolle ist ein Bilderbuchgenerator. Du bekommt einen Prompt und schreibst eine kurze Geschichte dazu. Ca. 500 Wörter. Als Bild kommt am Ende der Geschichte ein Prompt, der das Bild beschreibt. Befolge die Spezifikation (mit den eckigen Klammern, etc.) exakt. Hier ein Beispiel:\n'
        + '\n'
        + '"""\n'
        + 'Prompt: "Schreib was über einen Ritter."\n'
        + '\n'
        + 'Response:\n'
        + '```\n'
        + '[Geschichte über einen Ritter, ca. 500 Wörter]\n'
        + '[Kurze allgemeine Beschreibung eines passenden Bildes in eckigen Klammern. ca. 10 Wörter]\n'
        + '```\n'
        + '"""\n'
        + `\n${
          'Dein erster Prompt: "'.concat(prompt).concat('"')}`,
      }],
    });

    if (response.status !== ResponseCode.RESPONSE_CODE_Ok) {
      return null;
    }

    const storyWithPicture = response.data.choices[0].message.content;
    const match = storyWithPicture.match(/([\s\S]*)(\[\s*([\s\S]*)\s*\])/);
    const story = match[1].trim();
    const picturePrompt = match[3].trim();

    return { story, picturePrompt };
  } catch (e) {
    return null;
  }
}

export async function generatePicture(picturePrompt) {
  const picture = await openai.createImage({
    prompt: picturePrompt,
    n: 1,
    size: '1024x1024',
  });
  const imageurl = picture.data.data[0].url;

  try {
    const response = await axios({
      method: 'get',
      url: imageurl,
      responseType: 'arraybuffer',
    });

    const imageBuffer = Buffer.from(response.data, 'binary');

    return imageBuffer;
  } catch (err) {
    return null;
  }
}

const BookController = {
  async create(req, res) {
    /**
     * Body:
     * {
     *     title?: "string",
     *     prompt: "string",
     *     usermail: "string"
     * }
     */
    const { body } = req;

    // Generate the story
    const generated = await generateText(body.prompt);

    if (generated === null) {

    }
  },

  async read(req, res) {
    /**
     * Params:
     * {
     *    username: "string"
     * }
     */
    const { id } = req.params;
    console.log(req.params);
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: id,
        },
      });
      console.log(id);
      if (!user) {
        return res.status(ResponseCode.RESPONSE_CODE_NotFound).json({ error: 'User not found.' });
      }

      const books = await prisma.buch.findMany({
        where: {
          userkey: user.user_pk,
        },
        include: {
          bild: true,
        },
      });

      // If no books found, return a message
      if (books.length === 0) {
        return res.json({ message: 'No books found for this user.' });
      }

      return res.json(books);
    } catch (error) {
      return res.status(ResponseCode.RESPONSE_CODE_InternalServerError).json({ error: error.message });
    }
  },

  async delete(req, res) {
    /**
     * Params:
     * {
     *   id: "int"
     * }
     */
    const { id } = req.params;

    try {
      const deletedBook = await prisma.buch.delete({
        where: {
          buch_pk: Number(id),
        },
      });

      return res.json({ message: 'Book deleted successfully.', book: deletedBook });
    } catch (error) {
      return res.status(ResponseCode.RESPONSE_CODE_InternalServerError).json({ error: error.message });
    }
  },
};

export default BookController;
