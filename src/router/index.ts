import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import NewDeck from '../views/NewDeck.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/deck',
    name: 'default',
    component: Home,
    children: [
      {
        path: 'new',
        name: 'NewDeck',
        component: NewDeck,
      },
      {
        path: ':deckId',
        name: 'Deck',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Deck.vue'),
      },
    ],
  },
  { path: '*', redirect: '/deck/new' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
