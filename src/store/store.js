import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/exampleSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
