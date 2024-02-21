<template>
    <v-container>
        <v-btn href="http://127.0.0.1:8080/create_parameter">Добавить новую схему</v-btn>
        <v-simple-table>
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left">
                    Название схемы
                </th>
                <th class="text-left">
                    Конкурс
                </th>
                <th class="text-left">
                    Количество заявок
                </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in schemasList" :key="item.name" @click="getSchemaByContestOid(item._id)">
                <td>{{ item.title }}</td>
                <td>{{ getContestNameById(item.contest_oid)?.title }}</td>
                <td>{{ getContestNameById(item.contest_oid)?.statements_count }}</td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
    </v-container>
</template>

<script>
import api_url from '@/conf.js'
export default {
    name: 'create_class',
    data() {
        return {
            schemasList: [],
            contestList: [],
            selectedSchema: {}
        }
    },
    methods: {
        getSchemas: async function () {
            let url = api_url + '/schema/get_all';
            let response = await fetch(url);
            let result = await response.json();
            this.schemasList = result.data
        },
        getAllCotests: async function () {
            let url = api_url + '/contes/get_contests';
            let response = await fetch(url);
            let result = await response.json();
            this.contestList = result.data
        },
        getContestNameById: function (id) {
            let item = this.contestList.find(item => item._id === id);
            return item ? item : null;
        },
        getSchemaByContestOid: async function (id) {
            window.location.href = api_url + '/change_parameter/' + id;
        }
    },
    mounted: function () {
        this.getSchemas()
        this.getAllCotests()
    }
}
</script>