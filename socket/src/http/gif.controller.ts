import { JsonController, Get } from 'routing-controllers';
import GifService from '../services/gif.service';

@JsonController('/gifs', { transformResponse: true })
class GifsController {

  @Get('/')
  retrieveGifs() {
    const gifService = new GifService();

    gifService.getAllGifs();

    return {
      status: 200,
      success: true
    };
  }
}

export default GifsController;