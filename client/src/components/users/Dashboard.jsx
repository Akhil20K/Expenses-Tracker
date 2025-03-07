import React from "react";
import TransactionChart from "../transactions/TransactionChart";
import FilterSection from "../transactions/FilterSection";

const Dashboard = () => {
  return (
    <>
      <TransactionChart />
      <FilterSection />
    </>
  );
};

export default Dashboard;