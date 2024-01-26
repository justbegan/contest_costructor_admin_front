<template>
    <v-container>
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
                <tr v-for="item in schemasList" :key="item.name" @click="getSchemaByContestOid(item.contest_oid)">
                <td>{{ item.title }}</td>
                <td>{{ getContestNameById(item.contest_oid).title }}</td>
                <td>{{ getContestNameById(item.contest_oid).statements_count }}</td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
        {{ selectedSchema }}
    </v-container>
</template>

<script>
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
            let url = 'http://127.0.0.1:8000/schema/get_all';
            let response = await fetch(url);
            let result = await response.json();
            this.schemasList = result.data
        },
        getAllCotests: async function () {
            let url = 'http://127.0.0.1:8000/contes/get_contests';
            let response = await fetch(url);
            let result = await response.json();
            this.contestList = result.data
        },
        getContestNameById: function (id) {
            let item = this.contestList.find(item => item._id === id);
            return item ? item : null;
        },
        getSchemaByContestOid: async function (id) {
            let url = 'http://127.0.0.1:8000/schema/get_schema?contest_oid=' + id
            let response = await fetch(url);
            let result = await response.json();
            this.selectedSchema = result.data
        }
    },
    mounted: function () {
        this.getSchemas()
        this.getAllCotests()
    }
}
</script>