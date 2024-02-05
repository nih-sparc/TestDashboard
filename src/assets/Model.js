class Derivative
{
    constructor(derivative){
        this.Name = derivative.Name;
        this.Samples = derivative.Samples
    }
}

class Dataset
{
    constructor(dataset){
        this.Derivative = dataset.Derivative
    }
}

class Sample
{
    constructor(sample){
        this.Name = sample.Name;
        this.Imgs = sample.Imgs
    }

}

