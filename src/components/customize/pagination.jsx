import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useCallback } from "react";
import { ArrowDown } from "lucide-react";
export function PaginationCustom({
  totalRowCount,
  pageSize,
  setPageSize,
  setPageIndex,
}) {
  const calculateTotalPages = useCallback(() => {
    return Math.ceil(totalRowCount / pageSize);
  }, [totalRowCount, pageSize]);
   const handleChangePageSize  = (value) => {
      setPageIndex(0)
      setPageSize(value)
  };
  return (
    <div className="flex mb-5  justify-center items-center">
      <DropdownMenu className="w-8 h-8 mr-6 border-solid border-black border-2">
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-10 w-16 gap-1 border-solid border-black border-[1px]"
          >
            <span className="sr-only sm:not-sr-only mr-3 sm:whitespace-nowrap">
              {pageSize}
            </span>
            <ArrowDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {/*  <DropdownMenuSeparator /> */}
          <DropdownMenuCheckboxItem onClick={() => handleChangePageSize(5)}>
            Size 5
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem onClick={() => handleChangePageSize(10)}>
            Size 10
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem onClick={() => handleChangePageSize(15)}>
            Size 15
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Pagination className="ml-6 border-solid border-gray-400 border-[1px]">
        <PaginationContent>
          {Array.from(
            { length: calculateTotalPages() },
            (_, index) => index + 1
          ).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => setPageIndex(page - 1)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
