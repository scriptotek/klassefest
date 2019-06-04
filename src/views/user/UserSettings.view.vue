<template>
  <b-container>
    <b-form @submit.prevent="onSubmit">

      <b-form-group label="Mine vokabular:" v-if="user">
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="user.settings.vocabularies"
          :options="vocabularies"
          name="flavour-1"
        ></b-form-checkbox-group>
      </b-form-group>

      <LoadingButton :running="saving">Lagre</LoadingButton>
      <span class="px-2 text-success" v-if="saved">
        <fa-icon icon="check-circle" /> 
        Innstillingene ble lagret!
      </span>
    </b-form>
  </b-container>
</template>

<script>
import { LoadingButton } from '@/components'
import { config, user as userService } from '@/services'

export default {
  name: 'UserSettings',
  components: {
    LoadingButton,
  },
  computed: {
    vocabularies() {
      return Object.keys(config.vocabularies).map(key => ({
        value: key,
        text: config.vocabularies[key].name,
      }))
    }
  },
  data: function () {
    return {
      saving: false,
      saved: false,
      user: null,
    }
  },
  async mounted() {
    this.user = await userService.get()
  },
  methods: {
    async onSubmit() {
      this.saved = false
      this.saving = true;
      await userService.saveSettings(this.user)
      this.saving = false
      this.saved = true
    }
  }
}
</script>

<style>

</style>
