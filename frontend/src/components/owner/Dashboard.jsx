import React, { useEffect } from "react";
import { assets } from "../../assets/assets";
import Title from "../Title";
import { useSelector, useDispatch } from "react-redux";
import { fetchingAdminStats } from "../../Redux/Features/AdminStatsSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { adminStats, loading } = useSelector((state) => state.dashboardData);

  const currency = import.meta.env.VITE_CURRENCY;

  useEffect(() => {
    dispatch(fetchingAdminStats());
  }, [dispatch]);

  const dashboardCards = [
    {
      title: "Total Cars",
      value: adminStats?.totalCars ?? 0,
      icon: assets.carIconColored,
    },
    {
      title: "Total Bookings",
      value: adminStats?.totalBookings ?? 0,
      icon: assets.listIconColored,
    },
    {
      title: "Pending",
      value: adminStats?.pending ?? 0,
      icon: assets.cautionIconColored,
    },
    {
      title: "Confirmed",
      value: adminStats?.confirmed ?? 0,
      icon: assets.listIconColored,
    },
  ];

  const latestRevenue =
    adminStats?.monthlyRevenue?.length > 0
      ? adminStats.monthlyRevenue[0].totalRevenue
      : 0;

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <Title
        title="Admin Dashboard"
        subtitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
      />

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
        {!loading &&
          dashboardCards.map((card, index) => (
            <div
              key={index}
              className="flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor"
            >
              <div>
                <h1 className="text-xs text-gray-500">{card.title}</h1>
                <p className="text-lg font-semibold">{card.value}</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <img src={card.icon} alt="" className="h-4 w-4" />
              </div>
            </div>
          ))}
      </div>

      {/* Bookings + Revenue */}
      <div className="flex flex-wrap items-start gap-6 mb-8 w-full">
        {/* Recent Bookings */}
        <div className="p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full">
          <h1 className="text-lg font-medium">Recent Bookings</h1>
          <p className="text-gray-500">Latest customer bookings</p>

          {adminStats?.latestBookings?.length > 0 ? (
            adminStats.latestBookings.map((booking, index) => (
              <div
                key={index}
                className="mt-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                    <img
                      src={assets.listIconColored}
                      alt=""
                      className="h-5 w-5"
                    />
                  </div>
                  <div>
                    <p>
                      {booking.car?.brand} {booking.car?.model}
                    </p>
                    <p className="text-sm text-gray-500">
                      {booking.createdAt?.split("T")[0]}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <p className="text-sm text-gray-500">
                    {currency}
                    {booking.price}
                  </p>
                  <p className="px-3 py-0.5 border border-borderColor rounded-full text-sm capitalize">
                    {booking.status}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="mt-4 text-sm text-gray-400">
              No recent bookings yet.
            </p>
          )}
        </div>

        {/* Monthly Revenue */}
        <div className="p-4 md:p-6 mb-6 border border-borderColor rounded-md w-full md:max-w-xs">
          <h1 className="text-lg font-medium">Monthly Revenue</h1>
          <p className="text-gray-500">Revenue for current month</p>
          <p className="text-3xl mt-6 font-semibold text-primary">
            {currency} {latestRevenue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
