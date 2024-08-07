

class Img
{
    constructor(image){
        this.ImgName = image.image_id;
        this.Path = image.share_link;
        this.Subject = new Subject(image.Subject);
        this.Metadata =  new Metadata(image.Metadata);
    }
}

export class Dataset
{
    constructor(dataset){
        this.name = dataset.ImgName,
        this.size = "...",
        this.path = dataset.Path
    }
}

class Metadata
{
    constructor(metadata={}){
        this.Branch = metadata.Branch;
        this.Sample = metadata.Sample;
    }

}

class Subject
{
    constructor(subject={}){
        this.ID = subject.ID;
        this.Sex = subject.Sex;
        this.Age = subject.Age;
    }
}

