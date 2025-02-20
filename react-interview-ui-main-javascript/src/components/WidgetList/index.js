import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddWidget from "../WidgetAdd/AddWidget";

import WidgetDisplay from "../WidgetDisplay";
import { fetchAllWidgets, deleteWidget } from "../../lib/apiConnect";
import { Button, TextField } from "@mui/material";

const WidgetList = () => {
  const [allWidgets, setAllWidgets] = useState([
    { name: "", price: 0, description: "" },
  ]);
  const [widgets, setWidgets] = useState([]);
  const [showWidget, setWidgetPopup] = useState(false);
  const [widget, setWidget] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchResult, setSearchResult] = useState({
    name: "",
    price: 0,
    description: "",
  });
  const [searchResultError, setSearchResultError] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  const handleWidgetAdd = () => {
    setWidgetPopup(!showWidget);
    setWidget(null);
  };

  const handleUpdateClick = (widget) => {
    setWidget(widget);
    setWidgetPopup(!showWidget);
  };

  const handleDeleteClick = async (widgetName) => {
    const res = await deleteWidget(widgetName);
    setWidgets(res);
    setAllWidgets(res);
  };

  const handleAddWidgetSuccess = () => {
    fetchAll();
    setWidget(null);
  };

  const fetchAll = () => {
    fetchAllWidgets()
      .then((data) => {
        setWidgets(data);
        setAllWidgets(data);
      })
      .catch((error) => console.error("Error fetching widgets", error));
  };

  const handleSearch = () => {
    if (!searchKey) {
      setSearchResultError("");
      setShowSearch(false);
      return;
    }
    const foundWidget =
      searchKey &&
      allWidgets?.find((w) => w.name.toLowerCase() === searchKey.toLowerCase());
    if (foundWidget) {
      setSearchResult(foundWidget);
      setSearchResultError("");
      setShowSearch(true);
    } else {
      setShowSearch(false);
      setWidget(null);
      setSearchResultError("Widget not found.");
    }
  };

  const handleSearchInput = (e) => {
    const inputValue = e.target.value;
    setSearchKey(inputValue);
    if (!inputValue) {
      setSearchResultError("");
      setShowSearch(false);
    }
  };

  return (
    <Stack
      spacing={4}
      sx={{ margin: "auto", maxWidth: 900, paddingTop: "4em", width: "100%" }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          label="Enter Widget Name"
          variant="outlined"
          value={searchKey}
          onChange={handleSearchInput}
          size="small"
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>

        <Button onClick={handleWidgetAdd}>Add New Widget</Button>
      </Stack>

      <Typography sx={{ textAlign: "center" }} variant="h3">
        List of widgets:
      </Typography>
      {searchResultError && (
        <Typography mt={2} align="center">
          {searchResultError}
        </Typography>
      )}
      <Grid
        container
        justifyContent="center"
        spacing={4}
        sx={{ paddingRight: 4, width: "100%" }}
      >
        {showSearch ? (
          <WidgetDisplay
            widget={searchResult}
            onUpdateClick={handleUpdateClick}
            onDeleteClick={handleDeleteClick}
          />
        ) : (
          widgets.map((current, index) => (
            <WidgetDisplay
              key={index}
              widget={current}
              onUpdateClick={handleUpdateClick}
              onDeleteClick={handleDeleteClick}
            />
          ))
        )}
      </Grid>

      {showWidget && (
        <AddWidget
          open={showWidget}
          onClose={handleWidgetAdd}
          onWidgetAddSuccess={handleAddWidgetSuccess}
          widget={widget}
        />
      )}
    </Stack>
  );
};

export default WidgetList;
