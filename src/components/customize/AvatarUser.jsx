import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Loading from "react-loading";

export default function AvatarUser({ user, avatarUser, setAvatarUser }) {
  const [loading,setLoading] = useState(false)
  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file) return alert("file is not exist!");
      if (file.size > 1024 * 1024) return alert("Size is too large");
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("File is not the image");

      let formData = new FormData();

      formData.append("file", e.target.files[0]);
      setLoading(true)
      const { data } = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
     

      setAvatarUser(data.url);
    } catch (err) {
      alert(err.respone.data.msg);
    }finally{
      setLoading(false)
    }
  };
  return (
    <div>
      <div className="w-[90%]">
        {
          loading ? 
          <div className="flex justify-center m-4 items-center">

            <Loading type={'spin'} color={'black'} height={'20%'} width={'20%'} /> : 
          </div>
          :
          <img
            src={avatarUser ? avatarUser : user.avatar}
            alt="avatar"
            className="mb-2"
          />
        }
        <Button className="w-[100%]">
          <Input
            type="file"
            className="bg-transparent w-[100%] border-none"
            name="file"
            id="file_up"
            accept="image/*"
            onChange={changeAvatar}
          />
        </Button>
      </div>
    </div>
  );
}
