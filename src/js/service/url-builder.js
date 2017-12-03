import {BASE_API} from "./api";
import {PAGE_SIZE} from "./api";

export class URLBuilder {
  /**
   * @param {string} options
   * @returns {string}
   */
  static buildURL(options) {
    if (!options || !URLBuilder.validateOptions(options)) {
      return BASE_API;
    }

    return BASE_API + 'term=' + options.split(' ').join('+') + "&limit=" + PAGE_SIZE;
  }

  //todo delete me
  static validateOptions () {
    return true;
  }
}