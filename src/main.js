import { createApp } from 'vue';
import App from './App';
import components from '@/components/UI';
import router from '@/router/router';
import directives from '@/directivs';

const app = createApp(App);

components.forEach(component => {
  app.component(component.name, component)
});

directives.forEach(direct => {
  app.directive(direct.name, direct)
});

app.use(router).mount('#app')
