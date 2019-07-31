// 基于准备好的dom，初始化echarts实例
var myChart_columnar = echarts.init(document.getElementById('columnar'));
var myChart_pie = echarts.init(document.getElementById('pie'));
// 指定图表的配置项和数据
var data = [];
var option = {
    title: {
        text: '柱状图数据展示'
    },
    tooltip: {},
    legend: {
        data: ['销量']
    },
    xAxis: {
        data: []
    },
    yAxis: {},
    series: [{
        name: '商品数',
        type: 'bar',
        data: []
    }]
};
var option_pie = {
    title: {
        text: '饼状图数据展示'
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            data: [
                // { value: 235, name: '视频广告' },
                // { value: 274, name: '联盟广告' },
                // { value: 310, name: '邮件营销' },
                // { value: 335, name: '直接访问' },
                // { value: 400, name: '搜索引擎' }
            ]
        }
    ]

}



// 1 创建异步对象
var xhr = new XMLHttpRequest();
// 2 指定请求的方式和请求的地址
xhr.open("get", "https://edu.telking.com/api/?type=week");
// 3 发送请求
xhr.send();
// 4 注册状态变化的监听(事件)
xhr.onreadystatechange = function () {
    // 关注最终的结果
    if (xhr.readyState == 4 && xhr.status == 200) {
        //把响应体获取
        // console.log(JSON.parse(xhr.responseText));
        // data = xhr.responseText.data.xAxis;
        option.xAxis.data = JSON.parse(xhr.responseText).data.xAxis;
        option.series[0].data = JSON.parse(xhr.responseText).data.series;
        // console.log(option.xAxis.data);
        // console.log(option.series[0].data);
        myChart_columnar.setOption(option);


        // option_pie.series[0].data.value = JSON.parse(xhr.responseText).data.series;
        // option_pie.series[0].data.name = JSON.parse(xhr.responseText).data.xAxis;
        // console.log( option_pie.series[0].data);
        for(var i=0;i<option.xAxis.data.length;i++){
            option_pie.series[0].data[i] = {value:option.series[0].data[i],name:option.xAxis.data[i]}
        }
        // console.log(option_pie.series[0].data)
        myChart_pie.setOption(option_pie)
    }
}


