import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
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
  { date: "2021-12-15", gifts: 25 },
  { date: "2022-01-15", gifts: 8 },
  { date: "2022-02-15", gifts: 14 },
  { date: "2022-03-15", gifts: 5 },
  { date: "2022-04-15", gifts: 17 },
  { date: "2022-05-15", gifts: 27 },
];

const dateFormatter = (date) => {
  return format(new Date(date), "MMM");
};

const DataChart = () => {
  const navigate = useNavigate();
  const rawData = data.map(({ date, gifts }) => ({
    date: dateFormatter(date),
    gifts: gifts,
  }));

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
            To See Upcoming Gifts Go to:
          </Typography>
          <Button variant="contained" onClick={() => navigate("/")}>
            Gift Dashboard
          </Button>
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
            data={rawData}
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
              dataKey="gifts"
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
          Orders From The Past 6 Months
        </Typography>
      </Box>
    </Box>
  );
};

export default DataChart;
