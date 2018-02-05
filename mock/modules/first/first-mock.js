var Random = Mock.Random;
Mock.mock("table",function(){
    var array = [];
    for(var i = 0;i<Random.natural(10, 15);i++){
        array.push(
            {
                id:Random.id(),
                "taskno":201611001+i,
                "name":Random.cname()
            }
        )
    }
    return array;
})