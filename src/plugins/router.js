import Vue from 'vue';
import VueRouter from 'vue-router';
import CreateStatement from '@/components/CreateStatement.vue'
import StatementsList from '@/components/StatementsList.vue'
import CreateParameter from '@/components/CreateParameter.vue'
import CreateClass from '@/components/CreateClass.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'create_statment',
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