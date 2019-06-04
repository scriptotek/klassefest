<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
  <b-container>
    <b-navbar-brand :to="{ name: 'home' }"><fa-icon icon="ice-cream" /> Klassefest</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>

      <b-navbar-nav>
        <b-nav-item href="/activity">Aktivitet</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!--
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
        -->

        <b-nav-item-dropdown right v-if="user">
          <!-- Using 'button-content' slot -->
          <template slot="button-content"><fa-icon icon="user-circle" /> {{ user.profile.name }}</template>
          <b-dropdown-item :to="{ name: 'user-settings' }"><fa-icon icon="cogs" /> Innstillinger</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'logout' }"><fa-icon icon="sign-out-alt" /> Logg ut</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-container>
  </b-navbar>
</template>

<script>
import { user as userService } from '@/services'

export default {
  name: 'NavBar',
  data: function () {
    return {
      user: null
    }
  },
  mounted() {
    userService.get().then(user => this.user = user)
  }
}
</script>

<style>

</style>
