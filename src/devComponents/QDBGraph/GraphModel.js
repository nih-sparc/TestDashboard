import { Bar, Scatter, Pie, Line  } from 'vue-chartjs'
export const VisualizationMap = new Map()
VisualizationMap.set("Scatter",Scatter);
VisualizationMap.set("Bar", Bar);
VisualizationMap.set("Line",Line);

class GraphMetric {
    constructor(data = {}){
        this.data = data.data? data.data:[];
        this.label = data.label || "";
        this.fill = data.fill || "";
        this.borderColor = data.borderColor || "red";
        this.backgroundColor = data.backgroundColor || "";
    }
}

export class GraphSettingsObject {
    constructor(settingsObj = {}){
        this.visualization = settingsObj.visualization || Bar;
        this._visualizationName = "";
        //attributes associated with chart data
        this.labels = settingsObj.labels || [""]
        this.datasets = settingsObj.datasets?settingsObj.datasets: [new GraphMetric()];
    }
    get visualizationName(){
        return this.getVName(VisualizationMap,this.visualization)
    }
    returnSettingsData(visualization){
        switch(visualization) {
            case Bar:
                return {
                    labels: [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December'
                      ],
                      datasets: [
                        {
                          label: 'Data One',
                          backgroundColor: '#f87979',
                          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                        }
                      ]
                }
            case Scatter:
                return {
                    datasets: this.GraphMetric
                    //]{x:1,y:2},{x:2,y:3}]
                }
            case Line:
                return {  
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [40, 39, 10, 40, 39, 80, 40]
                  }
                ]
            }
            default:
                return {};
        }
    }
    addDataset(){
        this.datasets.push(new GraphMetric);
    }
    parseJson(json){
        Object.assign(this,json);
    }
    getVName(map,searchValue){
        for (let [key, value] of map.entries()) {
            if (value === searchValue)
              return key;
          }
    }
}