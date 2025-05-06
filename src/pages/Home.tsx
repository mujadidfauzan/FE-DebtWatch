import React from "react";
import SummaryCard from "../components/SummaryCard";
import Tabs from "../components/Tabs";
import TransactionItem from "../components/TransactionItem";
import UserProfile from "../components/UserProfile";
import NavigationBar from "../components/NavigationBar";

export default function Dashboard() {
  const income = 100000;
  const expenses = 30000;
  const balance = income - expenses;
  const progressPercentage = (expenses / income) * 100;

  return (
    <div className="relative min-h-screen">
      {/* Layer biru: latar belakang */}
      <div className="absolute inset-0 bg-gradient-to-b from-app-blue to-blue-600 z-0" />

      {/* Konten utama */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="p-4">
          {/* Profil User */}
          <div className="mb-6">
            <UserProfile />
          </div>

          {/* Summary */}
          <div className="bg-blue-700 text-white rounded-xl p-4 z-10 relative">
            <div className="flex justify-between items-center text-sm mb-4">
              {/* Incomes */}
              <div className="flex-1">
                <div className="flex items-center gap-1 text-white/80 text-xs">
                  <span className="text-yellow-400">↗️</span>
                  <p>Total Incomes</p>
                </div>
                <p className="text-2xl font-bold">
                  Rp {income.toLocaleString("id-ID")}
                </p>
              </div>

              {/* Separator */}
              <div className="h-8 w-px bg-white/40 mx-2" />

              {/* Expenses */}
              <div className="flex-1 text-right">
                <div className="flex justify-end items-center gap-1 text-white/80 text-xs">
                  <span className="text-yellow-400">↘️</span>
                  <p>Total Expenses</p>
                </div>
                <p className="text-2xl font-bold text-yellow-300">
                  Rp {expenses.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-2 bg-white rounded-full h-6 flex items-center ">
              <div
                className="bg-black text-white text-xs h-6 rounded-full flex items-center justify-center "
                style={{ width: `${progressPercentage}%`, minWidth: "3rem" }}
              >
                {Math.round(progressPercentage)}%
              </div>
              <div className="flex-1 text-right text-black text-xs pr-2 font-medium">
                Balance: Rp {balance.toLocaleString("id-ID")}
              </div>
            </div>
          </div>
        </div>

        {/* Area putih hingga bawah */}
        <div className="bg-white rounded-t-3xl p-4 flex-1 -mt-6 z-10 relative">
          <SummaryCard />

          <div className="mt-4">
            <Tabs />
          </div>

          <div className="space-y-4 mt-4 pb-24">
            <TransactionItem
              icon="💼"
              title="Salary"
              time="18:27 - April 30"
              category="Monthly"
              amount="$4.000,00"
              positive
            />
            <TransactionItem
              icon="🛒"
              title="Groceries"
              time="17:00 - April 24"
              category="Pantry"
              amount="-$100,00"
            />
            <TransactionItem
              icon="🏠"
              title="Rent"
              time="8:30 - April 15"
              category="Rent"
              amount="-$674,40"
            />
          </div>
        </div>
      </div>

      {/* Navbar selalu di paling atas */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <NavigationBar />
      </div>
    </div>
  );
}
