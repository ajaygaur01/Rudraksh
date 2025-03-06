"use client"

import { useState, useEffect } from "react"
import { Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import FilterSidebar from "@/components/filter-sidebar"
import ProductCard from "@/components/ListingCard"


// Filter types
type Filters = {
  category: string[]
  priceRange: [number, number] | null
  mukhi: string[]
  isConsecrated: boolean | null
}

// Sort options
type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc" | "rating-desc"

export default function ProductListing({products} : 
{
    products: Product[]
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [filters, setFilters] = useState<Filters>({
    category: [],
    priceRange: null,
    mukhi: [],
    isConsecrated: null,
  })
  const [sortBy, setSortBy] = useState<SortOption>("name-desc")
  const [gridView, setGridView] = useState<boolean>(true)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products]

    // Apply category filter
    if (filters.category.length > 0) {
    result = result.filter((product: Product) => product.category.some((cat: string) => filters.category.includes(cat)))
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange
      result = result.filter((product) => product.price >= min && product.price <= max)
    }

    // Apply mukhi filter (assuming mukhi is in the name)
    if (filters.mukhi.length > 0) {
      result = result.filter((product) => filters.mukhi.some((mukhi) => product.name.includes(`${mukhi} Mukhi`)))
    }

    // Apply consecrated filter
    if (filters.isConsecrated !== null) {
      result = result.filter((product) => product.isConsecrated === filters.isConsecrated)
    }

    // Apply sorting
    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating)
        break
    }

    setFilteredProducts(result)
  }, [products, filters, sortBy])

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const toggleGridView = (isGrid: boolean) => {
    setGridView(isGrid)
  }

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 bg-white">
      {/* Mobile filter toggle */}
      <div className="md:hidden mb-4">
        <Button variant="outline" onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)} className="w-full">
          {isMobileFilterOpen ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Filter sidebar - hidden on mobile unless toggled */}
      <div className={`${isMobileFilterOpen ? "block" : "hidden"} md:block md:w-64 lg:w-80 flex-shrink-0`}>
        <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
      </div>

      {/* Product listing */}
      <div className="flex-1">
        {/* Sorting and view controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Grid</span>
            <Button
              variant={gridView ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => toggleGridView(true)}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={!gridView ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => toggleGridView(false)}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sort By</span>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name - A to Z</SelectItem>
                <SelectItem value="name-desc">Name - Z to A</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating-desc">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product grid */}
        <div
          className={`grid gap-6 ${
            gridView ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
          }`}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} gridView={gridView} />
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No products found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

