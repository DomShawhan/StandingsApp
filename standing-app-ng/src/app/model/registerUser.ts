
export class RegisterUser {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    admin: boolean;
    password: string;

    constructor(
        id: number = 0,
        username: string = '',
        firstname: string = '',
        lastname: string = '',
        phone: string = '',
        email: string = '',
        password: string = '',
        admin: boolean = false
    ) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.email = email;
        this.admin = admin;
        this.password = password;
    }
}