<template>
  <v-app>

    <!--успешный снекбар--> 
    <v-snackbar v-model="$store.state.snackbar" :vertical="$store.state.vertical" :timeout="4000" top color="success" outlined center >
      {{ $store.state.snackbarText }}
      <template v-slot:action="{ attrs }"> <v-btn color="success" text v-bind="attrs" @click="$store.state.snackbar = false" > Закрыть </v-btn> </template>
    </v-snackbar>

    <!--ошибка снекбар-->
    <v-snackbar v-model="$store.state.snackbarError" :vertical="$store.state.vertical" :timeout="9000" top tile color="red accent-2" center >
      {{ $store.state.snackbarText }}
      <template v-slot:action="{ attrs }"> <v-btn color="white" text v-bind="attrs" @click="$store.state.snackbarError = false" > Закрыть </v-btn> </template>
    </v-snackbar>

    <router-view></router-view>
  </v-app>
</template>

<script>
import 'vuetify/dist/vuetify.min.css'


export default {
  name: 'App',
  data: () => ({

  }),
};
</script>
