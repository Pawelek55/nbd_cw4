db.people.aggregate([
    {
        $group: {
            _id: null,
            jobs: { $addToSet: "$job" }
        }
    },
    {
        $out: "mapreduce"
    }
])
printjson(db.mapreduce.find().toArray())
