import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

/**
 * Typed Redux hooks — use these everywhere instead of raw useDispatch/useSelector.
 * They carry the full AppDispatch and RootState types automatically.
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
