<template>
    <v-container col-11 fluid>
        <v-dialog v-model="dialog" persistent max-width="800px" >
            <v-card>
                <v-card-title class="text-h5"> Новый параметр </v-card-title>
                <v-card-text>
                    <v-switch v-model="jsonType" :label="`json mode: ${jsonType.toString()}`" ></v-switch>
                </v-card-text>
                <v-card-text>
                    <template v-if="jsonType">
                        <vueJsonEditor v-model="json" mode="code" :show-btns="false"/>
                    </template>
                    <template v-else>
                        <v-text-field v-model="parameterKey" label="Ключ параметра"></v-text-field>
                        <v-text-field v-model="parameterTitle" label="Название параметра"></v-text-field>
                        <v-select :items="parameterTypes" v-model="parameterType" label="Тип данных"></v-select>
    
                        <template v-if="parameterType=='integer'">
                            <v-checkbox v-model="integerTypeDate" label="Дата" ></v-checkbox>
                        </template>
    
                        <template v-if="parameterType=='object'">
                            <v-select :items="classList" v-model="selectedClass" item-text="title" item-value="_id"></v-select>
                            <div class="text-right">
                                <v-btn icon color="green" @click="getClass()"> <v-icon>mdi-cached</v-icon> </v-btn>
                            </div>
                            <h5 class="text-center">Добавить новый классификатор</h5>
                            <CreateClass></CreateClass>
                        </template>
    
                        <template v-if="parameterType=='string'">
                            <v-checkbox v-model="stringTypeArea" label="Большое текстовое поле" ></v-checkbox>
                        </template>
                    </template>
                    
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="dialog = false" > Закрыть </v-btn>
                    <v-btn color="green darken-1" text @click="createParameter()" > Добавить </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-row>
            <v-col class="col-4">
                <div>
                    <h2 class="text-center">Параметры</h2>
                    <div class="text-right mb-2">
                        <v-btn color="primary" @click="dialog=true">Добавить параметр</v-btn>
                    </div>
                    <v-text-field v-model="parameterFind" label="Поиск по title и ключу"></v-text-field>
                    <draggable :list="parametersResult" :options="{ group: 'items', ghostClass: 'ghost' }" class="draggable-list" >
                        <div v-for="(item, index) in parametersResult" :key="index" class="draggable-item">
                            <div v-if="required_fields.includes(getUnknowKey(item))" style="background-color: rgb(165, 55, 55);">
                                <h4 class="text-center">{{ getUnknowKey(item) }}</h4><br>
                                <vue-json-pretty :data="item" :deep="1"/>
                            </div>
                            <div v-else>
                                <h4 class="text-center">{{ getUnknowKey(item) }}</h4><br>
                                <vue-json-pretty :data="item" :deep="1"/>
                            </div>
                        </div>
                    </draggable>
                </div>
            </v-col>
            <v-col>
                <div class="block">
                    <h2 class="text-center">Моя схема</h2>
                    <div class="text-right mb-2">
                        <v-btn @click="createSchema" color="primary">Добавить схему</v-btn>
                    </div>
                    <v-row>
                        <v-col>
                            <v-text-field v-model="schemaTitle" label="Назваение схемы"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-select :items=contests label="Конкурс" item-text="title" item-value="_id" v-model="schemaContest"></v-select>
                        </v-col>
                    </v-row>
                    <draggable v-model="list2" :options="{ group: 'items', ghostClass: 'ghost' }" class="draggable-list2">
                        <div v-for="(item, index) in list2" :key="index" class="draggable-item2">
                            <div class="item-content">
                                <h4 class="text-center">{{ getUnknowKey(item) }}</h4><br>
                                <vue-json-pretty :data="item" :deep="1"/>
                                <v-checkbox v-model=list2[index][getUnknowKey(item)].sub_required label="Обязательное поле"></v-checkbox>
                                <v-text-field v-model=list2[index][getUnknowKey(item)].description label="Описание поля"></v-text-field>
                            </div>
                        </div>
                    </draggable>
                </div>
            </v-col>
        </v-row>
   
    </v-container>
</template>
  
<script>
    import draggable from 'vuedraggable';
    import VueJsonPretty from 'vue-json-pretty';
    import 'vue-json-pretty/lib/styles.css';
    import vueJsonEditor from 'vue-json-editor'
    import CreateClass from '@/components/CreateClass.vue'
    import api_url from '@/conf.js'

    export default {
        components: {
            draggable,
            VueJsonPretty,
            vueJsonEditor,
            CreateClass
        },
        data() {
            return {
                required_fields: ['user_oid'],
                dialog: false,
                list1: [],
                list2: [],
                parameterKey: "",
                parameterTitle: "",
                parameterType: "",
                parameterTypes: ["string", "number", "integer", "object", "array", "boolean", "docs"],
                contests: [],
                schemaTitle: "",
                schemaContest: "",

                snackbar: false,
                snackbarError: false,
                snackbarText: 'Hello World',
                vertical: true,
                json: {
                    "var_name": {
                        "title": "Расшифровка денежного вклада спонсоров",
                        "description": "расшифровывается сумма строки 3 таблицы",
                        "type": "array",
                        "sub_type": "table",
                        "items": {
                            "type": "object",
                            "properties": {
                                "organization_name": {
                                    "type": "string",
                                    "title": "Наименование организации"
                                },
                                "price": {
                                    "type": "number",
                                    "title": "Денежный вклад(руб.)"
                                }
                            },
                            "required": [
                                "source_type",
                                "price"
                            ]
                        }
                    }
                },
                // Классификаторы
                classList: [],
                selectedClass: "",
                // Дата или Int
                integerTypeDate: false,
                // text field or text area field
                stringTypeArea: false,
                jsonType: false,
                parameterFind: ""
            };
        },
        methods: {
            test: function(item) {
                console.log(item)
            },
            getUnknowKey: function (item) {
                let objectKeys = Object.keys(item);
                let unknownKey = objectKeys.find(key => key !== '_id');
                return unknownKey
            },
            getParameters: async function () {
                let url = api_url + '/parameter/get_parameters';
                let response = await fetch(url);
                let result = await response.json();
                this.list1 = result.data
            },
            createParameter: async function() {
                let response = await fetch(api_url + '/parameter/create_parameter', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify(this.getCreatedParameter()),
                });
                if (response.ok) {
                    this.$store.state.snackbarText = "Параметр создан"
                    this.$store.state.snackbar = true
                    this.getParameters()
                    this.dialog = false
                } else {
                    let json = await response.json();
                    this.$store.state.snackbarText = json
                    this.$store.state.snackbarError = true
                }
            },
            getContests: async function () {
                let url = api_url + '/contes/get_contests';
                let response = await fetch(url);
                let result = await response.json();
                this.contests = result.data
            },
            getClass: async function () {
                let url = api_url + '/classificator/get_all_classificators';
                let response = await fetch(url);
                let result = await response.json();
                this.classList = result.data
            },
            createSchema: async function () {
                let response = await fetch( api_url + '/schema/create_schema', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify(
                        {
                            properties: this.getProperties(),
                            required: this.getRequiredFileds(),
                            title: this.schemaTitle,
                            type: "object",
                            contest_oid: this.schemaContest
                        }
                    ),
                });
                if (response.ok) {
                    this.$store.state.snackbarText = "Параметр создан"
                    this.$store.state.snackbar = true
                } else {
                    let json = await response.json();
                    this.$store.state.snackbarText = json
                    this.$store.state.snackbarError = true
                }
            },
            getRequiredFileds: function (){
                let required = []
                for(let i in this.list2){
                    let obj = this.list2[i]
                    if(obj[this.getUnknowKey(obj)].sub_required){
                        required.push(this.getUnknowKey(obj))
                        delete obj[this.getUnknowKey(obj)].sub_required
                    }
                }
                return required
            },
            getProperties: function () {
                let properties = {}
                for(let p in this.list2){
                    let obj = this.list2[p]
                    properties[this.getUnknowKey(obj)] = obj[this.getUnknowKey(obj)]
                }
                return properties
            },
            getCreatedParameter: function (){
                let obj = {
                    [this.parameterKey]:{
                        "title": this.parameterTitle,
                        "type": this.parameterType
                    }
                }
                if(this.parameterType == 'object'){
                    obj[this.parameterKey].properties = {
                        "class": {
                            "type": "string",
                            "classifficator_id": this.selectedClass
                        },
                        "value": {
                            "type": "integer"
                        }
                    }
                    obj[this.parameterKey].required = [ "class", "value" ]
                }
                if(this.parameterType == 'integer' && this.integerTypeDate){
                    obj[this.parameterKey].sub_type = "date"
                }
                if(this.parameterType == 'string' && this.stringTypeArea){
                    obj[this.parameterKey].sub_type = "area"
                }
                if(this.jsonType){
                    return this.json
                }
                return obj
            },
            filterObjectByPartialKey(obj, partialKey) {
                const filteredObject = {};
                const keys = Object.keys(obj);

                keys.forEach(key => {
                if (key.includes(partialKey)) {
                    filteredObject[key] = obj[key];
                }
                });

                return filteredObject;
            },
        },
        computed: {
            parametersResult() {
                return this.list1.filter((d) => {
                let parameter = this.getUnknowKey(d);
                try {
                    let qName = d[parameter]['title'].toString();
                    let obj = qName.toUpperCase().indexOf(this.parameterFind.toUpperCase()) !== -1 || Object.keys(this.filterObjectByPartialKey(d, this.parameterFind)).length > 0;

                    return obj;
                } catch (e) {
                    console.log(e);
                    return false;
                }
                });
            },
        },
        mounted: function () {
            this.getParameters()
            this.getContests()
            this.getClass()
        }
    };
</script>
  
<style>
    .block{ 
        height: 100%;
    }
    .draggable-list {
        border: 1px solid #ddd;
        min-height: 50px;
        padding: 10px;
    }
    .draggable-list2 {
        min-height: 100%;
    }

    .draggable-item {
        margin: 10px;
        padding: 10px;
        cursor: grab;
        border-radius: 15px;
        background-color: rgb(255, 255, 255);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .draggable-item2 {
        width: calc(50% - 20px); /* Устанавливаем ширину элемента в 1/3 ширины контейнера */
        box-sizing: border-box; /* Учитываем padding и border в общей ширине элемента */
        margin: 10px; /* Добавляем отступы между элементами */
        display: inline-block; /* Делаем элементы строчно-блочными, чтобы они располагались в одну линию */
        vertical-align: top; /* Выравниваем элементы по верхнему краю */
        border-radius: 15px;
        background-color: rgb(255, 254, 185);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .ghost {
        opacity: 0.5;
        width: calc(50% - 20px); /* Устанавливаем ширину элемента в 1/3 ширины контейнера */
        box-sizing: border-box; /* Учитываем padding и border в общей ширине элемента */
        margin: 10px; /* Добавляем отступы между элементами */
        display: inline-block; /* Делаем элементы строчно-блочными, чтобы они располагались в одну линию */
        vertical-align: top; /* Выравниваем элементы по верхнему краю */
        border-radius: 15px;
        background-color: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .item-content {
        padding: 10px; /* Добавляем отступы внутри элемента для лучшего визуального отображения */
    }
    .ace-jsoneditor{
        height: 500px !important;
    }
</style>
  