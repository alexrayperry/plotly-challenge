

var idSelect = d3.select("#selDataset");

d3.json("samples.json").then((data) => {

    console.log(data);

    var info = data.names;

    info.forEach((name, index) => {
       
        var idSelection = idSelect.append("option");

        idSelection.text(name);

        idSelection.attr("value", `${index}`);

    });

});

//////////////////////////////////////////////////////

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  };
  

var userSelection = idSelect.property("value");

function buildBar () {
    d3.json("samples.json").then(function(data) {

        // Get values from dataset

        var selectionIndex = parseInt(userSelection);

        var sampleSelection = data.samples[selectionIndex];

        var sampleValues = Object.values(sampleSelection);

        var chartValues = sampleValues[2]

        console.log(chartValues);
        });
    };
   
    buildBar ();

    //     var trace = {
    //         x: 
    //         y:
    //         type: "bar"
    //         orientation: 'n'
    //     };

    //     var data = [trace];

    //     var layout = {
    //         title: "Bar Chart"
    //     };

    //     Plotly.newPlot("plot", data, layout);

    // }




//????????????????Maybe pass selection through a switch.

// function unpack(rows, index) {
//     return rows.map(function(row) {
//         return row[index];
//     });
// };

// function dataRequest() {
//     d3.json(data)
// 