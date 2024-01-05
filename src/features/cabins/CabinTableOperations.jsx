import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import React from "react";
import SortBy from "../../ui/SortBy";
function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: " No discount" },
          { value: "with-discount", label: " With discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name(A-Z)" },
          { value: "name-desc", label: "Sort by name(Z-A)" },
          { value: "regularPrice-asc", label: "Sort by Price(Low to High)" },
          { value: "regularPrice-desc", label: "Sort by Price(High to Low)" },
          { value: "maxCapacity-asc", label: "Sort by capacity(Low to High)" },
          { value: "maxCapacity-desc", label: "Sort by capacity(High to Low)" },
        ]}
      />
    </TableOperations>
  );
}
export default CabinTableOperations;
