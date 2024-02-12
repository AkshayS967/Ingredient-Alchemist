import { Accordion, AccordionItem } from "@nextui-org/react";
import {ScrollShadow} from "@nextui-org/react";
import Image from "next/image";

export default function Sidebar({ children, category }) {
  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };
  return (
    <ScrollShadow className="h-[44rem] overflow-scroll p-1 rounded-2xl">
      <Accordion
        showDivider={false}
        defaultExpandedKeys={["1", "2"]}
        className="p-2 flex flex-col gap-1 w-full"
        variant="shadow"
        itemClasses={itemClasses}
      >
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          startContent={
            <Image src="/fruits.png" width={30} height={30} alt="fruit" />
          }
          title={category[0]}
          keepContentMounted
        >
          <div className="flex flex-wrap">{children[0]}</div>
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Accordion 1"
          startContent={
            <Image
              src="/vegetables.png"
              width={30}
              height={30}
              alt="vegetables"
            />
          }
          title={category[1]}
          keepContentMounted
        >
          <div className="flex flex-wrap">{children[1]}</div>
        </AccordionItem>
      </Accordion>
    </ScrollShadow>
  );
}
