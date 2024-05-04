export class League {
    id: number;
    name: string;
    birthdayBefore: Date;
    year: number;
    managerId: number;

    constructor(
        id: number = 0,
        name: string = '',
        birthdayBefore: Date = new Date,
        year: number = 0,
        managerId: number = 0
    ){
        this.id = id;
        this.name = name;
        this.birthdayBefore = birthdayBefore;
        this.year = year;
        this.managerId = managerId;
    }
}