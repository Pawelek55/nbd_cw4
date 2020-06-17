 const map = function() {
    const key = this.nationality;
    const bmi = Math.round((+this.weight * 1000000 / (Math.pow(+this.height,2))) ) / 100
    const value = { count: 1, minBMI: bmi, maxBMI: bmi, avarageBMI: bmi }
    emit(key, value);
}

const reduce = function(key, val) {
    const reducedVal = { count: 0, minBMI: 0, maxBMI: 0, avarageBMI: 0 }
    for(let e of val){
        reducedVal.count += e.count;
        if (reducedVal.minBMI == 0) {
            reducedVal.minBMI = e.minBMI
        }
        if (e.minBMI < reducedVal.minBMI) {
            reducedVal.minBMI = e.minBMI
        }
        if (e.maxBMI > reducedVal.maxBMI) {
            reducedVal.maxBMI = e.maxBMI
        }
        reducedVal.avarageBMI += e.avarageBMI;
    }
    return reducedVal;
}
const returnScore = function (key, reducedVal) {
    reducedVal.avarageBMI = Math.round((reducedVal.avarageBMI / reducedVal.count) * 100) / 100;
    return reducedVal;
};

db.people.mapReduce(map, reduce, { out: "mapreduce", finalize: returnScore })
printjson(db.mapreduce.find({}).toArray())
