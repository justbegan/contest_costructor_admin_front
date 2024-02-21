<template>
    <v-container>
        <v-text-field v-model="className" label="Назваение классификатора"></v-text-field>
        <p>Параметры</p>
        <div v-for="(i, index) in parameterList" :key="index">
            <v-row>
                <v-col class="col-1">
                    <v-text-field v-model="parameterList[index]['id']" readonly label="id"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field v-model="parameterList[index]['title']" label="Параметр"></v-text-field>
                </v-col>
            </v-row>
        </div>
        <v-btn @click="addParameter()">Добавить позицию</v-btn>
        <v-btn @click="createClassificator()">Добавить</v-btn>
    </v-container>
</template>

<script>
import api_url from '@/conf.js'
export default {
    name: 'create_class',
    data() {
        return {
            className: "",
            parameterList: []
        }
    },
    methods: {
        addParameter: function(){
            this.parameterList.push({
                "title": "",
                "id": this.parameterList.length + 1
            })
        },
        createClassificator: async function(){
            let response = await fetch(api_url + '/classificator/create_classsificator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(
                    {
                        "title": this.className,
                        "data": this.parameterList
                    }
                ),
            });
            if (response.ok) {
                this.$store.state.snackbarText = "Классификатор создан"
                this.$store.state.snackbar = true
                this.parameterList = []

            } else {
                let json = await response.json();
                this.$store.state.snackbarText = json
                this.$store.state.snackbarError = true
            }
        }
    },
    mounted: function () {

    }
}
</script>