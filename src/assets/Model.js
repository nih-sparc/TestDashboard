

class Img
{
    constructor(image){
        this.ImgName = image.ImgName;
        this.Path = image.Path;
        this.Subject = new Subject(image.Subject);
        this.Metadata = new Metadata(image.Metadata);
    }
}

export class Dataset
{
    constructor(dataset){
        this.Imgs = [];
        dataset.Imgs.forEach((img)=>this.Imgs.push(new Img(img)));
    }
}

class Metadata
{
    constructor(metadata){
        this.Branch = metadata.Branch;
        this.Sample = metadata.Sample;
    }

}

class Subject
{
    constructor(subject){
        this.ID = subject.ID;
        this.Sex = subject.Sex;
        this.Age = subject.Age;
    }
}

