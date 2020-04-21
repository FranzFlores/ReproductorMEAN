import { Album } from './album';

export class Artist {
    constructor(
        _id = '',
        name = '',
        description = '',
        image = '',
        status = false,
      
    ){
        this._id = _id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.status = status;
    }

    _id: string;
    name:string;
    description:string;
    image: string;
    status:boolean;
    albums:Album[];
}
