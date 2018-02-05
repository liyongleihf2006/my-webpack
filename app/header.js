import {autorun} from "mobx";
import {tableDatas} from "./modules/first/first.store";
autorun(function(){
    $("#message").text(`表格中的数据量为:${tableDatas.length}`);
})