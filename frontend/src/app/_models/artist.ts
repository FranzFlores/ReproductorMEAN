export class Artist {
    constructor(
        _id = '',
        name = '',
        description = '',
        image = ''
    ){
        this._id = _id;
        this.name = name;
        this.description = description;
        this.image = image;
    }

    _id: string;
    name:string;
    description:string;
    image: string;
}
