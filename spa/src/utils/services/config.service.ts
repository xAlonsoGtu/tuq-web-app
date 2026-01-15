export class ConfigService {
  static _apiURI: string;

    constructor() {
        if (this.isDevMode()) ConfigService._apiURI = 'http://localhost:3001';
        else ConfigService._apiURI = 'http://app..com:3001';
    }

    isDevMode(){
        return true;
    }

    static get ApiURI() {
        return "http://localhost:3001";
    }    
}
