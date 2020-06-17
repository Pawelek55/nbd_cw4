const map = () => {
    for(let e of this.credit){
        let key = e.currency;
        let value = +e.balance;
        emit(key, value);
    }
}

const reduce = (key, value) => {
    return Math.round(Array.sum(value) * 100) / 100;
}

db.people.mapReduce(map, reduce, { out: "mapreduce"})
printjson(db.mapreduce.find({}).toArray())
