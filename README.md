# Plot.ly - Belly Button Biodiversity

In this assignment, I built an interactive dashboard to explore  [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

![Bacteria](bacteria.png)


## Drop Down Feature

In order to create the drop down that displays the Test Subject ID #'s, I used the "names" key within the JSON object response. The "names" Key contained an array of the test subject IDs. Using this array I looped through the array and using d3, I selected the ID within the HTML that I needed to work with in order to appened an option element (containing the test subject ID as text) and value attribute (containing the index number of that test subject ID in the array). The index number from the value attribute is what we will use with d3 to call on when we update our charts according to the user's seletion. 

## Bar Chart 

Using the value from the option tag of users selection, which is the index number of the selected ID, I applied the index number to get the specific data I wanted to get about any given test subject, in order to plot the horizontal bar chart. Once the data for the specific test subject was stored in a variable, I used the slice and reverse functions on the arrays of data to have our data array correctly ordered and contain the top 10 OTU's, only. The order was important for the data to be displayed with the largest values at the top of the horizontal bar chart rather than the bottom. One other way we had to tweak the data was to create a new array with the OTU ID as a string and include "OTU" in the string using the map function. Once I had all the values in there appropriate array, I ploted to a horizontal bar chart using an orientation of "h', for horizontal. 

## Bubble Chart

I followed the same method as mentioned above to get the data arrays for the Bubble chart. The only difference was there was no need to slice or reverse any data. We simply pulled the arrays of data from the json data and plotted the bubble chart using a "mode" of "marker" and playing with the sizing and color scheme. 

## Info Panel

Using d3 I selected the area where the panel info will be appeneded and appended a unordered list element and within that, list elements. I ensured to add a function to clear this data for every instance a user selected a new ID. Lastly, I used the same method as used in the bar char and bubble chart to use the users selection and obtain the corresponding data from the json data via the index value of the test subject ID. 

## EVENT LISTENER 

The last step was to create a function that would run all three of the aforemntioned functions and then run that new function through the event listener that would listen for a change in the selected test subject ID from the drop down. With all the steps completed, the charts and panel on the dashboard now display data corresponding to the test subject ID selected by the user. 

### About the Data

Hulcr, J. et al.(2012) _A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable_. Retrieved from: [http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/](http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/)