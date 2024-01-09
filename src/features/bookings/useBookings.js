import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  //Filter
  const filterValue = searchParams.get("status") || "all";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // { field: "totalPrice", value: 5000, method: "gte" };

  //Sort
  const sortValue = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortValue.split("-");
  const sortBy = { field, direction };
  //pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  //query
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  //prefetching
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }
  if (filterValue === "all") {
    queryClient.prefetchQuery({
      queryKey: [
        "bookings",
        { field: "status", value: "checked-in" },
        sortBy,
        page,
      ],
      queryFn: () =>
        getBookings({
          filter: { field: "status", value: "checked-in" },
          sortBy,
          page,
        }),
    });
    queryClient.prefetchQuery({
      queryKey: [
        "bookings",
        { field: "status", value: "checked-out" },
        sortBy,
        page,
      ],
      queryFn: () =>
        getBookings({
          filter: { field: "status", value: "checked-out" },
          sortBy,
          page,
        }),
    });
    queryClient.prefetchQuery({
      queryKey: [
        "bookings",
        { field: "status", value: "unconfirmed" },
        sortBy,
        page,
      ],
      queryFn: () =>
        getBookings({
          filter: { field: "status", value: "unconfirmed" },
          sortBy,
          page,
        }),
    });
  }
  return { isLoading, bookings, error, count };
}
