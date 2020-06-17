db.people.aggregate([
    {
        $unwind: "$credit"
    },
    {
        $group: {
            _id: "$credit.currency",
            currencysum: { $sum:  { $toDecimal: "$credit.balance" } }
        }
    },
    {
        $out: "mapreduce"
    }
])
printjson(db.mapreduce.find().toArray())
