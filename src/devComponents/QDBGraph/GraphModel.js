import { Bar, Scatter, Pie, Line  } from 'vue-chartjs'
export const VisualizationMap = new Map()
VisualizationMap.set("Scatter",Scatter);
VisualizationMap.set("Bar", Bar);
VisualizationMap.set("Line",Line);

class GraphMetric {
    constructor(data = {}){
        this.data = data.data? data.data:[];
        this.label = data.label || "QDB Data";
        this.fill = data.fill || "";
        this.borderColor = data.borderColor || "";
        this.backgroundColor = data.backgroundColor || "#f87979";
        this._x = [];
        this._y = [];
        this._xAspect = "";
        this._yAspect = "";
        this._metric = "";
    }
    pointDataForScatter(){
        let pointDataArray=[];
        this._x.forEach(x => {
            const yMatch = this._y.find(y => y.inst === x.inst && y.agg_type=="instance" && x.agg_type==="instance");
            if(yMatch){
            pointDataArray.push({"x":x.value,"y":x.value});
            }
        });
            this.data = pointDataArray;
    }
    pointDataForBar(){
        let pointDataArray=this._x.map(p=>p.value);
        this.data = pointDataArray;
    }    
    clearAllAspects(){
        this._xAspect="";
        this._yAspect="";
    }
    clone() {
        const clonedMetric = new GraphMetric();
        clonedMetric.data = [...this.data];
        clonedMetric.label = this.label;
        clonedMetric.fill = this.fill;
        clonedMetric.borderColor = this.borderColor;
        clonedMetric.backgroundColor = this.backgroundColor;
        clonedMetric._x = [...this._x];
        clonedMetric._y = [...this._y];
        clonedMetric._xAspect = this._xAspect;
        clonedMetric._yAspect = this._yAspect;
        clonedMetric._metric = this._metric;
        return clonedMetric;
      }
}

export class GraphSettingsObject {
    constructor(settingsObj = {}){
        this.visualization = settingsObj.visualization || "Bar";
        //attributes associated with chart data
        this.labels = settingsObj.labels || [""]
        this.datasets = settingsObj.datasets?settingsObj.datasets: [new GraphMetric()];
    }
    get component(){
        return VisualizationMap.get(this.visualization);
    }
    setLabels(){
        function repeat(num,whatTo){
            var arr = [];
            for(var i=0;i<num;i++){
                arr.push(whatTo);
            }
            return arr;
        }
        var n = this.datasets[0].data.length;
        return repeat(n,"");
    }
    returnSettingsData(visualization =this.visualization){
        switch(visualization) {
            case "Bar":
                this.datasets.forEach((metric)=>{
                    metric.pointDataForBar();
                })
                return {
                    labels: this.setLabels(),
                      datasets: this.datasets
                }
            case "Scatter":
                this.datasets.forEach((metric)=>{
                    metric.pointDataForScatter();
                })
                return {
                    datasets: this.datasets
                }
            case "Line":
                this.datasets.forEach((metric)=>{
                    metric.pointDataForBar();
                })
                return {  
                    labels: this.setLabels(),
                    datasets: this.datasets
            }
            default:
                return {};
        }
    }
    addMetric(data, label, fill, borderColor, backgroundColor){
        const tempObj = {
            "data":data,
            "label":label,
            "fill":fill,
            "borderColor":borderColor,
            "backgroundColor":backgroundColor
                        }
        this.datasets.push(new GraphMetric(tempObj));
    }
    addDataToMetric(axis,data,metricIndex){     
        this.datasets[metricIndex][axis] = metricIndex>-1? data: {};
    }
    removeMetric(metric){
        const index = this.datasets.indexOf(metric);
        this.datasets.splice(index,1);
    }
    clearAllMetrics(){
        this.datasets = [new GraphMetric];
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
    clone() {
        const clonedSettings = new GraphSettingsObject();
        clonedSettings.visualization = this.visualization;
        clonedSettings.labels = [...this.labels];
        clonedSettings.datasets = this.datasets.map(dataset => dataset.clone());
        return clonedSettings;
      }
}