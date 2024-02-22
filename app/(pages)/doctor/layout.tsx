"use client";
import { SidebarNavigation } from "@/components/sidebar-navigation";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarNavigation />
    </>
  );
}
