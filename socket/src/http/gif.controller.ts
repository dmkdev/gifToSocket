import { JsonController, Post, Body } from "routing-controllers";
import GifsService from "../services/gif.service";

@JsonController('/gifs', { transformResponse: true })
class GifsController {

  @Post('/')
  insertGif(@Body() gif: any) {
    let gifService = new GifsService();
    gifService.insertGif(gif);

    return {
      status: 200,
      success: true
    };
  }
}

export default GifsController;