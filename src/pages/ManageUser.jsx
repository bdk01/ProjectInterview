import { PaginationCustom } from "@/components/customize/pagination";
import { TableDemo } from "@/components/customize/table";
import FormUser from "@/components/form/FormUser";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mkConfig, generateCsv, download } from "export-to-csv";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import useDebounce from "@/hooks/useDebounce";
import { useGetUsers } from "@/hooks/userhook";
import { cn } from "@/lib/utils";
import { File, ListFilter, PlusCircle, Search } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import Loading from "react-loading";

function ManageUser() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState([]);
  const [open, setOpen] = useState(false);
  const [filterRole, setfilterRole] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const { data, isLoading } = useGetUsers({
    pageIndex,
    pageSize,
    search: debouncedSearch,
    filterRole,
    sort: formatSortDirections(sort),
  });
  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
    setPageIndex(0);
  }, []);

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data.users);
    download(csvConfig)(csv);
  };
  function formatSortDirections(sortValues) {
    return sortValues.map((sortvalue) => {
      const { key, direction } = sortvalue;

      if (direction === -1) {
        return `-${key}`;
      } else if (direction === 1) {
        return key;
      } else {
        return null;
      }
    });
  }
  const fetchedUsers = data?.users ?? [];
  const totalRowCount = data?.length ?? 1;
  return (
    <main className="grid flex-1 items-start gap-2 p-2 sm:px-8 sm:py-0 md:gap-4">
      <Card className="overflow-hidden" x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <div className="flex relative justify-start items-end flex-row">
            <div className="relative  mt-2 mr-2  ">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                value={search}
                onChange={(e) => handleSearchChange(e)}
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>

            <DropdownMenu className="w-12 h-12 ml-4">
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 w-20 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  className={cn(" ", filterRole == "" ? "bg-gray-100" : "")}
                  onClick={() => setfilterRole("")}
                >
                  None
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  className={cn(
                    " ",
                    filterRole == "admin" ? "bg-gray-100" : ""
                  )}
                  onClick={() => setfilterRole("admin")}
                >
                  Admin
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  className={cn(" ", filterRole == "user" ? "bg-gray-100" : "")}
                  onClick={() => setfilterRole("user")}
                >
                  User
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center h-[100%] justify-center ml-4">
              <div className=" flex items-center ">
                <Button className=" mr-3" onClick={handleExportData}>
                  <File className="h-3.5 w-3.5 mr-2" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <Button className="">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger className="flex justify-center items-center">
                      <PlusCircle className="h-3.5 w-3.5 mr-2" /> Add User
                    </DialogTrigger>
                    <DialogContent className="sm:min-w-[425px] md:min-w-[70%]">
                      <DialogHeader>
                        <DialogTitle>Add User</DialogTitle>
                      </DialogHeader>
                      <FormUser open={open} setOpen={setOpen} type={"add"} />
                    </DialogContent>
                  </Dialog>
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex text-3xl justify-center items-center">
              <Loading
                type={"spin"}
                color={"black"}
                height={"22%"}
                width={"22%"}
              />
            </div>
          ) : (
            <TableDemo
              sort={sort}
              setSort={setSort}
              fetchedUsers={fetchedUsers}
            />
          )}
        </CardContent>

        <PaginationCustom
          totalRowCount={totalRowCount}
          setPageIndex={setPageIndex}
          pageSize={pageSize}
          pageIndex={pageIndex}
          setPageSize={setPageSize}
        ></PaginationCustom>
      </Card>
    </main>
  );
}

export default ManageUser;
