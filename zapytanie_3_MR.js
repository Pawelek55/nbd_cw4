const map = () => {
    let key = this.job;
    let value = 1;
    emit(key, value);
}

const reduce = (key, value) => Array.sum(value);


db.people.mapReduce(map, reduce, { out: "mapreduce"})
printjson(db.mapreduce.find().toArray())
