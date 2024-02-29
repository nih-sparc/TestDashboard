
import LocationNav from '../../demo/locationnavdemo.vue'

import BranchSlider from '../../devComponents/BranchSlider.vue'

export default {
  title: 'Components/LocationNavigator'
}

const createDemo = () => {
  return {
    components: { LocationNav, BranchSlider },
    data() {
      return {

      }
    },
    template: `
      <div style="width: 300px;
      margin: auto;
      border: solid 1px purple;
      padding: 10px;">
        <location-nav/>
      </div>
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
export const ListChange = () => createDemo(
    {
      label: 'ListChange',
      id: '1',
      data: [
        {dataList:[0,1,2,3]}
      ]
    }
  )
// export const VisibleDataSet = () => createDemo(
//   {
//     label: 'Data',
//     id: '0',
//     data: [
//     ]
 
// })

// export const HelpIcon = () => createDemoWithTooltip(
//   {
//     label: 'Multiselect with help icon',
//     id: '0',
//     data: [
// ]
//   }
// )
