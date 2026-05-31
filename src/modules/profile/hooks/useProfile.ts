import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { incrementRideStats } from "@/modules/profile/redux/slices/profileSlice";
import { Ride } from "@/modules/rides/types";

export const useProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profileState = useSelector((state: RootState) => state.profile);

  const actions = {
    incrementRideStats: (ride: Ride) => {
      dispatch(incrementRideStats(ride));
    },
  };

  return {
    ...profileState,
    ...actions,
  };
};