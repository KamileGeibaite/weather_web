import { createCityLog, getCityLogs } from "../models/logModel.js";

export const logSelectedCity = async (req, res, next) => {
  const { city } = req.body;

  if (!city) {
    return res.status(400).json({
      status: "fail",
      message: "City is required",
    });
  }

  const selectedAt = new Date();
  const formattedDate = selectedAt.toLocaleString("lt-LT");

  console.log(`[${formattedDate}] City selected: ${city}`);

  try {
    const log = await createCityLog({ city, selectedAt });

    res.status(201).json({
      status: "success",
      message: "City is logged and saved to database",
      data: log,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCityLogs = async (req, res, next) => {
  try {
    const logs = await getCityLogs();

    res.status(200).json({
      status: "success",
      results: logs.length,
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};
