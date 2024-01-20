import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";
export default function useTodayActivity() {
  const { isLoading, data: activity } = useQuery({
    queryKey: ["todays-activity"],
    queryFn: () => getStaysTodayActivity(),
  });
  return { isLoading, activity };
}
