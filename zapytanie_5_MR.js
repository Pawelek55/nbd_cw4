const map = function () {
    for(let e of this.credit){
        const key = e.currency;
        const value = { count: 1, balance: + e.balance };
        emit(key, value);
    }
}

const reduce = function (key, val) {
   const reducedVal = { count: 0, balance: 0 };
    for(let e of val){
        reducedVal.count += e.count;
        reducedVal.balance += e.balance;
    }
    return reducedVal
}

const returnScore = function (key, reducedVal) {
    reducedVal.balance = Math.round(reducedVal.balance * 100) / 100;
    reducedVal.avarage = Math.round((reducedVal.balance / reducedVal.count) * 100) / 100;
    return reducedVal;
};

db.people.mapReduce(map, reduce, { query: { sex: "Female", nationality: "Poland" }, out: "mapreduce", finalize: returnScore })
printjson(db.mapreduce.find().toArray())
