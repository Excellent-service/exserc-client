import { Dispatch, SetStateAction } from "react";

export interface TreeNode {
    id: number;
    name: string;
    // parentId: number;
    subcategories?: TreeNode[];
    services?: TreeNode[];
}
  
export interface TreeDropdownProps {
    data: TreeNode[];
}
  
export interface DropdownProps {
    setSelected: Dispatch<SetStateAction<string>>;
    selected: string;
}
  
export interface ListProps {
    items: TreeNode[];
    setSelected: Dispatch<SetStateAction<string>>;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface ListItemProps {
    item: TreeNode;
    setSelected: Dispatch<SetStateAction<string>>;
    setOpen: Dispatch<SetStateAction<boolean>>;
  }
  