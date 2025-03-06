"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Price ranges
const priceRanges = [
  { min: 0, max: 1000, label: "Under ₹1,000" },
  { min: 1000, max: 5000, label: "₹1,000 - ₹5,000" },
  { min: 5000, max: 10000, label: "₹5,000 - ₹10,000" },
  { min: 10000, max: 20000, label: "₹10,000 - ₹20,000" },
  { min: 20000, max: 50000, label: "₹20,000 - ₹50,000" },
  { min: 50000, max: Number.POSITIVE_INFINITY, label: "Above ₹50,000" },
]

// Categories
const categories = ["Rudraksha", "Mala", "Pendant", "Silver", "Gold", "Bracelet"]

// Mukhi types
const mukhiTypes = ["1 Mukhi", "2 Mukhi", "3 Mukhi", "4 Mukhi", "5 Mukhi", "6 Mukhi", "7 Mukhi", "8 Mukhi", "9 Mukhi"]

// Gender options
const genderOptions = ["Men", "Women", "Unisex"]

// Size ranges
const sizeRanges = ["4mm - 5mm", "5mm - 6mm", "6mm - 7mm", "7mm - 8mm", "8mm - 9mm", "9mm - 10mm"]

// Materials
const materials = ["Rudraksha", "Crystal", "Silver", "Gold", "Copper", "Brass"]

type FilterSidebarProps = {
  filters: {
    category: string[]
    priceRange: [number, number] | null
    mukhi: string[]
    isConsecrated: boolean | null
  }
  onFilterChange: (filters: { category?: string[], priceRange?: [number, number] | null, mukhi?: string[], isConsecrated?: boolean | null }) => void
}

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      onFilterChange({
        category: [...filters.category, category],
      })
    } else {
      onFilterChange({
        category: filters.category.filter((c) => c !== category),
      })
    }
  }

  const handlePriceRangeChange = (range: [number, number]) => {
    onFilterChange({ priceRange: range })
  }

  const handleMukhiChange = (mukhi: string, checked: boolean) => {
    if (checked) {
      onFilterChange({ mukhi: [...filters.mukhi, mukhi] })
    } else {
      onFilterChange({ mukhi: filters.mukhi.filter((m) => m !== mukhi) })
    }
  }

  const handleConsecratedChange = (checked: boolean | "indeterminate") => {
    if (checked === "indeterminate") return
    onFilterChange({ isConsecrated: checked })
  }

  return (
    <div className="border-r w-full pr-4">
      <Accordion type="multiple" defaultValue={["category", "price"]}>
        <AccordionItem value="category" className="border-b">
          <AccordionTrigger className="py-3 text-base font-medium">Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.category.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  />
                  <Label htmlFor={`category-${category}`} className="text-sm font-normal cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price" className="border-b">
          <AccordionTrigger className="py-3 text-base font-medium">Price</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {priceRanges.map((range, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`price-${index}`}
                    checked={filters.priceRange?.[0] === range.min && filters.priceRange?.[1] === range.max}
                    onCheckedChange={(checked) =>
                      handlePriceRangeChange(checked ? [range.min, range.max] : [0, Number.POSITIVE_INFINITY])
                    }
                  />
                  <Label htmlFor={`price-${index}`} className="text-sm font-normal cursor-pointer">
                    {range.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="subcategory" className="border-b">
          <AccordionTrigger className="py-3 text-base font-medium">Sub Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {/* Sub categories would go here */}
              <div className="text-sm text-muted-foreground">No sub-categories available</div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="gender" className="border-b">
          <AccordionTrigger className="py-3 text-base font-medium">Gender</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {genderOptions.map((gender) => (
                <div key={gender} className="flex items-center space-x-2">
                  <Checkbox id={`gender-${gender}`} />
                  <Label htmlFor={`gender-${gender}`} className="text-sm font-normal cursor-pointer">
                    {gender}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mukhi" className="border-b">
          <AccordionTrigger className="py-3 text-base font-medium">Mukhi(Face)</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {mukhiTypes.map((mukhi) => (
                <div key={mukhi} className="flex items-center space-x-2">
                  <Checkbox
                    id={`mukhi-${mukhi}`}
                    checked={filters.mukhi.includes(mukhi)}
                    onCheckedChange={(checked) => handleMukhiChange(mukhi, checked as boolean)}
                  />
                  <Label htmlFor={`mukhi-${mukhi}`} className="text-sm font-normal cursor-pointer">
                    {mukhi}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size" className="border-b">
          <AccordionTrigger className="py-3 text-base font-medium">Size Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {sizeRanges.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox id={`size-${size}`} />
                  <Label htmlFor={`size-${size}`} className="text-sm font-normal cursor-pointer">
                    {size}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="new" className="border-b">
          <AccordionTrigger className="py-3 text-base font-medium">New Arrival</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2">
              <Checkbox id="new-arrival" />
              <Label htmlFor="new-arrival" className="text-sm font-normal cursor-pointer">
                New Arrivals Only
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="material" className="border-b">
          <AccordionTrigger className="py-3 text-base font-medium">Material</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {materials.map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <Checkbox id={`material-${material}`} />
                  <Label htmlFor={`material-${material}`} className="text-sm font-normal cursor-pointer">
                    {material}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="consecrated" className="border-b">
          <AccordionTrigger className="py-3 text-base font-medium">Consecrated</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="consecrated"
                checked={filters.isConsecrated === true}
                onCheckedChange={handleConsecratedChange}
              />
              <Label htmlFor="consecrated" className="text-sm font-normal cursor-pointer">
                Consecrated Items Only
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

