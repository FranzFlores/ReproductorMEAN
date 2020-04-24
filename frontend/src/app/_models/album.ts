import { Artist } from './artist';
import {Song} from './song';

export class Album {
    constructor(
        _id = '',
        title = '',
        year = 0,
        gender = '',
        status = false,
        image='',
    ) {
        this._id = _id;
        this.title = title;
        this.year = year;
        this.gender = gender;
        this.status = status;
        this.image = image;
    }
    _id: string;
    title: string;
    year: number;
    gender: string;
    status: boolean;
    image: string;
    artistId: Artist;
    songs:Song[];
}
