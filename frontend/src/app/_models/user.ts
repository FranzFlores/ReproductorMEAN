export class User {
    constructor(
        id = '',
        name = '',
        userName = '',
        email = '',
        password = '',
        deleted = false,
        newPassword = '',
        oldPassword = ''
    ){
        this.id = id;
        this.name = name;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.deleted = deleted;
        this.newPassword = newPassword;
        this.oldPassword = oldPassword;
    }

    id: string;
    name:string;
    userName:string;
    email: string;
    password: string;
    external_id: string;
    getHash: boolean;
    deleted: boolean;
    newPassword: string;
    oldPassword: string;
}
