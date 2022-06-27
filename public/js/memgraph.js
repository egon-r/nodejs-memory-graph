var ctx = $("#memGraph")
var graphData = 
{
        labels: [],
        datasets: [
            {
                label: "Used Memory [MB]",
                backgroundColor: "#4286f4",
                borderColor: "#4286f4",
                fill: false,
                lineTension: 0.1,
                data: [],
                spanGaps: false,
            }
        ]
}

var lineChart = new Chart(ctx, {
    type: 'line',
    data: graphData,
    options: {
        elements: {
            point: {
                radius: 0
            }
        },
        scales: {
            xAxes: [{
                type: 'time'
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
})


setInterval(function(){
    $.getJSON("/data/memory/used", "", function(data){
        console.log(data)
        var date = new Date(data.t)

        graphData.labels.push(date)
        graphData.datasets[0].data.push(Math.round(data.m/1000/1000))
        if(graphData.datasets[0].data.length > 100)
        {
            graphData.datasets[0].data.shift()
            graphData.labels.shift()
        }        
        lineChart.update()
    })
}, 2000)