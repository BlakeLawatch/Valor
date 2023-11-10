export class Player{
    constructor(data){
        this.id = data.id
        this.accountId = data.accountId
        this.tournamentId = data.tournamentId
        this.seed = data.seed
        this.profile = data.profile
        this.tournament = data.tournament
    }
}