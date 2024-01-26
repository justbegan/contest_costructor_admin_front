<template>
    <div>
        <v-container>
            <v-simple-table dense>
                <template v-slot:default>
                <thead>
                    <tr>
                        <th>id</th>
                        <th class="text-left" v-for="(h, index) in schema" :key="index">
                            {{ index }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, table_index) in statements.data" :key="table_index" >
                        <td>{{ item._id }}</td>
                        <td v-for="(h, index) in schema" :key="index">
                            {{ item[index] }}
                        </td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'StatementsList',
    data() {
        return {
            statements: [],
            schema: {}
        }
    },
    methods: {
        getStatements: async function () {
            let url = 'http://127.0.0.1:8000/statement/get_statements';
            let response = await fetch(url);
            let result = await response.json();
            this.statements = result
        },
        getSchema: async function () {
            let url = 'http://127.0.0.1:8000/schema/get_schema?contest_oid=65a767c72e0fe1554e0d3c9a';
            let response = await fetch(url);
            let result = await response.json();
            this.schema = result.data.properties
            console.log(this.schema)
        },
    },
    mounted: function () {
        this.getSchema()
        this.getStatements()
    }
}
</script>
