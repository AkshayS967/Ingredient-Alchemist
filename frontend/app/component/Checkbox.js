import { useCheckbox, Chip, tv } from "@nextui-org/react";

const checkbox = tv({
  slots: {
    base: "rounded bg-default border-default hover:bg-default-200",
    content: "text-default-500",
  },
  variants: {
    isSelected: {
      true: {
        base: "rounded border-black bg-black hover:bg-black-500 hover:border-black-500",
        content: "text-primary-foreground",
      },
    },
  },
});

export default function Checkbox(props) {
  const {
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    defaultSelected: false,
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()} {...props} >
      <input {...getInputProps()} className="hidden"/>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color="default"
        variant="shadow"
        {...getLabelProps()}
      >
        {props.children}
      </Chip>
    </label>
  );
}
