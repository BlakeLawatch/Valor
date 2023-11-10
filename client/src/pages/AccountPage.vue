<template>
  <div class="container-fluid">
    <section v-if="account.id" class="row justify-content-center text-light">
      <ProfileCardVue/>
    </section>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import ProfileCardVue from '../components/ProfileCard.vue'
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  },
  components: {ProfileCardVue}
}
</script>

<style scoped>

</style>
