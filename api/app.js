var express = require("express");
var app = express();

// Filter data based on recieved params
function filterArray(data, filter) {
  return data.filter((data) => data.subdivisionStatusCode === filter);
}

// Sort data based on recieved params
function sortArray(data, sortBy, order) {
  return data.sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (sortBy === "nearMapImageDate") {
      valA = new Date(valA);
      valB = new Date(valB);
    }

    if (valA < valB) {
      return order === "asc" ? -1 : 1;
    } else if (valA > valB) {
      return order === "asc" ? 1 : -1;
    } else {
      return 0;
    }
  });
}

// Split data into a set range based on current page
function splitData(data, currentPage) {
  const itemsPerPage = 25;
  const start = (currentPage - 1) * itemsPerPage;
  const end = Math.min(start + itemsPerPage, data.length);

  return data.slice(start, end);
}

// Get data from JSON and return in response
app.get("/subdivision", (req, res) => {
  const jsonData = require("./subdivision.json");
  let subdivisionData = jsonData.subdivisions;
  
  // Filter data if param is provided
  if (req.query.filter) {
    subdivisionData = filterArray(subdivisionData, req.query.filter);
  }

  // Sort data if param is provided
  if (req.query.sort) {
    subdivisionData = sortArray(
      subdivisionData,
      req.query.sort,
      req.query.direction
    );
  }

  res.json(splitData(subdivisionData, req.query.page));
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

module.exports = app;
