import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

// chart dummy data
const data = [
  { date: "2021-10-14" },
  { date: "2021-10-18" },
  { date: "2021-10-22" },
  { date: "2021-10-22" },
  { date: "2021-10-25" },
  { date: "2021-10-31" },
  { date: "2021-10-1" },
];

const dateFormatter = (date) => {
  return format(new Date(date), "MMM-dd-yyyy");
};

const DataChart = () => {
  var maindata = data.reduce((acc, { date }) => {
    const datetime = dateFormatter(new Date(date));
    const day = acc.find((day) => datetime.valueOf() === day.date.valueOf());
    if (day) {
      day.val++;
    } else {
      acc.push({ date: datetime, val: 1 });
    }

    return acc;
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "30px",
            lineHeight: "45px",
            color: "#343436",
          }}
          variant="h5"
        >
          Past Gift Trendline
        </Typography>
        <Box>
          <Typography
            variant="body"
            sx={{
              marginRight: "10px",
            }}
          >
            Too See Upcoming Gifts Go to:
          </Typography>
          <Button variant="contained">Get Calendar</Button>
        </Box>
      </Box>
      <Box sx={{ background: "#F1F1F1", padding: "10px" }}>
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            marginBottom: "15px",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "15px",
            lineHeight: "22px",
            textTransform: "capitalize",
            color: "#747474",
          }}
        >
          Number Of Gifts
        </Typography>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            width={500}
            height={200}
            data={maindata}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8bb2ce" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8bb2ce" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="val"
              stroke="#8bb2ce"
              fillOpacity={0.5}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
        <Typography
          variant="body2"
          sx={{
            margin: "19px 0px 15px 36px",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "15px",
            lineHeight: "22px",
            textTransform: "capitalize",
            color: "#747474",
          }}
        >
          Order from the past 6months
        </Typography>
      </Box>
    </Box>
  );
};

export default DataChart;
