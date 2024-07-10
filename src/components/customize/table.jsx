import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ArrowDownNarrowWide,
  ArrowDownUp,
  ArrowUpNarrowWide,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import FormUser from "../form/FormUser";
import { useDeleteUser } from "@/hooks/userhook";
import { useCallback, useState } from "react";

let tableColumnName = [
  {
    columnName: "Email",
    field: "email",
    haveSort: false,
    index: 1,
  },
  {
    columnName: "Phone Number",
    field: "phoneNumber",
    haveSort: false,
    index: 2,
  },
  {
    columnName: "First Name",
    field: "firstName",
    haveSort: true,
    index: 3,
  },
  {
    columnName: "Last Name",
    field: "lastName",
    haveSort: true,
    index: 4,
  },
  {
    columnName: "Role",
    field: "role",
    haveSort: true,

    index: 5,
  },

  {
    columnName: "Action",
    field: "action",
    haveSort: false,

    index: 6,
  },
];
export function TableDemo({ sort, setSort, fetchedUsers }) {
  const [opened, setOpened] = useState(false);
  const { mutateAsync: deleteUser } = useDeleteUser();
  const onSort = useCallback((key) => {
    setSort((prevSortConfig) => {
      if (prevSortConfig.length > 0 && prevSortConfig[0].key === key) {
        const currentDirection = prevSortConfig[0].direction;
        if (currentDirection === 1) {
          return [{ key, direction: -1 }];
        } else {
          return [];
        }
      } else {
        return [{ key, direction: 1 }];
      }
    });
  }, []);

  return (
    <Table className="mt-3">
      <TableHeader>
        <TableRow>
          {tableColumnName.map((column) => (
            <TableHead key={column.index}>
              <TableHeader className="flex items-center">
                {column.columnName}
                {/* sort.key !== column.field && */}
                {column.haveSort &&
                  (sort.length == 0 || sort[0]?.key !== column.field) && (
                    <ArrowDownUp
                      className="ml-1 h-4 w-4"
                      onClick={() => onSort(column.field)}
                    />
                  )}
                {column.haveSort &&
                  sort.length > 0 &&
                  sort[0]?.key == column.field &&
                  (sort[0].direction == 1 ? (
                    <ArrowDownNarrowWide
                      className="ml-1 h-4 w-4"
                      onClick={() => onSort(column.field)}
                    />
                  ) : (
                    <ArrowUpNarrowWide
                      className="ml-1 h-4 w-4"
                      onClick={() => onSort(column.field)}
                    />
                  ))}
              </TableHeader>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {fetchedUsers?.length > 0 ? (
          fetchedUsers?.map((user) => (
            <TableRow key={user?._id}>
              <TableCell className="font-medium">{user?.email}</TableCell>
              <TableCell>{user?.phoneNumber}</TableCell>
              <TableCell>{user?.firstName}</TableCell>
              <TableCell>{user?.lastName}</TableCell>
              <TableCell className="text-right">{user?.role}</TableCell>
              <TableCell className="flex justify-center">
                {/*  <Button className="bg-blue-500 hover:bg-blue-600 mr-2"> Edit</Button> */}
                <Button className="bg-blue-700 px-5 hover:bg-blue-600 mr-2 ">
                  <Dialog /* open={opened} onOpenChange={setOpened} */>
                    <DialogTrigger className=" flex justify-center items-center">
                      Edit
                    </DialogTrigger>
                    <DialogContent className="sm:min-w-[425px] md:min-w-[70%]">
                      <DialogHeader>
                        <DialogTitle>Edit</DialogTitle>
                      </DialogHeader>
                      <FormUser
                      /*   open={opened}
                        setOpen={()=>setOpened} */
                        type={"edit"}
                        user={user}
                      />
                    </DialogContent>
                  </Dialog>
                </Button>
                <Button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-500 hover:bg-red-600 "
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <div>No data</div>
        )}
      </TableBody>
    </Table>
  );
}
