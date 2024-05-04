export class Team {
    id: number;
    coachId: number;
    name: string;
    leagueId: number;

    constructor(
        id: number = 0,
        coachId: number = 0,
        name: string = '',
        leagueId: number = 0     
    ) {
        this.id = id;
        this.coachId = coachId;
        this.name = name;
        this.leagueId = leagueId;
    }
}