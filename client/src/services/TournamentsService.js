// import { applyStyles } from "@popperjs/core"
import { AppState } from "../AppState"
import { Player } from "../models/Player"
import { Tournament } from "../models/Tournament"
import { logger } from "../utils/Logger"
// import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class TournamentsService{

    async sortByNew(){
        await AppState.tournamentsParticipatedIn.sort((a, b)=>{
            return new Date(a.tournament.startDate) - new Date(b.tournament.startDate) 
        })
        return AppState.tournamentsParticipatedIn
    }
    async sortByOld(){
        await AppState.tournamentsParticipatedIn.sort((a, b)=>{
            return new Date(b.tournament.startDate) - new Date(a.tournament.startDate) 
        })
        return AppState.tournamentsParticipatedIn
    }
    async sortMyTournamentsByNew(){
        // logger.log(AppState.myTournaments)
        await AppState.myTournaments.sort((a, b)=>{
            return new Date(a.startDate) - new Date(b.startDate)
        })
        return AppState.myTournaments
    }
    async sortMyTournamentsByOld(){
        await AppState.myTournaments.sort((a, b)=>{
            return new Date(b.startDate) - new Date(a.startDate)
        })
        return AppState.myTournaments
    }
    async getActiveTournaments(){
        AppState.activeTournaments = []
        const res = await api.get(`api/tournaments`)
        AppState.activeTournaments = res.data.map((pojo) => new Tournament(pojo))
        logger.log('active tournaments', res.data)
    }
    async getMyTournaments(creatorId){
        const res = await api.get(`api/tournaments/creator/${creatorId}`)
        AppState.myTournaments = res.data.map(tournament => new Tournament(tournament))
    }

    async createTournament(body){
        const res = await api.post('api/tournaments', body)
        logger.log('new tournament', res.data)
        return res.data
    }

    async getTournamentById(tournamentId){
      const res = await api.get(`api/tournaments/${tournamentId}`)
      AppState.activeTournament = new Tournament(res.data)
    }
    

    async getTournamentsByGameId(gameId){
        AppState.activeTournaments = []
        const res = await api.get(`api/tournaments/game/${gameId}`)
        logger.log('my tournaments', res.data)
        AppState.activeTournaments = res.data.map(t=> new Tournament(t))
        AppState.searchedTournaments = res.data.map(t=> new Tournament(t))

    }

    async editActiveTournament(tournamentData, tournamentId){
        const res = await api.put(`api/tournaments/${tournamentId}`, tournamentData)
        AppState.activeTournament = new Tournament(res.data)

    }

    async cancelTournament(tournamentId) {
       const res = await api.delete(`api/tournaments/${tournamentId}`)
        AppState.activeTournament = new Tournament(res.data)
    }

    async searchTournamentsByName(query){
        const res = await api.get(`api/tournaments/query?name=${query.name}`)
        logger.log('searched touneys', res.data)
        AppState.searchedTournaments = res.data.map(t=> new Tournament(t))
    }

    filterTournaments(userInput){
        if(userInput == ''){
            AppState.searchedTournaments = AppState.activeTournaments
        }
AppState.searchedTournaments = AppState.activeTournaments.filter(t => t.name.toLowerCase().includes(userInput.toLowerCase()))

    }

clearData() {
    AppState.activeTournament = null
}

async registerForTournament(tournamentId){
    const res = await api.post('api/players', {tournamentId})
    AppState.playersInActiveTournament.push(new Player(res.data))
}

async unregisterForTournament( playerId){
    const res = await api.delete(`api/players/${playerId}`)
   AppState.playersInActiveTournament =  res.data.map(p => new Player(p))
}

}



export const tournamentsService = new TournamentsService()