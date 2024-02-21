<template>
    <div>
        <v-container>
            <p v-for="(i, index) in schema" :key="index">
                <v-text-field v-if="i.type=='string'" type="text" v-model=response[index] :label=i.title></v-text-field>
                <input v-if="i.type=='integer' && i.sub_type=='date'" type="date" id="start" name="trip-start" v-model=response[index] value="2018-07-22" />
                <v-text-field v-if="i.type=='integer' && i.sub_type!='date'" type="number"  v-model.number=response[index] :label=i.title></v-text-field>
                <v-checkbox v-if="i.type=='boolean'"  v-model=response[index] :label=i.title ></v-checkbox>
                <template v-if="i.type=='object'">
                    <v-select :items=classificators[i.properties.class.classifficator_id] item-text="title" item-value="id" v-model.number=response[index].value label="ИОГВ"></v-select>
                </template>

                <template v-if="i.type=='array'"> 
                    <p>Саб список</p>
                        <v-row>
                            <v-col v-for="(sub_el, sub_index) in i.items.properties" :key="sub_index">
                                    <v-text-field v-if="sub_el.type=='string'" type="text" v-model="testObj[sub_index]" :label=sub_el.title></v-text-field>
                                    <v-text-field v-if="sub_el.type=='integer'" type="number" v-model.number="testObj[sub_index]" :label=sub_el.title></v-text-field>
                                    <v-text-field v-if="sub_el.type=='number'" type="number" v-model.number="testObj[sub_index]" :label=sub_el.title></v-text-field>
                                    <v-checkbox v-if="sub_el.type=='boolean'" v-model="testObj[sub_index]" :label=sub_el.title ></v-checkbox>
               
                            </v-col>
                        </v-row>
                        <div class="text-right">
                            <v-btn @click="test(index)" color="success">Добавить позицию</v-btn>
                        </div>
                        <div v-for="(listEl, listIndex) in response[index]" :key="listIndex">
                            <v-row>
                                <v-col v-for="(subListEl, subListIndex) in listEl" :key="subListIndex">
                                    <v-text-field v-if="i.items.properties[subListIndex].type=='string'" type="text" v-model=response[index][listIndex][subListIndex]></v-text-field>
                                    <v-text-field v-if="i.items.properties[subListIndex].type=='integer'" type="number" v-model.number=response[index][listIndex][subListIndex]></v-text-field>
                                    <v-text-field v-if="i.items.properties[subListIndex].type=='number'" type="number" v-model.number=response[index][listIndex][subListIndex]></v-text-field>
                                    <v-checkbox v-if="i.items.properties[subListIndex].type=='boolean'" v-model=response[index][listIndex][subListIndex]></v-checkbox>
                                </v-col>
                            </v-row>
                        </div>
                        <p class="mt-5">Пример с таблицей</p>
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                    <th class="text-left" v-for="(headerEl, headerIndex) in i.items.properties" :key="headerIndex">
                                        {{ headerEl.title }}
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(listEl, listIndex) in response[index]" :key="listIndex">
                                        <td v-for="(subListEl, subListIndex) in listEl" :key="subListIndex">{{ subListEl }}</td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>

             
                </template>
            </p>

            <div class="mt-4 text-right">
                <v-btn color="primary" @click="createStatement()">Создать заявку</v-btn>
            </div>
        </v-container>
        </div>
</template>

<script>
import {api_url} from '@/conf.js'
export default {
    name: 'CreateStatement',
    data() {
        return {
            schema: {},
            response: {},
            testObj: {},
            headers: [
                {
                    text: 22,
                    value: "name"
                }
            ],
            classificators: {}
        }
    },
    methods: {
        test1: function(data){
            console.log(data)
            return "2020-02-20"
        },
        test: function(o){
            let obj = JSON.parse(JSON.stringify(this.testObj))
            this.response[o].push(obj)
            this.testObj = {}
        },
        getSchema: async function () {
            let url = api_url + '/schema/get_schema?contest_oid=65a767c72e0fe1554e0d3c9a';
            let response = await fetch(url);
            let result = await response.json();
            this.schema = result.data.properties
            this.createObjBySchema()
        },
        createObjBySchema: async function(){
            for(let i in this.schema){
                if(this.schema[i].type == 'array'){
                    this.response[i] = []
                }
                else if(this.schema[i].type == 'object'){
                    let classifficator_id = this.schema[i].properties.class.classifficator_id
                    this.getClassificatorById(classifficator_id)
                    this.response[i] = {class: classifficator_id}
                }
                else{
                    this.response[i] = null
                }
            }
        },
        createStatement: async function(){
            let response = await fetch( api_url + '/statement/create_statement?contest_oid=65a767c72e0fe1554e0d3c9a', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
              },
              body: JSON.stringify(this.response),
            });
            if (response.ok) {
                console.log("Success")
            } else {
                let json = await response.json();
                console.log(json)
            }
        },
        getClassificatorById: async function(id){
            let url = api_url + '/classificator/get_classificator?id=' + id;
            let response = await fetch(url);
            let result = await response.json();
            this.classificators[result.data._id] = result.data.data
        }
    },
    mounted: function () {
        this.getSchema()
    }
}
</script>
