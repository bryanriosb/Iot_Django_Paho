/**
 * Created by Mateusz on 24.09.2016.
 */

setInterval("generateAjaxRequest()", 3000);

function generateAjaxRequest() {
    $.ajax({
        type: "GET",
        url: "/hwdata/json/",
	//url: "jestemlosiem.ddns.net/hwdata/json/",
        data: name,
        cache: false,
        dataType: "json",
	//contentType: "application/json",
	complete : function(d){
	    //alert(d['cpu_usage'])
	},
	success: function (data) {
	    
            var cpu = data['cpu usage'];
            var swap = data['swap usage'];

            var chart = $('#container-cpu').highcharts(),
                point,
                newVal,
                inc;

            // Update Cpu value
            if (chart) {
                point = chart.series[0].points[0];
                newVal = cpu;
                point.update(newVal);
            }

            // Update Swap value
            chart = $('#container-swap').highcharts();
            if (chart) {
                point = chart.series[0].points[0];
                newVal = swap;

                newVal = swap;
                point.update(newVal);
            }

        },
        error: function (error) {
	    console.log("Error:");
            console.log(error);
        }
    });
    // window.location = location.href;
}

$(function () {
    var gaugeOptions = {

        chart: {
            type: 'solidgauge'
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    // The speed gauge
    $('#container-cpu').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'CPU'
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Cpu',
            data: [0],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                '<span style="font-size:12px;color:silver">%</span></div>'
            },
            tooltip: {
                valueSuffix: ' %'
            }
        }]

    }));

    // The RPM gauge
    $('#container-swap').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Swap'
            }
        },

        series: [{
            name: 'Swap',
            data: [0],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                '<span style="font-size:12px;color:silver">%</span></div>'
            },
            tooltip: {
                valueSuffix: ' %'
            }
        }]

    }));


});
