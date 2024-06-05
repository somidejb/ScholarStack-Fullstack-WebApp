import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ICategory } from "@/lib/mongodb/database/models/category.model"
import { useEffect, useState } from "react"
import { getAllCategories } from "@/lib/actions/category.actions"

type DropdownProps = {
  value?: string
  onChangeHandler?: () => void
}

// Function to convert a string to title case
const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
}

const CategoryDropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([])

  useEffect(() => {
      const getCategories = async () => {
          const categoryList = await getAllCategories();
          console.log(categoryList);

          if (categoryList) {
              // Convert category names to title case
              const titleCasedCategories = categoryList.map((category: ICategory) => ({
                  ...category,
                  name: toTitleCase(category.name)
              }));
              setCategories(titleCasedCategories);
          }
      }

      getCategories();
  }, [])

  return (
      <Select onValueChange={onChangeHandler} defaultValue={value}>
          <SelectTrigger className="select-field">
              <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent>
              {categories.length > 0 && categories.map((category) => (
                  <SelectItem key={category._id} value={category._id} className="select-item p-regular-14">
                      {category.name}
                  </SelectItem>
              ))}
          </SelectContent>
      </Select>
  )
}

export default CategoryDropdown
