import React from "react";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";

export default function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { isLoading, data: stays } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );
  return { isLoading, stays, confirmedStays, numDays };
}
