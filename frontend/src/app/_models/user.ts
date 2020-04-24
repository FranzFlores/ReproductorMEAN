export class User {
    constructor(
        _id = '',
        name = '',
        userName = '',
        email = '',
        password = '',
        deleted = false,
        newPassword = '',
        oldPassword = '',
        image = ''
    ){
        this._id = _id;
        this.name = name;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.deleted = deleted;
        this.newPassword = newPassword;
        this.oldPassword = oldPassword;
        this.image = image;
    }

    _id: string;
    name:string;
    userName:string;
    email: string;
    password: string;
    external_id: string;
    getHash: boolean;
    deleted: boolean;
    image:string;
    newPassword: string;
    oldPassword: string;
}
