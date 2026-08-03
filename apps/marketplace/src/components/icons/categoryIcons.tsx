import { ComponentType } from "react";
import { AccessoryIcon, AllCategoriesIcon, BagIcon, DressIcon, IconProps, ShoeIcon } from "./icons";

const ROOT_CATEGORY_ICONS: Record<string, ComponentType<IconProps>> = {
  clothing: DressIcon,
  shoes: ShoeIcon,
  bags: BagIcon,
  accessories: AccessoryIcon,
};

export function categoryIcon(rootCategoryId: string): ComponentType<IconProps> {
  return ROOT_CATEGORY_ICONS[rootCategoryId] ?? AllCategoriesIcon;
}
