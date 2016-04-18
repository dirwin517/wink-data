module.exports = function(){

    var attr = [
            {
                "from": "last_reading.consumption_updated_at",
                "to": "timestamp"
            },
            {
                "from": "last_reading.consumption_updated_at",
                "formula": "min:$timestamp,or:$timestamp,or:timestamp",
                "to": "last_update"
            },
            {
                "from": "last_reading.consumption",
                "to": "cumulative_value"
            },
            {
                "from": "last_reading.consumption",
                "formula": "min:$cumulative_value,or:$cumulative_value,or:cumulative_value",
                "to": "value"
            },
            {
                "from": "last_reading.consumption",
                "formula": "min:$cumulative_value,div:last_update",
                "to": "value_disaggregated"
            }
    ];

        return {
            "subscribe_key": "sub-c-f7bf7f7e-0542-11e3-a5e8-02ee2ddab7fe",
            "filters": [
                {
                    "name": "Xbox",
                    "channel": "99bad054d2857a8200ec3805a8774c16eefbe7ec|binary_switch-166375|user-117297",
                    "attributes": attr
                },
                {
                    "name": "Network",
                    "channel": "ba3473b5cc82f8613f83e22fd01d6cc296098ca0|binary_switch-174264|user-117297",
                    "attributes": attr
                },
                {
                    "name": "WaterCooler",
                    "channel": "2a86c8350a86070c64fe88fc1441ba5c34883bb3|binary_switch-174261|user-117297",
                    "attributes": attr
                }
            ]
        };
}