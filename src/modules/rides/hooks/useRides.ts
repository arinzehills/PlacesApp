import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  setAvailableRides,
  setSelectedRide,
  setFilters,
} from "@/modules/rides/redux/slices/ridesSlice";
import { Ride } from "@/modules/rides/types";

export const useRides = () => {
  const dispatch = useDispatch<AppDispatch>();
  const ridesState = useSelector((state: RootState) => state.rides);

  const actions = {
    setAvailableRides: (rides: Ride[]) => {
      dispatch(setAvailableRides(rides));
    },
    setSelectedRide: (ride: Ride | null) => {
      dispatch(setSelectedRide(ride));
    },
    setFilters: (filters: Partial<typeof ridesState.filters>) => {
      dispatch(setFilters(filters));
    },
  };

  return {
    ...ridesState,
    ...actions,
  };
};