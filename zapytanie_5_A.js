db.people.aggregate([
    {
        $match: { sex: "Female", nationality: "Poland" }
    },
    {
        $unwind: "$credit"
    },
    {
        $group: {
            _id: "$credit.currency",
            moneysum: { $sum:  { $toDecimal: "$credit.balance" }  },
            moneyavg: { $avg: { $toDecimal: "$credit.balance" }  }
        }
    },
    {
        $out: "mapreduce"
    }
])
printjson(db.mapreduce.find().toArray())
