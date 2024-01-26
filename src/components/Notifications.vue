<template>
    <div>
        <v-container>
            <!--успешный снекбар--> <v-snackbar v-model="snackbar" :vertical="vertical" top color="success" outlined center >
            {{snackbarText}}
            <template v-slot:action="{ attrs }"> <v-btn color="success" text v-bind="attrs" @click="snackbar = false" > Закрыть </v-btn> </template>
            </v-snackbar>

            <!--ошибка снекбар-->
            <v-snackbar v-model="snackbarError" :vertical="vertical" :timeout="12000" top tile color="red accent-2" center >
            {{snackbarText}}
            <template v-slot:action="{ attrs }"> <v-btn color="white" text v-bind="attrs" @click="snackbarError = false" > Закрыть </v-btn> </template>
            </v-snackbar>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'my_sneckbar',
    data() {
        return {
            snackbar: false,
            snackbarError: false,
            snackbarText: 'Hello World',
            vertical: true,
        }
    },
    methods: {

    },
    mounted: function () {

    }
}
</script>
