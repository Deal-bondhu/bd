
import DashboardSideBar from "@/components/page-layout/dashboard-page/DashboardSideBar";

const page = async ({ searchParams }) => {
  // const query = await searchParams;

  // const search =
  //   query?.search?.trim().replace(/\s+/g, "").toLowerCase() || "all";

  // const date = query?.date;

  // const response = await fetch(
  //   `http://localhost:5000/clicked_user_data?search=${search}`
  // );
  // const data = await response.json();

  return (
    
    <DashboardSideBar></DashboardSideBar>
  );
};

export default page;
