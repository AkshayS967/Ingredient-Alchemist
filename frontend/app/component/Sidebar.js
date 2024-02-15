import { Accordion, AccordionItem } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/react";
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
        defaultExpandedKeys={category.map((_, index) => index.toString())}
        className="p-2 flex flex-col gap-1 w-full"
        variant="shadow"
        itemClasses={itemClasses}
      >
        {category.map((name, index) => (
          <AccordionItem
            key={index}
            startContent={
              <Image src={`/${name}.png`} width={30} height={30} alt={name} />
            }
            title={name}
            keepContentMounted
          >
            <div className="flex flex-wrap">{children[index]}</div>
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollShadow>
  );
}
