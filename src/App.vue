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

    <v-dialog v-model="$store.state.sureDialog" persistent max-width="290" >
      <v-card>
        <v-card-title class="text-h5">
          Вы уверены?
        </v-card-title>
        <v-card-text>Потверждение</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false" >
            Disagree
          </v-btn>
          <v-btn color="green darken-1" text @click="dialog = false" >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
