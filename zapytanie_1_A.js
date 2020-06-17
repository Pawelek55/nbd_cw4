db.people.aggregate([
    {
        $group: {
            _id: "$sex",
            avarageheight: { $avg: { $toInt: { $toDecimal: "$height" } } },
            avarageweight: { $avg: { $toInt: { $toDecimal: "$weight" } } }
        }
    },
    {
        $out: "mapreduce"
    }
])
printjson(db.mapreduce.find().toArray())
