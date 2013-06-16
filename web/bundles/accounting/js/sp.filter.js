function spFieldFilterContains(field) {
    var value = field.val()
    if (value) {
        var isInFilter = false;
        var fieldFilter = {
            field: field.attr('name'),
            operator: "contains",
            value: value
        };
        var filtersObj = $("#grid").data("kendoGrid").dataSource.filter();
        if(filtersObj != undefined) {
            for(var i in filtersObj.filters) {
                if(filtersObj.filters[i]['field'] == field.attr('name')) {
                    filtersObj.filters[i]['value'] = value;
                    isInFilter = true;
                }
            }
            if(!isInFilter) {
                filtersObj.filters.push(fieldFilter);
            }
        } else {
            $("#grid").data("kendoGrid").dataSource.filter(fieldFilter);
        }

        $("#grid").data("kendoGrid").dataSource.filter(filtersObj);
    } else {
        $("#grid").data("kendoGrid").dataSource.filter({});
    }
}

$(document).ready(function() {

    $("#supplier_filter").change(function(){
        spFieldFilterContains($(this));
    });

    $("#product_filter").change(function(){
        spFieldFilterContains($(this));
    });

    $("#tabstrip").kendoTabStrip({
        animation:	{
            open: {
                effects: "fadeIn"
            }
        }
    });

    function startChange() {
        var startDate = start.value();

        if (startDate) {
            startDate = new Date(startDate);
            startDate.setDate(startDate.getDate() + 1);
            end.min(startDate);
        }
    }

    function endChange() {
        var endDate = end.value();

        if (endDate) {
            endDate = new Date(endDate);
            endDate.setDate(endDate.getDate() - 1);
            start.max(endDate);
        }
    }

    // create DatePicker from input HTML element
    var start = $("#start").kendoDatePicker({
        change: startChange
    }).data("kendoDatePicker");

    var end = $("#end").kendoDatePicker({
        change: endChange
    }).data("kendoDatePicker");

    start.max(end.value());
    end.min(start.value());

    $("#monthpicker").kendoDatePicker({
        // defines the start view
        start: "year",

        // defines when the calendar should return date
        depth: "year",

        // display month and year in the input
        format: "MMMM yyyy"
    });

    $("#grid").kendoGrid({
        dataSource: {
            serverFiltering: true,
            type: "json",
            transport : {
                read: {
                    url: spFilterUrlObj.read,
                    dataType: "json",
                    cache: false
                }
            },
            schema: spSchemaObj,
            pageSize: 10,
            aggregate: [{
                field: "amount",
                aggregate: "sum"
            }]
        },
        height: 500,
        scrollable: true,
        sortable: false,
        filterable: true,
        columnMenu: true,
        pageable: {
            pageSizes: true,
            refresh: true
        },
        columns: [
        spColumnsObj.price_date,
        spColumnsObj.supplier_name,
        spColumnsObj.product_name,
        spColumnsObj.stock,
        spColumnsObj.currency_price,
        spColumnsObj.local_price,
        spColumnsObj.amount
        ]
    });
});