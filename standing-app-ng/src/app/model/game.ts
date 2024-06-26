import { Team } from "./team";

export class Game {
    id: number;
    homeTeamId: number;
    awayTeamId: number;
    homeScore: number;
    awayScore: number;
    scheduled: Date;
    winningTeamId: number;
    losingTeamId: number;
    status: string;
    fieldNbr: number;
    addressLine: string;
    parkName: string;
    city: string;
    state: string;
    zip: string;
    homeTeam: Team;
    awayTeam: Team;

    constructor(
        id: number = 0,
        homeTeamId: number = 0,
        awayTeamId: number = 0,
        homeScore: number = 0,
        awayScore: number = 0,
        scheduled: Date = new Date,
        winningTeamId: number = 0,
        losingTeamId: number = 0,
        status: string = '',
        fieldNbr: number = 0,
        addressLine: string = '',
        city: string = '',
        state: string = '',
        zip: string = '',
        parkName: string = '',
        homeTeam: Team = new Team(),
        awayTeam: Team = new Team()
    ){
        this.id = id;
        this.homeTeamId = homeTeamId;
        this.awayTeamId = awayTeamId;
        this.homeScore = homeScore;
        this.awayScore = awayScore;
        this.scheduled = scheduled;
        this.winningTeamId = winningTeamId;
        this.losingTeamId = losingTeamId;
        this.status = status;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.fieldNbr = fieldNbr;
        this.addressLine = addressLine;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.parkName = parkName;
    }
}