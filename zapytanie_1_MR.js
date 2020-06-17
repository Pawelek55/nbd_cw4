const map = () => {
    const key = this.sex;
    const value = { count: 1, weight: this.weight, height: this.height }
    emit(key, value);
}

const reduce = (key, val) => {
    reducedVal = { count: 0, weight: 0, height: 0 }

    for (let i = 0; i < val.length; i++) {
        reducedVal.count += +val[i].count;
        reducedVal.weight += +val[i].weight;
        reducedVal.height += +val[i].height;
    }
    return reducedVal;
}
const returnScore =  (key, reducedVal) => {
    reducedVal.weight = Math.round((reducedVal.weight / reducedVal.count) * 1000) / 1000;
    reducedVal.height = Math.round((reducedVal.height / reducedVal.count) * 1000) / 1000;
    return reducedVal;
};
db.people.mapReduce(map, reduce, { out: "mapReduce", finalize: returnScore })
printjson(db.mapreduce.find({}).toArray())
