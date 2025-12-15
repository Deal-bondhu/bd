"use client";

import imageUpload from "@/lib/imageUpload";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";

const AllBanners = () => {
  const [banners, setBanners] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      const res = await fetch("http://localhost:5000/banners");
      const data = await res.json();
      setBanners(data);
    };
    fetchBanners();
  }, [refresh]);

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/delete_banner/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (result.acknowledged === true) {
      toast.success("Banner Removed");
      setRefresh(!refresh);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const target = e.target;

    const company = target.company.value;
    const photoFile = target.banner_image.files[0];
    const image = await imageUpload(photoFile);
    if (image) {
      const object = {
        company: company,
        banner_link: image?.data.url,
      };

      const res = await fetch("http://localhost:5000/upload_banner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });

      const result = await res.json();
      if (result.acknowledged === true) {
        toast.success("Banner Added");
        target.reset();
        setRefresh(!refresh);
        return;
      }
    }
  };
  return (
    <div className="w-full">
      {banners?.length === 0 ? (
        <p className="text-2xl font-semibold text-center">
          No Banners Available
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Company</th>
                <th className="text-center">Delete</th>
                <th>Banner Link</th>
              </tr>
            </thead>
            <tbody>
              {banners?.map((banner, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{banner?.company}</td>
                    <td>
                      <div
                        onClick={() => handleDelete(banner?._id)}
                        className="flex justify-center hover:cursor-pointer"
                      >
                        <GoTrash />
                      </div>
                    </td>
                    <td>
                      <div className="line-clamp-2">{banner?.banner_link}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-10">
        <p className=" text-xl">Upload New Banner</p>
        <form onSubmit={handleForm} className="flex flex-col gap-1 ">
          <label htmlFor="" className="label my-1">
            Company
          </label>
          <input
            type="text"
            className="input input-sm"
            name="company"
            required
          />
          <label htmlFor="" className="label my-1">
            Banner Image
          </label>
          <input
            required
            type="file"
            name="banner_image"
            className="file-input file-input-md"
          />
          <button className="btn btn-sm w-fit">Add New</button>
        </form>
      </div>
    </div>
  );
};

export default AllBanners;
