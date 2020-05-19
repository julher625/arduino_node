const socket = io()

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [...Array(101).keys()],
        datasets: [{
            label: 'Data',
            backgroundColor: '#29a19c',//'rgb(255, 99, 132)'
            borderColor: '#29a19c',
            //fill: false,
            data: [10,10,101,0]
        }]
    },

    // Configuration options go here
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 1023
                }
            }]
        }

    }
});

socket.on('update',(msg)=>{
    
    addData(chart,msg.data)
})

function addData(chart, data) {
    chart.data.datasets.forEach((dataset) => {
        dataset.data = data//data
        document.getElementById("mean").innerHTML = mean(data);
        document.getElementById("desviacion").innerHTML = dev(data);
        document.getElementById("var").innerHTML = Math.pow(dev(data),2);
        document.getElementById("desviacionm").innerHTML = devm(data);

        //console.log(mean(data));
        //console.log(dataset.data)
        //dataset.data.push(data);
        //console.log(mean(data));
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

function mean(x){
    var sum = 0
    for (const num in x) {
        sum += x[num]
        
    }
    
    return sum/x.length
}

function dev(x){
    var sum = 0
    try {
        const m = mean(x)
        for (const num in x) {
            sum += Math.pow((x[num]-m),2)
        }
        y = Math.sqrt(sum/x.length)
    } catch (error) {
        y = 0
    }

return y
}

function devm(x){
    var sum = 0
    try {
        const m = mean(x)
        for (const num in x) {
            sum += Math.abs(x[num]-m)
        }
        y = sum/x.length
    } catch (error) {
        y = 0
    }

return y
}