import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";

import { z } from "zod";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import AvatarUser from "../customize/AvatarUser";
import { useCreateUser, useUpdateUser } from "@/hooks/userhook";
import { DialogClose } from "../ui/dialog";
const schema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number must be 10 digits"),
    role: z.string(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function FormUser({ open, setOpen, type, user = {} }) {
  const { mutateAsync: createUser } = useCreateUser();
  const { mutateAsync: updateUser } = useUpdateUser();

  const [avatarUser, setAvatarUser] = useState(
    "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
  );

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (type === "edit") {
      Object.entries(user).forEach(([key, value]) => {
        form.setValue(key, value);
        if (key == "password") {
          form.setValue("confirmPassword", value);
          form.setValue("password", value);
        }
      });

      setAvatarUser(user.avatar);
    }
  }, []);

  const onSubmit = async (data) => {
    if (type == "add") {
      const result = await createUser({ avatar: avatarUser, ...data });
      console.log(result.msg);
      if (result.msg == "Create user success") {
        setOpen(false);
        form.reset();

      }else{
        alert('wrong type')
      }
    } else {
      const result = await updateUser({
        avatar: avatarUser,
        _id: user._id,
        ...data,
      });
      console.log(result);
      if (result.msg == "Update Success!") {
     
        alert('update success')
        form.reset();

      }else{
        alert('wrong type')
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-1">
            <div className="text-l font-semibold mb-1">User Detail</div>
            <FormField
              control={form.control}
              className="col-span-2"
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              className="col-span-2"
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PhoneNumber</FormLabel>
                  <FormControl>
                    <Input placeholder="phoneNumber" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              className="col-span-2"
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>FirstName</FormLabel>
                  <FormControl>
                    <Input placeholder="firstName" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              className="col-span-2"
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LastName</FormLabel>
                  <FormControl>
                    <Input placeholder="lastName" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              className="col-span-2"
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="user">user</SelectItem>
                      <SelectItem value="admin">admin</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            {type === "add" && (
              <>
                <FormField
                  control={form.control}
                  className="col-span-2"
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  className="col-span-2"
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ConfirmPassword</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="confirmPassword"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <div className="col-span-1">
            <div className="text-l font-semibold mb-1">Avatar</div>
            <AvatarUser
              user={user}
              avatarUser={avatarUser}
              form={form}
              control={form.control}
              setAvatarUser={setAvatarUser}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <DialogClose asChild>
            <Button type="button" className="mr-2">
              Close
            </Button>
          </DialogClose>
          {/*    <DialogClose asChild> */}
          <Button type="submit">Submit</Button>
          {/*   </DialogClose > */}
        </div>
      </form>
    </Form>
  );
}
