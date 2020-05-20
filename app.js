///////////// DROP DOWN VALUES /////////////////////

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

//////////////         INIT FUNCTION              /////////////////////////

function initBar() {
    d3.json("samples.json").then(function(data) {

        var sampleSelection = data.samples[0];

        var sampleValues = Object.values(sampleSelection);

        var sortedVaules = sampleValues[2]

        var xReversed = sortedVaules.slice(0, 10);

        var x = xReversed.reverse();

        // Get values from dataset from otu_ids for labels for bar chart

        var chartLabels = sampleValues[1]

        var slicedLabels = chartLabels.slice(0, 10);

        var yReversed = slicedLabels.reverse();

        var y = yReversed.map(item => `OTU ${item}`);

         // Get values from dataset from otu_labels for hovertext for bar chart

        var hoverLabels = sampleValues[3];

        var textReversed = hoverLabels.slice(0, 10);

        var text = textReversed.reverse();

        var trace = {
            x: x,
            y: y,
            text: text,
            type: "bar",
            orientation: 'h'
        };

        var data = [trace];

        var layout = {
            title: "Bar Chart"
        };

        Plotly.newPlot("bar", data, layout);

    
    });
};

initBar();

///////////////         INIT PANEL        //////////////////////////////////


function initPanel () {
    d3.json("samples.json").then(function(data) {

        var sampleSelection = data.metadata[0];

        addList.html("");

        Object.entries(sampleSelection).forEach(([key, value]) => {

            var addItem = addList.append("li");

            addItem.text(`${key}: ${value}`);
        });

    });
};

initPanel();


////////////////////          INIT BUBBLE                /////////////////////

function initBubble () {
    d3.json("samples.json").then(function(data) {

        // Get X Values

        var sampleSelection = data.samples[0];

        var sampleValues = Object.values(sampleSelection);

        var xValues = sampleValues[1];

        // Get Y Values

        var yValues = sampleValues[2];

        // Get Marker Size Values

        var markerSize = sampleValues[2];

        // Get Values for Marker Colors

        var colorValues = sampleValues[1];

        // Get Text Values

        var textValues = sampleValues[3];

        console.log();

        var trace = {
            x: xValues,
            y: yValues,
            text: textValues,
            mode: "markers",
            marker: {
                size: markerSize,
                // sizemode: 'area',
                transforms: [{ type: "groupby", groups: colorValues }],
                sizeref: 2.0 * Math.max(markerSize) / (Math.max(markerSize**2))
                // sizemin: Math.max(markerSize),
                // sizemode: Math.min(markerSize)
            }
        };

        var data = [trace];

        var layout = {
            title: "Bubble Chart"
        };

        Plotly.newPlot("bubble", data, layout);

    });

};

initBubble ();


////////////           UNPACK FUNCTION         ////////////////////////////////

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  };

///////////////        EVENT TRIGGER VALUE     ////////////////////////////////
  

var userSelection = idSelect.property("value");

/////////////            BAR CHART AND EVENT LISTENER      ///////////////////////////////

function buildBar () {
    d3.json("samples.json").then(function(data) {

        // Get values from dataset from sample_values for values for bar chart

        var userSelection = idSelect.property("value");

        var selectionIndex = parseInt(userSelection);

        var sampleSelection = data.samples[selectionIndex];

        var sampleValues = Object.values(sampleSelection);

        var sortedVaules = sampleValues[2]

        var xReversed = sortedVaules.slice(0, 10);

        var x = xReversed.reverse();

        // Get values from dataset from otu_ids for labels for bar chart

        var chartLabels = sampleValues[1]

        var slicedLabels = chartLabels.slice(0, 10);

        var yReversed = slicedLabels.reverse();

        var y = yReversed.map(item => `OTU ${item}`);

         // Get values from dataset from otu_labels for hovertext for bar chart

        var hoverLabels = sampleValues[3];

        var textReversed = hoverLabels.slice(0, 10);

        var text = textReversed.reverse();

        var trace = {
            x: x,
            y: y,
            text: text,
            type: "bar",
            orientation: 'h'
        };

        var data = [trace];

        var layout = {
            title: "Bar Chart"
        };

        Plotly.newPlot("bar", data, layout);

        });
    };
//////////////        BUBBLE CHART            ////////////////////////////

function buildBubble () {
    d3.json("samples.json").then(function(data) {

        // Get X Values

        var userSelection = idSelect.property("value");

        var selectionIndex = parseInt(userSelection);

        var sampleSelection = data.samples[selectionIndex];

        var sampleValues = Object.values(sampleSelection);

        var xValues = sampleValues[1];

        // Get Y Values

        var yValues = sampleValues[2];

        // Get Marker Size Values

        var markerSize = sampleValues[2];

        // Get Values for Marker Colors

        var colorValues = sampleValues[1];

        // Get Text Values

        var textValues = sampleValues[3];

        console.log();

        var trace = {
            x: xValues,
            y: yValues,
            text: textValues,
            mode: "markers",
            marker: {
                size: markerSize,
                // sizemode: 'area',
                transforms: [{ type: "groupby", groups: colorValues }],
                sizeref: 2.0 * Math.max(markerSize) / (Math.max(markerSize**2))
                // sizemin: Math.max(markerSize),
                // sizemode: Math.min(markerSize)
            }
        };

        var data = [trace];

        var layout = {
            title: "Bubble Chart"
        };

        Plotly.newPlot("bubble", data, layout);

    });

};


   

//////////////         PANEL INFO              /////////////////////////

var panelArea = d3.select("#sample-metadata");

var addList = panelArea.append("ul").attr("class", "list-unstyled");


function buildPanel () {
    d3.json("samples.json").then(function(data) {

        var userSelection = idSelect.property("value");

        var selectionIndex = parseInt(userSelection);

        var sampleSelection = data.metadata[selectionIndex];

        addList.html("");

        Object.entries(sampleSelection).forEach(([key, value]) => {

            var addItem = addList.append("li");

            addItem.text(`${key}: ${value}`);
        });

        // console.log(sampleSelection);

    });
};

////////////////////////////////////////////////////////////


function callAll() {
    buildBar();
    buildPanel();
    buildBubble();
};

d3.selectAll("#selDataset").on("change", callAll);

// how to make an event selector run multiple functions