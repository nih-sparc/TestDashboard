import { Bar, Scatter, Pie, Line  } from 'vue-chartjs'
export const VisualizationMap = new Map()
VisualizationMap.set("Scatter",Scatter);
VisualizationMap.set("Bar", Bar);
VisualizationMap.set("Line",Line);
VisualizationMap.set("Distribution", Bar)

class GraphMetric {
    constructor(data = {}){
        this.data = data.data? data.data:[];
        this.label = data.label || "";
        this.fill = data.fill || "";
        this.borderColor = data.borderColor || "";
        this.backgroundColor = data.backgroundColor || "#f87979";
        this._x = []; //array of points
        this._y = [];
        this._xAspect = ""; //name of aspect
        this.xLabels = [];
        this._yAspect = ""; 
        this._aspectList=[];
        this.metric = "";
        this.distValue = data.distValue || "";
        this.distPercentage = data.distPercentage || false;
        this.rangeXMin = data.rangeXMin || null;
        this.rangeXMax = data.rangeXMax || null;
        this.rangeYMin = data.rangeYMin || null;
        this.rangeYMax = data.rangeYMax || null;
        this.autoXRange = data.autoXRange || true;
        this.autoYRange = data.autoYRange || true;
    }
    set _metric(value){
        if(value==="random data") this.ranomizeData();
        this.metric =value;
    }
    get _metric(){
        return this.metric;
    }
    pointDataForScatter(){
        let pointDataArray=[];
        this._x.forEach(x => {
            const yMatch = this._y.find(y => y.inst === x.inst && y.agg_type=="instance" && x.agg_type==="instance");
            if(yMatch){
            pointDataArray.push({"x":x.value,"y":yMatch.value});
            }
        });
            this.data = pointDataArray;
    }
    pointDataForBar(){
        let pointDataArray=this._x.map(p=>p.value);
        this.data = pointDataArray;
    }
    organizeDistribution(){
        if(!this.distValue || this._x.length ===0){return;}

        let min,max = 0;
        if(this.autoXRange){
            [min,max] = this.findMinMax();
        }else{
            min=this.rangeXMin;
            max = this.rangeXMax;
        }
        const range = max-min;

        let groupings = this.distPercentage ? range*(this.distValue*.01) : parseFloat(this.distValue);
        if(range>10){groupings = Math.ceil(groupings)} //this needs to be set by user somehow
        const groupingCount =  range%groupings>0.1?Math.floor(range/groupings)+1:range/groupings;

        let newXArray = [];
        let labelsArray = [];

        for(let x=0;x<groupingCount;x++){
            let count = 0;
            let start = min;
            let stop = min+groupings;
            if(x===(groupingCount-1)){stop++}

            this._x.forEach(point=>{
                if(point.value>=start&&point.value<stop){ 
                    count++;
                }
            })
            newXArray.push(count);
            labelsArray.push(start.toFixed(2) + " - " + (min+groupings).toFixed(2))
            min = stop;
        }
        this.data = newXArray;
        this.xLabels = labelsArray;
        //check each value and put into range (or just count)
        //return
    }
    findMinMax(){
        const xArr = this._x;
        let min =xArr[0].value;
        let max = xArr[0].value;
        for (var i = 0; i < xArr.length; i++) {
          if (xArr[i].value > max ) {
            max = xArr[i].value;
          }
          if(xArr[i].value < min){
            min = xArr[i].value;
          }
        }
        return [min, max];
    }
    ranomizeData(){
        let tempArr=[];
        let tempArr1 = [];
        for(var i=0;i<100;i++){
            tempArr.push({"inst":i,"agg_type":"instance","value":Math.floor(Math.random()*101)});
            tempArr1.push({"inst":i,"agg_type":"instance","value":Math.floor(Math.random()*101)});
        }
        this._y = tempArr;
        this._x = tempArr1;
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
        clonedMetric.distValue = this.distValue;
        clonedMetric.distPercentage = this.distPercentage;
        clonedMetric.rangeXMin = this.rangeXMin;
        clonedMetric.rangeXMax = this.rangeXMax;
        clonedMetric.rangeYMin = this.rangeYMin; 
        clonedMetric.rangeYMax = this.rangeYMax; 
        clonedMetric.autoXRange = this.autoXRange; 
        clonedMetric.autoYRange = this.autoYRange;
        return clonedMetric;
      }
}

export class GraphSettingsObject {
    constructor(settingsObj = {}){
        this.visualization = settingsObj.visualization || "Bar";
        //attributes associated with chart data
        this.labels = settingsObj.labels || [""]
        this._distValue = settingsObj.distValue || 5;
        this._distPercentage = settingsObj.distPercentage || true;
        this._rangeXMin = settingsObj.rangeXMin || "";
        this._rangeXMax = settingsObj.rangeXMax || "";
        this._rangeYMin = settingsObj.rangeYMin || "";
        this._rangeYMax = settingsObj.rangeYMax || "";
        this._autoXRange = settingsObj.autoXRange || true;
        this._autoYRange = settingsObj.autoYRange || true;
        this.datasets = settingsObj.datasets ? settingsObj.datasets: [new GraphMetric(this)]
    }
    get component(){
        return VisualizationMap.get(this.visualization);
    }
    set distPercentage(value){
        this.datasets.forEach((d)=>{
            d.distPercentage = value;
        })
        this._distPercentage = value;
    }
    get distPercentage(){
        return this._distPercentage;
    }
    set distValue(value){
        this.datasets.forEach((d)=>{
            d.distValue = value;
        })
        this._distValue = value;
    }
    get distValue(){
        return this._distValue;
    }
    set rangeXMin(value){
        this.datasets.forEach((d)=>{
            d.rangeXMin = parseFloat(value);
        })
        this._rangeXMin = value;
    }
    get rangeXMin(){
        return this._rangeXMin;
    }
    set rangeXMax(value){
        this.datasets.forEach((d)=>{
            d.rangeXMax = parseFloat(value);
        })
        this._rangeXMax = value;
    }
    get rangeXMax(){
        return this._rangeXMax;
    }
    set rangeYMin(value){
        this.datasets.forEach((d)=>{
            d.rangeYMin = parseFloat(value);
        })
        this._rangeYMin = value;
    }
    get rangeYMin(){
        return this._rangeYMin;
    }
    set rangeYMax(value){
        this.datasets.forEach((d)=>{
            d.rangeYMax= parseFloat(value);
        })
        this._rangeYMax = value;
    }
    get rangeYMax(){
        return this._rangeYMax;
    }
    set autoXRange(value){
        this.datasets.forEach((d)=>{
            d.autoXRange= value;
        })
        this._autoXRange = value;
    }
    get autoXRange(){
        return this._autoXRange;
    }
    set autoYRange(value){
        this.datasets.forEach((d)=>{
            d.autoYRange= value;
        })
        this._autoYRange = value;
    }
    get autoYRange(){
        return this._autoYRange;
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
            case "Distribution":
                let labelArray = [];
                this.datasets.forEach((metric)=>{
                    metric.organizeDistribution();
                    labelArray = metric.xLabels;
                })
                return{
                    labels: labelArray,
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
            "backgroundColor":backgroundColor,
            "distValue":this.distValue,
            "distPercentage":this.distPercentage,
            "rangeXMin" : this.rangeXMin, 
            "rangeXMax" : this.rangeXMax,
            "rangeYMin" : this.rangeYMin,
            "rangeYMax" : this.rangeYMax, 
            "autoXRange" : this.autoXRange, 
            "autoYRange" : this.autoYRange
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
        this.datasets = [];
        this.addMetric();
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
        clonedSettings.distValue = this.distValue;
        clonedSettings.distPercentage = this.distPercentage;
        clonedSettings.rangeXMin = this.rangeXMin;
        clonedSettings.rangeXMax = this.rangeXMax;
        clonedSettings.rangeYMin = this.rangeYMin; 
        clonedSettings.rangeYMax = this.rangeYMax; 
        clonedSettings.autoXRange = this.autoXRange; 
        clonedSettings.autoYRange = this.autoYRange;
        return clonedSettings;
      }
}