
import SparcDashboard from '../../components/SparcDashboard.vue'
import ItemWidget from '../../components/ItemWidget.vue';
import FlatmapViewer from '../../components/FlatmapViewer.vue';
import ImageSelector from '../../components/ImageSelector.vue';
import BiolucidaViewer from '../../components/BiolucidaViewer.vue';

import './styles.scss';

export default {
  title: 'Components/SparcDashboard'
}

const createDemo = () => {
  return {
    components: { SparcDashboard, ItemWidget, FlatmapViewer,ImageSelector,BiolucidaViewer},
    data() {
      return {

      }
    },
    template: `
        <sparc-dashboard></sparc-dashboard>
    `
    }
}



export const Primary = () => createDemo(
  {
    label: 'Primary',
    id: '0',
    data: [
    ]
  }
)
