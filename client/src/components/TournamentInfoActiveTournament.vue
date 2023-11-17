<template>
    <div class="row text-light rounded p-2 justify-content-center">
        <div class="col-10 py-2 d-flex flex-column align-items-center card-bg formCard">
            <div class="row w-md-75 w-100 banner-img justify-content-center"
                :style="{ backgroundImage: 'url(' + activeTournament.imgUrl + ')' }">
                <div class="col-12 d-flex align-items-center justify-content-center">
                    <p v-if="activeTournament.startDate >= new Date()" class="fs-3 timer py-1 px-2">{{ countdown }}</p>
                </div>
            </div>
            <div class="row w-100">
                <div class="col-12 w-100">
                    <h1 class="text-shadow text-break mt-2 text-center">{{ activeTournament.name }}</h1>
                    <div class="row">
                        <div class="col-12 col-md-6 text-md-start text-center order-2 order-md-1">
                            <p class="fs-5 text-break m-md-0 m-2">{{ activeTournament.address }}</p>
                            <p v-if="activeTournament.playerCount == 1" class="m-md-0 m-2">{{ players.length }} Entrant</p>
                            <p v-else class="m-md-0 m-2">{{ players.length }} Entrants</p>
                        </div>
                        <div class="col-12 col-md-6 text-md-end text-center order-1 order-md-2">
                            <h2 class="m-md-0 m-2">{{ activeTournament.gameName }}</h2>
                            <div v-if="activeTournament.startDate">
                                <p v-if="activeTournament.startDate.toLocaleDateString() == activeTournament.endDate.toLocaleDateString()"
                                    class="m-md-0 m-2">
                                    {{ activeTournament.startDate.toLocaleDateString() }}
                                </p>
                                <p v-else class="m-md-0 m-2">
                                    {{ activeTournament.startDate?.toLocaleDateString() }}
                                    -
                                    <span v-if="activeTournament.endDate < activeTournament.startDate">TBD</span>
                                    <span v-else>{{ activeTournament.endDate?.toLocaleDateString() }}</span>
                                </p>
                            </div>
                        </div>
                        <div
                            class="col-12 d-flex flex-md-row flex-column justify-content-between text-md-start text-center order-3">
                            <p class="fs-5 m-md-0 m-2">$
                                <span v-if="activeTournament.prizePool" class="fw-bold">{{ activeTournament.prizePool }}
                                </span>
                                <span v-else class="fw-bold">TBD </span>
                                Prize Pool
                            </p>
                            <div class="text-center text-md-end">
                                <p class="m-md-0 m-2">Entry fee: $
                                    <span v-if="activeTournament.entryPrice">{{ activeTournament.entryPrice }}</span>
                                    <span v-else>TBD</span>
                                </p>
                                <p v-if="activeTournament.startDate < new Date()" class="m-md-0 m-2"> Registration is over
                                </p>
                                <p v-else class="m-md-0 m-2">Registration ends:
                                    <span v-if="activeTournament.signUpDeadline">{{
                                        activeTournament.signUpDeadline?.toLocaleDateString() }}</span>
                                    <span v-else>TBD</span>
                                </p>
                            </div>
                        </div>
                        <div class="col-12 mt-3 order-4">
                            <p class="text-break w-100 text-md-start text-center">{{ activeTournament.description }}</p>
                        </div>
                        <div class="col-12 d-flex justify-content-md-end justify-content-center align-items-center order-5">
                            <div class="text-end my-2 " v-if="!account.id">
                                <!-- FIXME make look better pls -->
                                <p class="text-end"> Sign in to register!</p>
                                <button class="btn btn-valor button w-25" @click="login()">Register</button>
                            </div>
                            <div v-else class="my-2 text-end">
                                <RouterLink v-if="activeTournament.creatorId == account.id"
                                    :to="{ name: 'ManageTournament', params: { tournamentId: activeTournament.id } }">
                                    <button class=" text-white btn btn-valor button w-100">Edit</button>
                                </RouterLink>
                                <div v-else class="text-end">
                                    <button @click="registerForTournament(players, account)"
                                        v-if="players.find(p => p.accountId == account.id) == null"
                                        :disabled="activeTournament.startDate?.toLocaleDateString() < new Date().toLocaleDateString()"
                                        class="text-white btn btn-valor button w-100">Register
                                    </button>
                                    <button @click="unregisterForTournament(players.find(p => p.accountId == account.id))"
                                        v-else
                                        :disabled="activeTournament.startDate?.toLocaleDateString() < new Date().toLocaleDateString()"
                                        class="text-white btn btn-danger button w-100">Unregister
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { onMounted, ref, onUnmounted, computed } from 'vue';
import Pop from '../utils/Pop';
import { tournamentsService } from '../services/TournamentsService';
import { logger } from '../utils/Logger';
import { AuthService } from '../services/AuthService';
export default {
    setup() {
        const route = useRoute();
        let countdown = ref('');
        let countdownInterval = null;
        onMounted(() => {
            countdownInterval = setInterval(getCountdownTime, 1000);
        });
        onUnmounted(() => {
            clearInterval(countdownInterval);
        });
        function getCountdownTime() {
            const countdownDifference = AppState.activeTournament.startDate.getTime() - new Date().getTime();
            let days = Math.floor(countdownDifference / (1000 * 60 * 60 * 24));
            let hours = Math.floor((countdownDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((countdownDifference % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((countdownDifference % (1000 * 60)) / 1000);
            if (countdownDifference < 0) {
                countdown.value = '';
            }
            else {
                countdown.value = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
        }
        return {
            route,
            activeTournament: computed(() => AppState.activeTournament),
            countdown,
            players: computed(() => AppState.playersInActiveTournament),
            account: computed(() => AppState.account),
            async registerForTournament(players, account) {
                try {
                    // TODO MAKE THROW ERROR IF ALREADY REGISTERED
                    if (players.find(p => p.accountId == account.id)) {
                        Pop.error('you are already registered for this event');
                        return;
                    }
                    const yes = await Pop.confirm('Are you sure you would like to register for this event?');
                    if (!yes) {
                        return;
                    }
                    await tournamentsService.registerForTournament(route.params.tournamentId);
                }
                catch (error) {
                    Pop.error(error);
                }
            },
            async unregisterForTournament(account) {
                try {
                    const yes = await Pop.confirm('Are you sure you would like to cancel your registration for this event?');
                    if (!yes) {
                        return;
                    }
                    logger.log('account', account);
                    await tournamentsService.unregisterForTournament(account.id);
                }
                catch (error) {
                    Pop.error(error);
                }
            },
            async login() {
                AuthService.loginWithPopup();
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.card-bg {
    background-color: #444444;
}

p {
    margin-bottom: 0;
}

.banner-img {
    height: 15rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}

.timer {
    text-shadow: 0px 0px 7px black;
}

.btn-valor {
    background-color: #2ca58d;
    border: 0;
}

.text-shadow {
    text-shadow: 2px 2px 4px #2ca58d;
}

.formCard {
    background-color: rgb(68, 68, 68);
    box-shadow: 0px 5px 4px #2ca58d;
    border: 1.5px solid #2ca58d;
}

.button {
    width: 25%
}

@media(max-width: 500px) {
    .button {
        width: 100%;
    }
}
</style>