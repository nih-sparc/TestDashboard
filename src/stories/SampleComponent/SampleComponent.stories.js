
import SampleComponent from '../../components/SampleComponent.vue'
import ItemWidget from '../../components/ItemWidget.vue'
//import './styles.scss';

export default {
  title: 'Components/SampleComponent'
}

const createDemo = () => {
  return {
    components: { SampleComponent, ItemWidget },
    data() {
      return {

      }
    },
    template: `
    <item-widget style="width: 600px; height:600px;">
        <template #title>
            <h3>Biolucida Viewer</h3>
        </template>
        <sample-component/>
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
