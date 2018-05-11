import {ConfigService} from "./../providers/config-service";
import {Injectable, Pipe} from "@angular/core";

/*
 Generated class for the ImageSourcePipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'imgPipe'
})
@Injectable()
export class ImageSourcePipe {
    /*
     Takes a value and makes it lowercase.
     */

    constructor(private config: ConfigService) {
    }

    transform(value, args) {
        if (value) {
            value = this.getImageSource(value)
        }
        return value;
    }

    getImageSource(src: string): string {
        if (!this.config.isLowResolution) {
            src = src.replace('@2x', '@3x');
        }
        return src;
    }
}
