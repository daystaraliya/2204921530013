import axios from "axios";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { numberStore, apiUrls, WINDOW_SIZE } from "../modals/average.modals.js";

export const getNumbers = asyncHandler(async (req, res) => {
  const { numberid } = req.params;

  if (!["p", "f", "e", "r"].includes(numberid)) {
    throw new ApiError(400, "Invalid number ID");
  }

  const windowPrevState = [...numberStore[numberid]];

  let numbers = [];
  try {
    const { data } = await axios.get(apiUrls[numberid], { timeout: 500 });
    numbers = data.numbers || [];
  } catch {}

  const merged = Array.from(new Set([...numberStore[numberid], ...numbers]));
  numberStore[numberid] =
    merged.length > WINDOW_SIZE ? merged.slice(-WINDOW_SIZE) : merged;

  const curr = numberStore[numberid];
  const avg = curr.reduce((sum, v) => sum + v, 0) / (curr.length || 1);

  const payload = {
    windowPrevState,
    windowCurrState: curr,
    numbers,
    avg: parseFloat(avg.toFixed(2)),
  };

  res.status(200).json(new ApiResponse(200, payload));
});
