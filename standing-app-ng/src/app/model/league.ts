import { User } from "./user";

export class League {
    id: number;
    name: string;
    birthdayBefore: Date;
    year: number;
    managerId: number;
    status: string;
    manager: User;

    constructor(
        id: number = 0,
        name: string = '',
        birthdayBefore: Date = new Date,
        year: number = 0,
        managerId: number = 0,
        status: string = '',
        manager: User = new User()
    ){
        this.id = id;
        this.name = name;
        this.birthdayBefore = birthdayBefore;
        this.year = year;
        this.managerId = managerId;
        this.status = status;
        this.manager = manager;
    }
}