import { ResponseCode } from "../shared/types/Api.js";
import Bilderbuchgenerator from "../scripts/openai/OpenAI.js";
const prisma = null;

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
    const { title, prompt, imageCount } = body;
    const bilderbuchgenerator = new Bilderbuchgenerator();
    const [text, pictureBufferList] = await bilderbuchgenerator.startGeneration(title, prompt, imageCount);
    
    res.status(ResponseCode.RESPONSE_CODE_Ok).send({
      response
    });
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
        return res
          .status(ResponseCode.RESPONSE_CODE_NotFound)
          .json({ error: "User not found." });
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
        return res.json({ message: "No books found for this user." });
      }

      return res.json(books);
    } catch (error) {
      return res
        .status(ResponseCode.RESPONSE_CODE_InternalServerError)
        .json({ error: error.message });
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

      return res.json({
        message: "Book deleted successfully.",
        book: deletedBook,
      });
    } catch (error) {
      return res
        .status(ResponseCode.RESPONSE_CODE_InternalServerError)
        .json({ error: error.message });
    }
  },
};

export default BookController;
