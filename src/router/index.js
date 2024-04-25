import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Create from '../pages/Create.vue';
import About from '../pages/About.vue';
import Detail from '../pages/Detail.vue';

const routes = [
    {    
        path: '/',
        component: Home
    },
    {
        path: '/create',
        component: Create
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/detail/:id',
        component: Detail
    }
];

const router = createRouter({
    scrollBehavior: function() {
        return { x: 0, y: 0 };
    },
    history: createWebHistory(),
    routes
});

export default router;