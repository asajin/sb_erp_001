var spSchemaObj = {
    model: {
        fields: {
            price_date: {
                type: "date"
            },
            supplier_name: {
                type: "string"
            },
            product_name: {
                type: "string"
            },
            unit: {
                type: "string"
            },
            stock: {
                type: "string"
            },
            currency_price: {
                type: "number"
            },
            local_price: {
                type: "number"
            },
            amount: {
                type: "number"
            },
            currency_rate: {
                type: "number"
            }
        }
    },
    parse:function (data) {
        return data;
    }
}
