import {observable} from "mobx";
import * as axios from "axios";
var tableDatas = observable([]);
async function  getTableDatas(){
    try{
        let {data} = await axios.get('table');
        tableDatas.replace(data);
    }catch(error){
        console.error(error);
    }
}
getTableDatas();
export {tableDatas};