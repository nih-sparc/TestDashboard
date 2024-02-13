/** @type { import('@storybook/vue3').Preview } */
import { setup, app } from '@storybook/vue3'

import 'element-plus/dist/index.css';
import sparcTheme from './sparcTheme'
import ElementPlus from 'element-plus'

const viewports = {
  mobile: {
    name: 'Mobile',
    styles: {
      height: '812px',
      width: '375px'
    },
    type: 'mobile'
  },
  tablet: {
    name: 'Tablet',
    styles: {
      height: '1024px',
      width: '768px'
    },
    type: 'tablet'
  },
  desktop: {
    name: 'Desktop',
    styles: {
      height: '800px',
      width: '1280px'
    },
    type: 'desktop'
  },
  largeDisplay: {
    name: 'Large Display',
    styles: {
      height: '1080px',
      width: '1920px'
    },
    type: 'desktop'
  },
};

const preview = {
  
  parameters: {
    viewport: {
      viewports
    },
    options:{
      theme: sparcTheme,
          storySort: (a, b) =>
       a.title === b.title ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true })
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      components: {
        table: null,
      }
    }
  }
};
setup((app)=>{
  app.use(ElementPlus);
})
export default preview;
