// 折线图
function line_chart(holder_count) {
    var myChart = echarts.init(document.getElementById("line_coin"))
    var d = new Date();
    if(d.getMinutes()<10)
    {
        var min='0'+d.getMinutes()
    }
    else {
        min = d.getMinutes()
    }

    if(d.getHours()<10)
    {
        var hour='0'+d.getHours()
    }
    else {
        hour = d.getHours()
    }

    if(d.getSeconds()<10)
    {
        var sec='0'+d.getSeconds()
    }
    else {
        sec = d.getSeconds()
    }


    var day_now = d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate()+' '+hour+':'+min+':'+sec

    data1 = {name:day_now, value:[day_now, holder_count]}

    // data2 = {name:"2020/9/7 21:07:27", value:["2020/9/7 21:07:27", holder_count]}
    data.push(data1)

    var option = {
        // title: {
        //     text: '平均持有量'
        // },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                var date = new Date(params.name);
                return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+' 货币量:' + params.value[1];
            }
        },
        legend: {
            data: ['货币总持有量']
            // data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        // grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '3%',
        //     containLabel: true
        // },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'time',
            boundaryGap: false,
            // splitLine: {
            //     show: false
            // },

        },


        dataZoom: [{type:'inside'}],

        yAxis: {
            type: 'value',
            max: function(value) {
                return value.max + 2000;
            },
            min: function(value) {
                return value.max - 2000;
            }
        },
        series: [
            {
                name: '货币总持有量',
                type: 'line',
                stack: '总量',
                data: data,
                connectNulls: true
            },

        ]
    };
    myChart.setOption(option)
}

function successFunction1(data) {
//    var allRows = data.split(/\r?\n|\r/);
    var table = '<table id="t">';
    for (var singleRow = 0; singleRow < data.index.length; singleRow++) {
        if (singleRow === 0) {
            table += '<thead>';
            // table += '<tr>';
            table += '<tr id="table_row">';
        } else {
            // table += '<tr>';
            table += '<tr id="table_row">';
        }
//        var rowCells = allRows[singleRow].split(',');
        for (var rowCell = 0; rowCell < data.index[singleRow].length; rowCell++) {
            if (singleRow === 0) {
                var th_id = "holders_th_"+rowCell
                // console.log(th_id)
                table += '<th id="'+th_id+'">';
                table += data.index[singleRow][rowCell];
                table += '</th>';
            } else {
                var holders_td_id = "holders_td_"+singleRow+"_"+rowCell
                table += '<td id="'+holders_td_id+'">';
                table += data.index[singleRow][rowCell];
                table += '</td>';
            }
        }
        if (singleRow === 0) {
            table += '</tr>';
            table += '</thead>';
            table += '<tbody>';
        } else {
            table += '</tr>';
        }
    }
    table += '</tbody>';
    table += '</table>';
    var counter = 0
    counter++
    // console.log(counter)
    if(counter == 1)
    {$('#coin_t').append(table);}
}
function successFunction2(data) {
//    var allRows = data.split(/\r?\n|\r/);
    var table = '<table>';
    for (var singleRow = 0; singleRow < data.index.length; singleRow++) {
        if (singleRow === 0) {
            table += '<thead>';
            table += '<tr id="table_row">';
        } else {
            table += '<tr id="table_row">';
        }
//        var rowCells = allRows[singleRow].split(',');
        for (var rowCell = 0; rowCell < data.index[singleRow].length; rowCell++) {
            if (singleRow === 0) {
                var th_id = "coin_th_"+rowCell
                // console.log(th_id)
                table += '<th id="'+th_id+'">';
                table += data.index[singleRow][rowCell];
                table += '</th>';
            } else {
                var holders_td_id = "coin_td_"+singleRow+"_"+rowCell
                table += '<td id="'+holders_td_id+'">';
                table += data.index[singleRow][rowCell];
                table += '</td>';
            }
        }
        if (singleRow === 0) {
            table += '</tr>';
            table += '</thead>';
            table += '<tbody>';
        } else {
            table += '</tr>';
        }
    }
    table += '</tbody>';
    table += '</table>';
    var counter = 0
    counter++
    if(counter == 1)
    {$('#holders_t').append(table);}
}

// holders数据更新
function coin_data_update(data) {
//    var allRows = data.split(/\r?\n|\r/);
    // var table = '<table id="t">';
    for (var singleRow = 0; singleRow < data.index.length; singleRow++) {

//        var rowCells = allRows[singleRow].split(',');
        for (var rowCell = 0; rowCell < data.index[singleRow].length; rowCell++) {
            if (singleRow === 0) {
                var holders_th_id1 = "#holders_th_"+rowCell
                // console.log(holders_th_id1)
                // var e = document.getElementById('#holders_th_0')
                // e.innerText = "生气！"
                $(''+holders_th_id1+'').text(data.index[singleRow][rowCell])
            } else {
                var holders_td_id2 = "#holders_td_"+singleRow+"_"+rowCell
                // console.log(holders_td_id2)
                $(''+holders_td_id2+'').text(data.index[singleRow][rowCell]
            }
        }

    }
    console.log('coin表更新成功！')

}

function holder_data_update(data) {
//    var allRows = data.split(/\r?\n|\r/);
    // var table = '<table id="t">';
    var holders_count_total = 0
    for (var singleRow = 0; singleRow < data.index.length; singleRow++) {

//        var rowCells = allRows[singleRow].split(',');
        var lenth = data.index[singleRow].length
        for (var rowCell = 0; rowCell < data.index[singleRow].length; rowCell++) {

            if (singleRow == 0) {
                var coin_th_id1 = "#coin_th_"+rowCell
                // console.log(coin_th_id1)
                // var e = document.getElementById('#holders_th_0')
                // e.innerText = "生气！"
                $(''+coin_th_id1+'').text(data.index[singleRow][rowCell])
            } else {
                var coin_th_id2 = "#coin_td_"+singleRow+"_"+rowCell
                // console.log(coin_th_id2)
                $(''+coin_th_id2+'').text(data.index[singleRow][rowCell])
                if ((rowCell ==  lenth)&&(singleRow<data.index.length-1))
                {
                    holders_count_total = holders_count_total+parseFloat(data.index[singleRow][rowCell])}
            }
        }

    }
//    var lenth1 = allRows.length
    // holders_count_total = holders_count_total/lenth1
    line_chart(holders_count_total)
    console.log('holders表和折线图更新成功！')

}


//// 读取两个csv数据，并进行显示
//$.ajax({
//    // url: '../coins_list.csv',
//    url: 'coins_list.csv',
//    dataType: 'text',
//}).done(successFunction1);
//
//$.ajax({
//    // url: '../holders.csv',
//    url: 'holders.csv',
//    dataType: 'text',
//}).done(successFunction2);

successFunction1(obj1)
successFunction2(obj1)

// 根据按键，需要的进行显示，不需要的隐藏
$('#coin_t').hide();
$('#line_coin').show();
$('#holders_t').show();

$('#holders_btn').on('click', function() {

        $('#coin_t').hide();
        $('#line_coin,#holders_t,#line_text_name,#table_text_name').show();
        // $('#holders_t').show();
        $('#holders_btn').css('color','#000000')
        $('#holders_btn').css('font-size','18px')
        $('#coin_btn').css('color','lightgray')
        $('#coin_btn').css('font-size','15px')
        // $('#bar_holders').show();
});

$('#coin_btn').on('click', function() {
        $('#coin_t').show();
        $('#line_coin,#holders_t,#line_text_name,#table_text_name').hide();
        $('#coin_btn').css('color','#000000')
        $('#holders_btn').css('color','lightgray')
        $('#holders_btn').css('font-size','15x')
        $('#coin_btn').css('font-size','18px')
        // $('#bar_holders').hide();
});



// 每15秒进行一次数据请求,并进行数据的刷新
//var data= [];
//line_chart(24910)
//setInterval(function name(params) {
//
//    $.ajax({
//        url:'http://127.0.0.1:5000/holders',
//        error:function () {
//            console.log('holders网页请求失败！')
//        },
//        success:function () {
//            console.log('holders网页请求成功！')
//        },
//    })
//
//    $.ajax({
//        url:'http://127.0.0.1:5000/crawler',
//        error:function () {
//            console.log('crawler网页请求失败！')
//        },
//        success:function () {
//            console.log('crawler网页请求成功！')
//        },
//    })
//
//    $.ajax({
//        url: '../coins_list.csv',
//        dataType: 'text',
//        // success:coin_data_update(data)
//    }).done(coin_data_update);
//
//    $.ajax({
//        url: '../holders.csv',
//        dataType: 'text',
//        // success:holder_data_update(data)
//    }).done(holder_data_update);
//
//    },900000)




