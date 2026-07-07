import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import React from "react";

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title={"Dashboard"}
        description={"Welcome to your dashboard"}
      />
    </PageContainer>
  );
}
