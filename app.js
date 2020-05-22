///////////// DROP DOWN OPTIONS /////////////////////

// Set variable to select where data should go
var idSelect = d3.select("#selDataset");

// Use d3 to read in json data and get the id's from the names object in the JSON Data
d3.json("samples.json").then((data) => {

    console.log(data);

    var info = data.names;

    // Loop through the names list to append/nest Option elements to the html under the select element,
    // append the name (or rather ID) from the list as text to that option element, and append a value attribute with 
    // the index from each name in the list to the value attribute. 
    info.forEach((name, index) => {
       
        var idSelection = idSelect.append("option");

        idSelection.text(name);

        idSelection.attr("value", `${index}`);

    });

});

//////////////         INIT BAR FUNCTION              /////////////////////////

// Initiailize function to set first bar chart to be displayed when opening the webpage;
// set to index 0 in the samples object. 

function initBar() {
    d3.json("samples.json").then(function(data) {

        // select index 0 in the Sample data which is ID 940
        var sampleSelection = data.samples[0];

        // get lists of values from the objects nest under data.sample[0]
        var sampleValues = Object.values(sampleSelection);

        // get Sample Values using index 2 of new array of lists created in the previous step.
        var sortedValues = sampleValues[2]

        // Slice the list of Sample Values to give us the top 10
        var xReversed = sortedValues.slice(0, 10);

        // Reverse the list so that when plottin the bar graph, it will plot the largest value on top.
        var x = xReversed.reverse();

        // Similar to the aforementioned step, get the Chart Labels (OTUs)

        var chartLabels = sampleValues[1]

        var slicedLabels = chartLabels.slice(0, 10);

        var yReversed = slicedLabels.reverse();

        // Create a new array with the OTU id as a string and with OTU in the string my using the map function.
        var y = yReversed.map(item => `OTU ${item}`);

        // Get values from dataset from otu_labels for hovertext for bar chart

        var hoverLabels = sampleValues[3];

        var textReversed = hoverLabels.slice(0, 10);

        var text = textReversed.reverse();

        // Plot the Horizontal Bar Chart
        var trace = {
            x: x,
            y: y,
            text: text,
            type: "bar",
            orientation: 'h'
        };

        var data = [trace];

        var layout = {
            title: "Top 10 OTUs"
        };

        Plotly.newPlot("bar", data, layout);

    
    });
};

initBar();

////////////////////          INIT BUBBLE                /////////////////////

function initBubble () {
    d3.json("samples.json").then(function(data) {

        // Get X Values from otu_ids data

        var sampleSelection = data.samples[0];

        var sampleValues = Object.values(sampleSelection);

        var xValues = sampleValues[1];

        // Get Y Values from Sample Values

        var yValues = sampleValues[2];

        // Get Marker Size Values Sample Values

        var markerSize = sampleValues[2];

        // Get Values for Marker Colors from otu_ids 

        var colorValues = sampleValues[1];

        // Get Text Values from out_labels

        var textValues = sampleValues[3];

        // Plot Bubble Chart
        var trace = {
            x: xValues,
            y: yValues,
            text: textValues,
            mode: "markers",
            marker: {
                size: markerSize,
                color: colorValues,
                colorscale: "Earth"
            }
        };

        var data = [trace];

        var layout = {
            title: "OTUs per Sample",
            margin: {t:0},
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
            margin: {t:30}
        };

        Plotly.newPlot("bubble", data, layout);

    });

};

initBubble ();


///////////////         INIT PANEL        //////////////////////////////////

// use d3 to select HTML area where the panel info will be appeneded and append a unordered list elements.
var panelArea = d3.select("#sample-metadata");

var addList = panelArea.append("ul").attr("class", "list-unstyled");


function initPanel () {
    d3.json("samples.json").then(function(data) {

        // I used the index value of 0 to present data realted to ID 940
        // in the metadata object when the webpage loads.
        var sampleSelection = data.metadata[0];

        // Clear any prior info in the panel elements.
        addList.html("");

        // Loop through the keys an values of the sample selection and append them as text to list elements.
        Object.entries(sampleSelection).forEach(([key, value]) => {

            var addItem = addList.append("li");

            addItem.text(`${key}: ${value}`);
        });

    });
};

initPanel();



/////////////            BAR CHART FUNCTION FOR EVENT LISTENER      ///////////////////////////////

function buildBar () {
    d3.json("samples.json").then(function(data) {

        // Get the "value" attribute from the user's selection, which is equivalent to the index 
        // position of the selected ID in the "samples" object of the json data.

        var userSelection = idSelect.property("value");

        // Change the selection value from a string to integer
        var selectionIndex = parseInt(userSelection);

        // Apply the selected index number to select the specific sample/ID and repeat process from init fumction. 
        var sampleSelection = data.samples[selectionIndex];

        var sampleValues = Object.values(sampleSelection);

        var sortedVaules = sampleValues[2];

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
            title: "Top 10 OTUs"
        };

        Plotly.newPlot("bar", data, layout);

        });
    };
//////////////        BUBBLE CHART FUNCTION FOR EVENT LISTENER           ////////////////////////////

function buildBubble () {
    d3.json("samples.json").then(function(data) {

        // Get X Values, same method as previously mentioned function.

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

        // Plot bubble chart
        var trace = {
            x: xValues,
            y: yValues,
            text: textValues,
            mode: "markers",
            marker: {
                size: markerSize,
                color: colorValues,
                colorscale: "Earth"
            }
        };

        var data = [trace];

        var layout = {
            title: "OTUs per Sample",
            margin: {t:0},
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
            margin: {t:30}
        };

        Plotly.newPlot("bubble", data, layout);
    });

};


//////////////       PANEL INFO FUNCTION FOR EVENT LISTENER              /////////////////////////


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

    });
};

///////////////          EVENT LISTENER          //////////////////////////////////

// Create a function to run all 3 functions we previously set up to up date charts based on user selection.

function callAll() {
    buildBar();
    buildPanel();
    buildBubble();
};

// Create the event listener to listen for a change in the drop down of IDs

d3.selectAll("#selDataset").on("change", callAll);
