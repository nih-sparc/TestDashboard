
import BiolucidaViewer from '../../components/BiolucidaViewer.vue'
import ItemWidget from '../../components/ItemWidget.vue'
import './styles.scss';

export default {
  title: 'Components/BiolucidaViewer'
}

const createDemo = () => {
  return {
    components: { BiolucidaViewer, ItemWidget },
    data() {
      return {

      }
    },
    template: `
    <item-widget style="width: 600px; height:600px;">
        <template #title>
            <h3>Biolucida Viewer</h3>
        </template>
        <biolucida-viewer mbfLink="https://sparc.biolucida.net/image?c=MjE1NjctY29sLTI0OA%3D%3D"/>
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
