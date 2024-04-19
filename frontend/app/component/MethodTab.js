"use client";
import { useRecipeAPI } from "../RecipeAPI";
import { Tabs, Tab } from "@nextui-org/react";

function MethodTab() {
  const { method, setMethod } = useRecipeAPI();
  return (
    <Tabs selectedKey={method} onSelectionChange={setMethod}>
      <Tab key="1" title="Apriori"></Tab>
      <Tab key="2" title="Vector DB"></Tab>
      <Tab key="3" title="Gen AI"></Tab>
    </Tabs>
  );
}

export default MethodTab;
