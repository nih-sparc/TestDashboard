
import FlatmapViewer from '../../components/FlatmapViewer.vue'
import ItemWidget from '../../components/ItemWidget.vue'
import './styles.scss';

export default {
  title: 'Components/FlatmapViewer'
}

const createDemo = () => {
  return {
    components: { FlatmapViewer, ItemWidget },
    data() {
      return {

      }
    },
    template: `
    <item-widget style="width: 300px;">
        <template #title>
            <h3>Flatmap Viewer</h3>
        </template>
        <flatmap-viewer/>
    </item-widget>
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
