export class Album {
    constructor(
        _id = '',
        title = '',
        year = 0,
        gender = '',
        status = true,
        artistId = ''
    ) {
        this._id = _id;
        this.title = title;
        this.year = year;
        this.gender = gender;
        this.status = status;
        this.artistId = artistId;
    }
    _id: string;
    title: string;
    year: number;
    gender: string;
    status: boolean;
    artistId: string;
}
