import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk(
  "allJobs/getJobs",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await customFetch.get("/jobs", {
        headers: {
          authorization: `Bearer ${getState().user.user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

export const showStats = createAsyncThunk(
  "allJobs/showStats",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await customFetch.get("/jobs/stats", {
        headers: {
          authorization: `Bearer ${getState().user.user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, initialFiltersState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { showLoading, hideLoading, handleChange, clearFilters } =
  allJobsSlice.actions;

export default allJobsSlice.reducer;