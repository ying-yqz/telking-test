// 基于准备好的dom，初始化echarts实例
var zxBoxEchart = echarts.init(document.getElementById('curve'));
// 指定相关的配置项和数据
var zxBoxOption = {
    // 图例
    legend: {
        data: ['吃饺子'],
        icon: 'rect',
        top: 22,
        right: 24,
        itemGap: 15,
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
            // padding: [0, 0, 0, 5],
            color: 'rgba(255,255,255,0.87)'
        }
    },
    //鼠标滑过展示数据
    // tooltip: {
    //     trigger: 'item',
    //     backgroundColor: 'rgba(0,0,0,.3)',
    //     textStyle: {
    //         color: 'rgb(255,255,255)'
    //     },
    // },
    color: ['#289df5', '#fbc01b', '#ff5050'],
    grid: {
        left: 24,
        right: '6%',
        bottom: '30',
        containLabel: true
    },
    // X轴样式
    xAxis: {
        type: 'category',
        /*
            // axisLine坐标轴轴线相关设置:
            axisLine:{
                show: false, // 不显示x轴
                symbol:[ default: 'none' ], // 可以是字符串，表示两端使用同样的箭头；或者长度为 2 的字符串数组，分别表示两端的箭头。默认不显示箭头，即 'none'。两端都显示箭头可以设置为 'arrow'，只在末端显示箭头可以设置为 ['none', 'arrow']。
                // axisLine坐标轴轴线样式设置
                lineStyle:{
                    color：'#333', // 坐标轴轴线颜色设置
                    width:1, // 坐标轴线线宽。
                }
            },
            axisTick:{} // 坐标轴刻度相关设置。
            ***********************************************data[i] // 类目数据*****************************************************************
            data[i] // 类目数据，在类目轴（type: 'category'）中有效。如果没有设置 type，但是设置了 axis.data，则认为 type 是 'category'。使用案例如下
            // 所有类目名称列表
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            // 每一项也可以是具体的配置项，此时取配置项中的 `value` 为类目名
            data: [{
                value: '周一',
                // 突出周一
                textStyle: {
                    fontSize: 20,
                    color: 'red'
                }
            }, '周二', '周三', '周四', '周五', '周六', '周日']
            *************************************************splitLine****************************************************************************
            splitLine:{}//坐标轴在 grid 区域中的分隔线。
            splitLine:{
                lineStyle:{color: ['#aaa', '#ddd']}
            }
        */
        axisLine: {
            show: false
        },
        axisTick: {
            length: 0 // 刻度线的长度
        },
        axisLabel: {
            interval: 0, // 坐标轴刻度标签的显示间隔，在类目轴中有效。
            textStyle: {
                color: '#00c5d7'
            }
        },
        name: '(时)',
        nameTextStyle: {
            padding: [24, 0, 0, 0],
            color: '#00c5d7'
        },
        nameGap: 0,
        data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '20', '23']
    },
    yAxis: {
        type: 'value',
        axisLine: {
            show: false
        },
        axisTick: {
            length: 0 // 刻度线的长度
        },
        splitLine: {
            lineStyle: {
                // color: ["#051d5f"],
                color: ['#094386'],
                width: 1,
                type: 'solid'
            }
        },
        axisLabel: {
            textStyle: {
                color: '#a3a4b2'
            }
        }
    },
    series: [{
        name: '吃饺子',
        type: 'line',
        symbol: 'circle', // 拐点类型
        smooth: true, // 当为true时，就是光滑的曲线（默认为true）；当为false，就是折线不是曲线的了，那这个设为true，下面的（吃饭）数据中设置smooth为false，这个就不是光滑的曲线了。
        symbolSize: 3, // 拐点圆的大小
        itemStyle: {
            normal: {
                color: '#0bb6db', // 折线条的颜色
                borderColor: '#0bb6db', // 拐点边框颜色
            }
        },
        data: ['162', '192', '140', '182', '162', '209', '186', '178', '230', '196', '219', '234', '256', '201', '172', '182', '192', '168', '176', '189', '167', '174', '152', '162', '182', '162']
    }]
};
// 使用制定的配置项和数据显示图表



var xhr1 = new XMLHttpRequest();
// 2 指定请求的方式和请求的地址
xhr1.open("get", "https://edu.telking.com/api/?type=month");
// 3 发送请求
xhr1.send();
// 4 注册状态变化的监听(事件)
xhr1.onreadystatechange = function () {
    // 关注最终的结果
    if (xhr1.readyState == 4 && xhr1.status == 200) {
        //把响应体获取
        console.log(JSON.parse(xhr1.responseText));
        zxBoxOption.xAxis.data = JSON.parse(xhr1.responseText).data.xAxis;
        console.log(zxBoxOption.xAxis.data)
        zxBoxOption.series[0].data = JSON.parse(xhr1.responseText).data.series;
        console.log(zxBoxOption.series[0].data)
        zxBoxEchart.setOption(zxBoxOption);

        
        // echart图表自适应
        window.addEventListener("resize", function () {
            zxBoxEchart.resize();
        });
    }
}