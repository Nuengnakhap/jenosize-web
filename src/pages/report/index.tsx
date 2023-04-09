import CalendarBar from "@/components/report/CalendarBar";
import Navbar from "@/components/report/Navbar";
import TabBarLayout from "@/components/report/TabBarLayout";
import EngagementScene from "@/components/report/engagement/EngagementScene";
import React from "react";

export default function index() {
  const renderComponent = () => {
    return (
      <div>
        <CalendarBar />
        <div className="engagement-container">sdsds</div>
      </div>
    );
  };

  const renderScene = {
    submission: <EngagementScene />,
    engagement: <EngagementScene />,
  };

  return (
    <div id="report">
      <Navbar />
      <TabBarLayout
        routes={[
          { key: "submission", title: "Submission" },
          { key: "engagement", title: "Engagement" },
        ]}
        renderScene={renderScene}
      />
    </div>
  );
}
