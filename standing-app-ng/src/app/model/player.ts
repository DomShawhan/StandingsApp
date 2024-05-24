export class Player {
    id: number;
    firstname: string;
    lastname: string;
    birthday: Date;
    teamId: number;
    bats: string;
    throws: string;

    constructor(
        id: number = 0,
        firstname: string = '',
        lastname: string = '',
        birthday: Date = new Date(),
        teamId: number = 0,
        bats: string = '',
        throws: string = ''
    ) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthday = birthday;
        this.teamId = teamId;
        this.bats = bats;
        this.throws = throws;
    }
}