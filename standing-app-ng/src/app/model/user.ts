
export class User {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    admin: boolean;

    constructor(
        id: number = 0,
        username: string = '',
        firstname: string = '',
        lastname: string = '',
        phone: string = '',
        email: string = '',
        admin: boolean = false
    ) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.email = email;
        this.admin = admin;
    }
}