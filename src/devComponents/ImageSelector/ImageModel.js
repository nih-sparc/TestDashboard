class MBFImageObject {
    constructor(imageObj = {}){
        this.id = imageObj.id || "";
    }

    clone() {
        const clonedObject = new MBFImageObject();
        clonedObject.id = this.id;
        return clonedObject;
      }
}
 class SparcImageObject
{
    constructor(data, packageId){ //hits.hits[n]_source.dataset, hits.hits[n]_id
        this.id = data.image_id; 
        this.name = data.name || "SPARC_Schwaber_HeartB_section39-section374.jpx"; //item.name - truncate it
        this.description = data.item? data.item.description: "Image file associated with the accompanying xml file, viewable in TissueMapper", //item.description
        this.size = (Math.random()*10).toFixed(2)+"mb",
        this.path = data.share_link; 
        this.sparcID = data //pennsieve.organization.identifier
        this.packageId = packageId;
        
    }
}
export class TableObject{
    constructor(array = {}){
        this.SparcImageArray = [];
        array.forEach((img)=>this.SparcImageArray.push(new SparcImageObject(img)))
        this.MBFImageObject = [];
        array.forEach((img)=>this.MBFImageObject.push(new MBFImageObject(img)))
    }
    buildTableMBF(){
        let _tempArr=[];
        this.MBFImageObject.forEach((img)=>{
            let column = {
                name:img.name,
                description: img.description,
                size: (Math.random()*10).toFixed(2)+"mb",
                path: ""
            }
            _tempArr.push(column);
        })
        return _tempArr;
    }
    buildTableSPARC(){
        let _tempArr=[];
        this.SparcImageArray.forEach((img)=>{
            let column = {
                name:img.id,
                description: img.description,
                coord: "0.5-0.55",
                path: img.path
            }
            _tempArr.push(column);
        })
        return _tempArr;
    }
}