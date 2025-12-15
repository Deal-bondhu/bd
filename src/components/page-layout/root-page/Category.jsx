"use client";

import getCategory from "@/actions/category/getCategory";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Category = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isNameHovered, setIsNameHovered] = useState(false);
  const [isDivHovered, setIsDivHovered] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getCategory();
      setCategories(data);
    };
    fetchCategory();
  }, []);

  // show div only if name or div is hovered
  const showDiv = isNameHovered || isDivHovered;

  const handleMouseLeaveName = () => {
    setIsNameHovered(false);
    // only reset hoveredIndex if div also not hovered
    if (!isDivHovered) setHoveredIndex(null);
  };

  const handleMouseLeaveDiv = () => {
    setIsDivHovered(false);
    // only reset hoveredIndex if name also not hovered
    if (!isNameHovered) setHoveredIndex(null);
  };

  return (
    (pathname === "/" || pathname.startsWith("/products")) && (
      <section className="w-full relative">
        <div
          id="trending-component"
          className="w-full shadow-xl px-2 flex lg:justify-center md:justify-start justify-start items-center gap-6 overflow-x-scroll scrollbar-hidden"
        >
          {categories?.map((category, index) => (
            <div
              key={index}
              onClick={() =>
                router.push(`/products/${encodeURIComponent(category.name)}`)
              }
              onMouseEnter={() => {
                setHoveredIndex(index);
                setIsNameHovered(true);
              }}
              onMouseLeave={handleMouseLeaveName}
              className="cursor-pointer py-1"
            >
              {category.name}
            </div>
          ))}
        </div>

        {showDiv && hoveredIndex !== null && (
          <div
            onMouseEnter={() => setIsDivHovered(true)}
            onMouseLeave={handleMouseLeaveDiv}
            className="absolute top-full z-50 bg-base-100 w-full  font-bold p-4 gap-1 place-items-start"
          >
            <div className="w-[80%] mx-auto grid grid-cols-2 gap-y-3">
              {categories[hoveredIndex].subcategories.map((sub, i) => (
                <p
                  onClick={() =>
                    router.push(
                      `/products/${encodeURIComponent(
                        categories[hoveredIndex].name
                      )}?subcategory=${encodeURIComponent(sub)}`
                    )
                  }
                  key={i}
                  className="text-sm font-semibold cursor-pointer hover:text-blue-600"
                >
                  {sub}
                </p>
              ))}
            </div>
          </div>
        )}
      </section>
    )
  );
};

export default Category;
