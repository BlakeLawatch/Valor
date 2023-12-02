<template>
  <span class="navbar-text">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <div class="dropdown my-2 my-lg-0">
        <div type="button" class="border-0 selectable no-select " data-bs-toggle="dropdown" aria-expanded="false">
          <div v-if="account.picture || user.picture">
            <img :src="account.picture || user.picture" alt="account photo" height="40" class="rounded-circle" />
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-lg-end dropdown-menu-start p-0 coolBg" aria-labelledby="authDropdown">
          <div class="list-group coolBg">
            <div>
              <button type="button" class="btn coolBg text-light w-100" data-bs-toggle="modal" data-bs-target="#createTournamentModal">
                Create 
            </button>
            </div>
            <router-link @click="rescueProfilePage()" v-if="account.id" :to="{name: 'Account', params: {accountId: account.id}}">
              <div type="button" class="list-group-item dropdown-item list-group-item-action text-light coolBg">
                Manage Account
              </div>

            </router-link>
            <div class="coolBg  list-group-item dropdown-item list-group-item-action text-danger selectable text-center" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { playersService } from '../services/PlayersService'
import { tournamentsService } from '../services/TournamentsService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      },
      async rescueProfilePage(){
        if(AppState.profile.id){
          AppState.profile = AppState.account
          AppState.tournamentsParticipatedIn = []
          AppState.myTournaments = []
          const accountId = AppState.profile.id
          await playersService.getParticipatedIn(accountId)
          await tournamentsService.getMyTournaments(accountId)

        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.coolBg {
  background-color: #444444;
  border-color: #2CA58D;
  border-radius: 0px;
}
</style>
