import * as _ from "lodash";
import {tableDatas} from "./first.store";
import {observable,autorun} from "mobx";
$("#removeData").on("click",function(){
    var checkedData=$("#table").table("getChecked");
    _.pullAll(tableDatas,checkedData);
});
autorun(function(){
    $("#table").table({
        showNo: true,
        number: function (i) {
            return i + 1;
        },
        showCheckbox: true,
        showRadio: true,
        select: false,
        singleSelect: true,
        singleExpand: false,
        rowEvents: {
            click: function (rowData, idx, e) {
                console.log(this);
                console.log("click", arguments);
            },
            mousedown: function (rowData, idx, e) {
                console.log("mousedown", arguments);
            }
        },
        onChecked: function (rowData) {
            console.log(rowData);
        },
        onUnchecked: function (rowData) {
            console.log(rowData);
        },
        datas: tableDatas,
        columns: [{
            title: "任务编号",
            field: "taskno"
        }, {
            title: "负责人",
            field: "name",
            formatter: function (value, rowData, rowIndex) {
                return $("<span/>", {
                    "style": "color:#0d84d4;",
                    "text": value
                })
            }
        }]
    });
});
