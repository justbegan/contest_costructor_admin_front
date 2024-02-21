import Vue from 'vue';
import VueRouter from 'vue-router';
import CreateStatement from '@/components/CreateStatement.vue'
import StatementsList from '@/components/StatementsList.vue'
import CreateParameter from '@/components/CreateParameter.vue'
import ChangeParameter from '@/components/ChangeParameter.vue'
import CreateClass from '@/components/CreateClass.vue'
import SchemaList from '@/components/SchemaList.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'schema_list',
    component: SchemaList
  },
  {
    path: '/create_statement',
    name: 'create_statement',
    component: CreateStatement
  },
  {
    path: '/list',
    name: 'list_statment',
    component: StatementsList
  },
  {
    path: '/create_parameter',
    name: 'create_parameter',
    component: CreateParameter
  },
  {
    path: '/change_parameter/:id',
    name: 'change_parameter',
    component: ChangeParameter
  },
  {
    path: '/create_class',
    name: 'create_class',
    component: CreateClass
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;