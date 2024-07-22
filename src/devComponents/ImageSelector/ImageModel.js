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
    constructor(data){
        this.id = data.image_id;
        this.name = data.image_id,
        this.size = (Math.random()*10).toFixed(2)+"mb",
        this.path = data.share_link
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
                name:img.id,
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
                size: (Math.random()*10).toFixed(2)+"mb",
                path: img.path
            }
            _tempArr.push(column);
        })
        return _tempArr;
    }
}