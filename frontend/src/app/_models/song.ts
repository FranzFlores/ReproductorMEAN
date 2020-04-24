import { Album } from './album';

export class Song {
    constructor(
        _id = '',
        title = '',
        number = 0,
        file = '',
        reproductions = 0,
        // albumId = '',
        status = true,
    ){
        this._id = _id;
        this.title = title;
        this.number = number;
        this.file = file;
        this.reproductions = reproductions;
        // this.albumId = albumId;
        this.status = status;
    }

    _id: string;
    title:string;
    number:number;
    file: string;
    reproductions: number;
    albumId: Album;
    status:boolean;    
}
