import { League } from "./league";
import { User } from "./user";

export class Team {
    id: number;
    coachId: number;
    name: string;
    leagueId: number;
    league: League;
    coach: User;

    constructor(
        id: number = 0,
        coachId: number = 0,
        name: string = '',
        leagueId: number = 0,
        league: League = new League(),
        coach: User = new User()
    ) {
        this.id = id;
        this.coachId = coachId;
        this.name = name;
        this.leagueId = leagueId;
        this.league = league;
        this.coach = coach;
    }
}