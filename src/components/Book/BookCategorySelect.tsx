import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "@/components/ui/badge";

const bookCategories = [
  "Fiction",
  "Non-fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Science Fiction",
  "Fantasy",
  "Historical Fiction",
  "Biography",
  "Memoir",
  "Self-Help",
  "Business",
  "Education",
  "Children's Books",
  "Young Adult",
  "Cookbook",
  "Travel",
  "Art",
  "Music",
  "Poetry",
];

type BookCategorySelectProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

function BookCategorySelect({ value, onChange }: BookCategorySelectProps) {
  const [categories, setCategories] = useState<string[]>(bookCategories);
  const [newCategory, setNewCategory] = useState<string>("");

  useEffect(() => {
    if (value.length > 0) {
        const exclusiveCategories = value.filter((c) => !categories.includes(c));
        if (exclusiveCategories.length > 0) {
            setCategories([...categories, ...exclusiveCategories]);
        }
    }
  }, []);

  const createCategory = () => {
    if (newCategory) {
      setCategories([...categories, newCategory]);
      onChange([...value, newCategory]);
      setNewCategory("");
    }
  };

  const deleteCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category));
    onChange(value.filter((c) => c !== category));
  };

  const isSelected = (category: string) => {
    return value.includes(category);
  };

  const selectCategory = (category: string) => {
    onChange([...value, category]);
  };

  const removeCategory = (category: string) => {
    onChange(value.filter((c) => c !== category));
  };

  return (
    <div>
      <Input
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            createCategory();
          }
        }}
      />
      <div className="flex flex-wrap gap-1 mt-3">
        {categories.sort((a,b) => (
            a.toLowerCase() > b.toLowerCase() ? 1 : -1
        )).map((category) => (
          <Badge
            key={category}
            className="cursor-pointer"
            onClick={() => {
              if (isSelected(category)) {
                removeCategory(category);
              } else {
                selectCategory(category);
              }
            }}
            variant={isSelected(category) ? "default" : "outline"}
          >
            {category}
            <span className="ml-2">{isSelected(category) ? "-" : "+"}</span>
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default BookCategorySelect;
