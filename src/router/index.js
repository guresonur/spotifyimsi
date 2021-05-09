import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: 'recentlyplayed',
        name: 'RecentlyPlayed',
        component: () =>
          import(/* webpackChunkName: "views" */ '../views/RecentlyPlayed')
      },
      {
        path: 'likedsongs',
        name: 'LikedSongs',
        component: () =>
          import(/* webpackChunkName: "views" */ '../views/LikedSongs')
      },
      {
        path: 'search',
        name: 'Search',
        component: () =>
          import(/* webpackChunkName: "views" */ '../views/Search')
      },
      {
        path: 'statistics',
        name: 'Statistics',
        component: () =>
          import(/* webpackChunkName: "views" */ '../views/Statistics')
      },
      {
        path: 'library',
        name: 'Library',
        component: () =>
          import(/* webpackChunkName: "views" */ '../views/Library')
      }
    ]
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
