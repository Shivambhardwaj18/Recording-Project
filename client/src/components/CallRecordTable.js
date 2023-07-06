import React, { useEffect, useState, useRef } from "react";
import MUIDataTable from "mui-datatables";
import { Box, FormControl, TextField, Button, Grid } from "@material-ui/core";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import "../App.css";
import { Paper, Typography } from "@mui/material";
import axios from "../services/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const AudioDropdown = ({ value }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = () => {
    // Handle download logic

    handleClose();
  };

  const handlePlay = () => {
    // Handle play logic

    handleClose();
  };

  const handlePause = () => {
    // Handle pause logic

    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-controls="audio-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="audio-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDownload}>
          {" "}
          <DownloadForOfflineIcon
            style={{ color: "blue", marginRight: "7px" }}
          />{" "}
          Download
        </MenuItem>
        <MenuItem onClick={handlePlay}>
          {" "}
          <PlayCircleIcon style={{ color: "blue", marginRight: "7px" }} /> Play
        </MenuItem>
        <MenuItem onClick={handlePause}>
          <PauseCircleIcon style={{ color: "blue", marginRight: "7px" }} />{" "}
          Pause
        </MenuItem>
      </Menu>
    </div>
  );
};

// Mui data table
const columns = [
  {
    name: "voiceRecording",
    label: "Action",

    options: {
      filter: true,
      sort: false,
      customBodyRender: (value) => {
        return <AudioDropdown value={value} />;
      },
    },
  },
  {
    name: "callDateTo",
    label: "CallDate To",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => {
        const formattedDate = dayjs(value).format("YYYY-MM-DD");
        return <span>{formattedDate || "-"}</span>;
      },
    },
  },
  {
    name: "callDateFrom",
    label: "CallDate From",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => {
        const formattedDate = dayjs(value).format("YYYY-MM-DD");
        return <span>{formattedDate || "-"}</span>;
      },
    },
  },
  {
    name: "campaignId",
    label: "Campaign Id",

    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => {
        return <span>{value || "-"}</span>;
      },
    },
  },
  {
    name: "agentId",
    label: "Agent Id",

    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => {
        return <span>{value || "-"}</span>;
      },
    },
  },
  {
    name: "volunteerNumber",
    label: "Volunteer Number",

    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => {
        return <span>{value || "-"}</span>;
      },
    },
  },
  {
    name: "phoneNumber",
    label: "Phone Number",

    options: {
      filter: true,
      sort: false,
      customBodyRender: (value) => {
        return <span>{value || "-"}</span>;
      },
    },
  },
];

// Custom filter style
const options = {
  selectableRows: "none",
  responsive: "standard",
  filterType: "dropdown", // or 'dropdown'
  filter: true,
  download: true,
  print: false,
  search: false,
  viewColumns: false,
  customFilterDialogFooterPosition: "right", // or 'right'
  customFilterDialogWidth: "500px", // Set the desired width here
};

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.number().required("Phone Number is required."),
  volunteerNumber: Yup.number().required("Volunteer Number is required."),
  agentId: Yup.string().required("Agent ID is required."),
  campaignId: Yup.string().required("Campaign ID is required."),
  callDateFrom: Yup.date().required("Call Date From is required."),
  callDateTo: Yup.date()
    .required("Call Date To is required.")
    .min(Yup.ref("callDateFrom"), "Call Date To must be after Call Date From."),
});

const CallRecordTable = () => {
  const [rows, setRows] = useState([]);

  // Action code
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // Fetch call records from API
    fetchCallRecords();
  }, []);

  const fetchCallRecords = async () => {
    try {
      // Use formik.values to construct query parameters for API request
      const queryParams = new URLSearchParams(formik.values);

      const response = await axios.get(`/fetch?${queryParams}`);
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching call records:", error);
    }
  };

  function padZero(number) {
    return number.toString().padStart(2, "0");
  }

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      volunteerNumber: "",
      agentId: "",
      campaignId: "",
      callDateFrom: "",
      callDateTo: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      fetchCallRecords();
    },
  });

  return (
    <div>
      <Paper elevation={4} sx={{ margin: "10px" }}>
        <Paper sx={{ padding: "10px" }}>
          <form
            id="search"
            onSubmit={formik.handleSubmit}
            style={{ marginBottom: "10px" }}
          >
            <Box component="form" noValidate sx={{ padding: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={4}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControl variant="standard">
                      <span
                        style={{
                          fontSize: "15px",
                          fontFamily: "sans-serif",
                          fontWeight: "600",
                          marginBottom: "8px",
                          color: "#26240",
                        }}
                      >
                        {" "}
                        Phone Number
                      </span>

                      <TextField
                        variant="outlined"
                        type="number"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.phoneNumber &&
                          Boolean(formik.errors.phoneNumber)
                        }
                        helperText={
                          formik.touched.phoneNumber &&
                          formik.errors.phoneNumber
                        }
                        InputProps={{
                          style: { borderRadius: "10px" },
                        }}
                      />
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={4}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControl variant="standard">
                      <span
                        style={{
                          fontSize: "15px",
                          fontFamily: "sans-serif",
                          fontWeight: "600",
                          marginBottom: "8px",
                          color: "#26240",
                        }}
                      >
                        Volunteer Number
                      </span>

                      <TextField
                        variant="outlined"
                        type="number"
                        id="volunteerNumber"
                        name="volunteerNumber"
                        value={formik.values.volunteerNumber}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.volunteerNumber &&
                          Boolean(formik.errors.volunteerNumber)
                        }
                        helperText={
                          formik.touched.volunteerNumber &&
                          formik.errors.volunteerNumber
                        }
                        InputProps={{
                          style: { borderRadius: "10px" },
                        }}
                      />
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={4}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControl variant="standard">
                      <span
                        style={{
                          fontSize: "15px",
                          fontFamily: "sans-serif",
                          fontWeight: "600",
                          marginBottom: "8px",
                          color: "#26240",
                        }}
                      >
                        Agent ID
                      </span>

                      <TextField
                        variant="outlined"
                        type="text"
                        id="agentId"
                        name="agentId"
                        value={formik.values.agentId}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.agentId &&
                          Boolean(formik.errors.agentId)
                        }
                        helperText={
                          formik.touched.agentId && formik.errors.agentId
                        }
                        InputProps={{
                          style: { borderRadius: "10px" },
                        }}
                      />
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={4}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControl variant="standard">
                      <span
                        style={{
                          fontSize: "15px",
                          fontFamily: "sans-serif",
                          fontWeight: "600",
                          marginBottom: "8px",
                          color: "#26240",
                        }}
                      >
                        Campaign ID
                      </span>

                      <TextField
                        variant="outlined"
                        type="text"
                        id="campaignId"
                        name="campaignId"
                        value={formik.values.campaignId}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.campaignId &&
                          Boolean(formik.errors.campaignId)
                        }
                        helperText={
                          formik.touched.campaignId && formik.errors.campaignId
                        }
                        InputProps={{
                          style: { borderRadius: "10px" },
                        }}
                      />
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={4}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControl variant="standard">
                      <span
                        style={{
                          fontSize: "15px",
                          fontFamily: "sans-serif",
                          fontWeight: "600",
                          color: "#26240",
                        }}
                      >
                        Call Date From
                      </span>

                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            id="callDateFrom"
                            name="callDateFrom"
                            selected={formik.values.callDateFrom}
                            onChange={(date) => {
                              if (date) {
                                const year = date.$d?.getFullYear();
                                const month = date.$d?.getMonth() + 1;
                                const day = date.$d?.getDate();
                                const hours = date.$d?.getHours();
                                const minutes = date.$d?.getMinutes();
                                const seconds = date.$d?.getSeconds();
                                const milliseconds = date.$d?.getMilliseconds();

                                const formattedDate = `${year}-${padZero(
                                  month
                                )}-${padZero(day)}T${padZero(hours)}:${padZero(
                                  minutes
                                )}:${padZero(seconds)}.${padZero(
                                  milliseconds
                                )}Z`;

                                formik.setFieldValue(
                                  "callDateFrom",
                                  formattedDate
                                );
                              }
                            }}
                            dateFormat="yyyy-MM-dd"
                            className={
                              formik.touched.callDateFrom &&
                              formik.errors.callDateFrom
                                ? "error"
                                : ""
                            }
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      {formik.touched.callDateFrom &&
                        formik.errors.callDateFrom && (
                          <Typography variant="caption" color="error">
                            {formik.errors.callDateFrom}
                          </Typography>
                        )}
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={4}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControl variant="standard">
                      <span
                        style={{
                          fontSize: "15px",
                          fontFamily: "sans-serif",
                          fontWeight: "600",
                          color: "#26240",
                        }}
                      >
                        Call Date To
                      </span>

                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            id="callDateTo"
                            selected={formik.values.callDateTo}
                            name="callDateTo"
                            onChange={(date) => {
                              if (date) {
                                const year = date.$d?.getFullYear();
                                const month = date.$d?.getMonth() + 1;
                                const day = date.$d?.getDate();
                                const hours = date.$d?.getHours();
                                const minutes = date.$d?.getMinutes();
                                const seconds = date.$d?.getSeconds();
                                const milliseconds = date.$d?.getMilliseconds();

                                const formattedDate1 = `${year}-${padZero(
                                  month
                                )}-${padZero(day)}T${padZero(hours)}:${padZero(
                                  minutes
                                )}:${padZero(seconds)}.${padZero(
                                  milliseconds
                                )}Z`;

                                formik.setFieldValue(
                                  "callDateTo",
                                  formattedDate1
                                );
                              }
                            }}
                            dateFormat="yyyy-MM-dd"
                            className={
                              formik.touched.callDateTo &&
                              formik.errors.callDateTo
                                ? "error"
                                : ""
                            }
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      {formik.touched.callDateTo &&
                        formik.errors.callDateTo && (
                          <Typography variant="caption" color="error">
                            {formik.errors.callDateTo}
                          </Typography>
                        )}
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "15px",
                }}
              >
                <Button
                  form="search"
                  type="submit"
                  size="small"
                  variant="contained"
                  style={{
                    backgroundColor: "#3a4059",
                    borderRadius: "10px",
                    marginRight: "10px",
                    color: "#FFFFFF",
                  }}
                >
                  Search
                </Button>
                <Button
                  type="button"
                  size="small"
                  variant="contained"
                  style={{
                    backgroundColor: "#3a4059",
                    borderRadius: "10px",
                    marginRight: "10px",
                    color: "#FFFFFF",
                  }}
                  onClick={() => {
                    formik.handleReset(); // Reset the formik state
                    // Manually reset the DatePicker component values
                    document.getElementById("callDateFrom").value = "";
                    document.getElementById("callDateTo").value = "";
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Box>
          </form>

          <MUIDataTable data={rows} columns={columns} options={options} />
        </Paper>
      </Paper>
    </div>
  );
};

export default CallRecordTable;
