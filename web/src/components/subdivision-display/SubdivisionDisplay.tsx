import { useEffect, useState } from "react";
import dayjs from "dayjs";

import "./SubdivisionDisplay.css";

// In future can move this to global typing for reuse
export type Subdivision = {
  id: number;
  code: string;
  name: string;
  longitude: number;
  latitude: number;
  fieldSurveyTerritoryId: number;
  marketId: number;
  subdivisionStatusId: number;
  surveyMethodId: number;
  activeSections: number;
  futureSections: number;
  builtOutSections: number;
  totalLots: number;
  fieldSurveyTerritoryName: string;
  marketName: string;
  marketAbbreviation: string;
  subdivisionStatusCode: string;
  surveyMethodCode: string;
  county: string;
  community: string;
  zoom17Date: Date;
  zoom18Date: Date;
  subdivisionGeometryId: number;
  subdivisionGeometryBoundingBoxId: number;
  subdivisionGeometryBoundaryId: number;
  subdivisionGeometryIntelligenceBoundaryId: number;
  subdivisionGeometryIntelligenceBoundaryStatusId: number;
  subdivisionGeometryIntelligenceBoundaryStatusCode: string;
  subdivisionGeometryIntelligenceBoundaryStatusChangeDate: Date;
  nearMapImageDate: Date;
  imageBoxId: number;
  mostRecentIPointBatchDate: Date;
  iPoints: any;
  validatediPoints: any;
  subdivisionSpecificStatus: string;
};

export const SubdivisionDisplay = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [subdivisionData, setSubdivisionData] = useState<Subdivision[]>([]);
  const [selectedSubdivision, setSelectedSubdivision] = useState<Subdivision>();

  // For filter functionality
  const [currentFilterOption, setCurrentFilterOption] = useState<string>();

  // For sorting functionality
  const [currentSortingOption, setCurrentSortingOption] = useState<string>("");
  const [currentSortDirection, setCurrentSortDirection] = useState<
    "asc" | "desc"
  >("asc");

  // Retrieve subdivison data from API based on current sort and page
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Conditionally add query parameters to query
      let queryString: string = `/subdivision?`;
      const params = [];

      if (currentFilterOption) {
        params.push(`filter=${currentFilterOption}`);
      }

      if (currentSortingOption) {
        params.push(
          `sort=${currentSortingOption}&direction=${currentSortDirection}`
        );
      }

      params.push(`page=${currentPage}`);

      // Join all parameters into a single query string
      queryString += params.join("&");

      const response = await fetch(queryString);
      const data = await response.json();

      setSubdivisionData([...data]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh data when changing sort option
  useEffect(() => {
    fetchData();
  }, [
    currentSortingOption,
    currentSortDirection,
    currentFilterOption,
    currentPage,
  ]);

  // Handle setting sorting option and direction
  const handleSort = (property: string) => {
    if (currentSortingOption === property) {
      // Toggle sorting direction if clicking the same column
      setCurrentSortDirection(currentSortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set sorting to ascending when switching columns
      setCurrentSortingOption(property);
      setCurrentSortDirection("asc");
    }
    setCurrentPage(1);
  };

  // Get indicator for sorting direction
  const getSortIndicator = (property: string) => {
    if (currentSortingOption === property) {
      return currentSortDirection === "asc" ? "▲" : "▼";
    }
    return "";
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentFilterOption(event.target.value);
  };

  // Handle formatting keys for display
  const formatLabel = (key: string) => {
    return (
      key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .replace(/Id$/, " ID")
        // Correct variations of iPoint from previous formatting
        .replace(/I Point/g, "iPoint")
        .replace(/i Point/g, " iPoint")
    );
  };

  return (
    <>
      {!isLoading && !selectedSubdivision ? (
        <>
          <table className="resultsTable">
            <thead>
              <tr>
                <th className="header">Code</th>
                <th
                  className="hoverableHeader"
                  onClick={() => handleSort("name")}
                >
                  Name {getSortIndicator("name")}
                </th>
                <th
                  className="hoverableHeader"
                  onClick={() => handleSort("nearMapImageDate")}
                >
                  Near Map Image Time {getSortIndicator("nearMapImageDate")}
                </th>
              </tr>
            </thead>
            <tbody>
              {subdivisionData.map((subdivision: Subdivision) => (
                <tr
                  className="tableRow"
                  key={subdivision.id}
                  onClick={() => setSelectedSubdivision(subdivision)}
                >
                  <td>{subdivision.code || "N/A"}</td>
                  <td>{subdivision.name}</td>
                  <td>
                    {dayjs(subdivision.nearMapImageDate).format(
                      "MM/DD/YYYY hh:mm:ss A"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              {"<<"}
            </button>{" "}
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>{" "}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === 64}
            >
              {">"}
            </button>{" "}
            <button
              onClick={() => setCurrentPage(64)}
              disabled={currentPage === 64}
            >
              {">>"}
            </button>{" "}
            <span>
              Page <strong>{currentPage} of 64</strong>{" "}
            </span>
            <select
              id="optionsDropdown"
              value={currentFilterOption}
              onChange={handleFilterChange}
            >
              <option value="">--Filter Options--</option>
              <option value="Active">Active</option>
              <option value="Future">Future</option>
              <option value="Builtout">Builtout</option>
            </select>
          </div>
        </>
      ) : !isLoading && selectedSubdivision ? (
        <div className="subdivisionDetails">
          {Object.entries(selectedSubdivision).map(([key, value]) => (
            <div key={key}>
              <strong>{formatLabel(key)}:</strong>{" "}
              {key.toString().includes("Date")
                ? dayjs(value).format("MM/DD/YYYY hh:mm:ss A")
                : value}
            </div>
          ))}
          <button
            className="backButton"
            onClick={() => setSelectedSubdivision(undefined)}
          >
            {"Go Back"}
          </button>
        </div>
      ) : (
        isLoading && <div className="loading">Loading...</div>
      )}
    </>
  );
};
