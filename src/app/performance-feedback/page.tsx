"use client";
import { useState, useMemo, useCallback, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils";
import { ShoppingCart, PlusCircle, XCircle } from "lucide-react";
// import { Badge } from "@/components/ui/badge"; // Removed problematic import
import { motion, AnimatePresence } from "framer-motion";

type Product = {
    category: string;
    price: string;
    stocked: boolean;
    name: string;
};

type CartItem = {
    product: Product;
    quantity: number;
};

type Props = {
    products: Product[];
};

const CartItemComponent = ({
    item,
    onRemove,
    onQuantityChange
}: {
    item: CartItem,
    onRemove: (productName: string) => void,
    onQuantityChange: (productName: string, quantity: number) => void
}) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center justify-between py-2 border-b border-gray-200 last:border-none"
        >
            <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">{item.product.name}</span>
                <div className="flex items-center space-x-2">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => onQuantityChange(item.product.name, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                    >
                        -
                    </Button>
                    <span className="text-sm">{item.quantity}</span>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => onQuantityChange(item.product.name, item.quantity + 1)}
                    >
                        +
                    </Button>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">${(parseFloat(item.product.price.slice(1)) * item.quantity).toFixed(2)}</span>
                <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                    onClick={() => onRemove(item.product.name)}
                >
                    <XCircle className="h-4 w-4" />
                </Button>
            </div>
        </motion.div>
    );
};

function FilterableProductTable({ products }: Props) {
    const [filterText, setFilterText] = useState("");
    const [inStockOnly, setInStockOnly] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const cartTotal = useMemo(() => {
        return cart.reduce((total, item) => {
            const itemTotal = parseFloat(item.product.price.slice(1)) * item.quantity;
            return total + itemTotal;
        }, 0).toFixed(2);
    }, [cart]);

    const allCategories = useMemo(() => {
        const uniqueCategories = new Set<string>();
        uniqueCategories.add("All");
        products.forEach((product) => uniqueCategories.add(product.category));
        return Array.from(uniqueCategories);
    }, [products]);


    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesText = product.name
                .toLowerCase()
                .includes(filterText.toLowerCase());
            const matchesStock = inStockOnly ? product.stocked : true;
            const matchesCategory =
                selectedCategory === "All" || product.category === selectedCategory;
            return matchesText && matchesStock && matchesCategory;
        });
    }, [filterText, inStockOnly, selectedCategory, products]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const exportToExcel = () => {
        const grouped = filteredProducts.reduce((acc: Record<string, Product[]>, product) => {
            if (!acc[product.category]) acc[product.category] = [];
            acc[product.category].push(product);
            return acc;
        }, {});

        const data: unknown[] = [];

        Object.entries(grouped).forEach(([category, items]) => {
            data.push({ Category: category });
            data.push({ Name: "Name", Stock: "Stocked", Price: "Price" });

            items.forEach((p) => {
                data.push({
                    Name: p.name,
                    Stock: p.stocked ? "Yes" : "No",
                    Price: p.price,
                });
            });
            data.push({});
        });

        const ws = XLSX.utils.json_to_sheet(data, { skipHeader: true });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Products");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
        saveAs(blob, "products.xlsx");
    };

    const addToCart = useCallback((product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.product.name === product.name);
            if (existingItem) {
                return prevCart.map(item =>
                    item.product.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { product, quantity: 1 }];
            }
        });
    }, []);

    const removeFromCart = useCallback((productName: string) => {
        setCart(prevCart => prevCart.filter(item => item.product.name !== productName));
    }, []);

    const changeQuantity = useCallback((productName: string, quantity: number) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.product.name === productName ? { ...item, quantity } : item
            )
        );
    }, []);

     // Reset to first page when category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Main Content */}
            <div className="flex-1 space-y-6 p-4 md:ml-0">
                <SearchBar
                    filterText={filterText}
                    inStockOnly={inStockOnly}
                    onFilterTextChange={setFilterText}
                    onInStockOnlyChange={setInStockOnly}
                    categories={allCategories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />
                <Button
                    onClick={exportToExcel}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 data-[testid=export-excel-button]"
                >
                    Export to Excel
                </Button>
                <ProductTable products={paginatedProducts} onAddToCart={addToCart} />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

            {/* Cart Sidebar */}
            <div
                className={cn(
                    "fixed md:absolute bottom-4 right-4 z-50",
                    "transition-all duration-300",
                    isCartOpen ? "w-80 h-auto" : "w-16 h-16",
                    "bg-white shadow-lg rounded-lg overflow-hidden",
                    "flex flex-col",
                    "border border-gray-200"
                )}
            >
                <div
                    className="flex items-center justify-between p-4 cursor-pointer"
                    onClick={() => setIsCartOpen(!isCartOpen)}
                >
                    <div className="flex items-center space-x-2">
                        <ShoppingCart className="h-6 w-6 text-blue-500" />
                        {isCartOpen && <span className="text-lg font-semibold">Your Cart</span>}
                    </div>
                    {/* Replaced problematic Badge with simple div */}
                    {cart.length > 0 && (
                        <div className="absolute top-1 right-1 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                            {cart.length}
                        </div>
                    )}
                </div>
                <AnimatePresence>
                    {isCartOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-4 overflow-y-auto max-h-[calc(100vh-12rem)]"
                        >
                            {cart.length === 0 ? (
                                <p className="text-sm text-gray-500">Your cart is empty.</p>
                            ) : (
                                <>
                                    {cart.map(item => (
                                        <CartItemComponent
                                            key={item.product.name}
                                            item={item}
                                            onRemove={removeFromCart}
                                            onQuantityChange={changeQuantity}
                                        />
                                    ))}
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Total:</span>
                                            <span className="text-lg font-bold">${cartTotal}</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function SearchBar({
    filterText,
    inStockOnly,
    onFilterTextChange,
    onInStockOnlyChange,
    categories,
    selectedCategory,
    onCategoryChange,
}: {
    filterText: string;
    inStockOnly: boolean;
    onFilterTextChange: (value: string) => void;
    onInStockOnlyChange: (value: boolean) => void;
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (value: string) => void;
}) {
    return (
        <form className="space-y-4">
            <Input
                type="text"
                placeholder="Search..."
                value={filterText}
                onChange={(e) => onFilterTextChange(e.target.value)}
                className="w-full"
                data-testid="search-input"
            />
            <div className="flex items-center space-x-2">
                <input
                    id="stock-only"
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => onInStockOnlyChange(e.target.checked)}
                    className="h-4 w-4 text-blue-600 data-[testid=stock-only-checkbox]"
                />
                <Label htmlFor="stock-only" className="text-sm">
                    Only show products in stock
                </Label>
            </div>
            <div>
                <Label htmlFor="category-filter" className="block text-sm font-medium text-gray-700">Category</Label>
                <Select
                    value={selectedCategory}
                    onValueChange={onCategoryChange}
                >
                    <SelectTrigger className="w-full data-[testid=category-filter-dropdown]">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </form>
    );
}

function ProductTable({ products, onAddToCart }: { products: Product[], onAddToCart: (product: Product) => void }) {
    const rows: React.ReactNode[] = [];
    let lastCategory: string | null = null;

    products.forEach((product) => {
        if (product.category !== lastCategory) {
            // rows.push(
            //     <ProductCategoryRow key={`cat-${product.category}`} category={product.category} />
            // );
        }
        rows.push(
            <ProductRow
                key={`${product.category}-${product.name}-${product.price}`}
                product={product}
                onAddToCart={onAddToCart}
            />
        );
        lastCategory = product.category;
    });

    return (
        <Table data-testid="product-table">
            <TableHeader>
                <TableRow data-testid="table-header-row">
                    <TableHead data-testid="header-name">Name</TableHead>
                    <TableHead data-testid="header-price">Price</TableHead>
                    <TableHead data-testid="header-action">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>{rows}</TableBody>
        </Table>
    );
}

function ProductCategoryRow({ category }: { category: string }) {
    return (
        <TableRow>
            <TableHead colSpan={2} className="bg-blue-100 text-blue-800 p-2 text-left">
                {category}
            </TableHead>
        </TableRow>
    );
}

function ProductRow({ product, onAddToCart }: { product: Product, onAddToCart: (product: Product) => void }) {
    const name = product.stocked ? (
        product.name
    ) : (
        <span className="text-red-500">{product.name}</span>
    );

    return (
        <TableRow className="hover:bg-gray-50">
            <TableCell className="p-2">{name}</TableCell>
            <TableCell className="p-2">{product.price}</TableCell>
            <TableCell className="p-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAddToCart(product)}
                    className="data-[testid=add-to-cart-button]"
                >
                    <PlusCircle className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
            </TableCell>
        </TableRow>
    );
}

function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center mt-4 space-x-2">
            <Button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="data-[testid=prev-page-button]"
            >
                Previous
            </Button>
            {pageNumbers.map((number) => (
                <Button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={cn(
                        "px-3 py-1 rounded",
                        currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200",
                        `data-[testid=page-number-${number}]`
                    )}
                >
                    {number}
                </Button>
            ))}
            <Button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="data-[testid=next-page-button]"
            >
                Next
            </Button>
        </div>
    );
}

// Demo product list
const PRODUCTS: Product[] = [
    { category: "Fruits", price: "$7", stocked: false, name: "Apple 80" },
    { category: "Fruits", price: "$13", stocked: false, name: "Apple 98" },
    { category: "Fruits", price: "$11", stocked: false, name: "Apple 31" },
    { category: "Dairy", price: "$19", stocked: true, name: "Yogurt 46" },
    { category: "Dairy", price: "$19", stocked: false, name: "Yogurt 81" },
    { category: "Beverages", price: "$4", stocked: true, name: "Tea 80" },
    { category: "Bakery", price: "$5", stocked: true, name: "Croissant 46" },
    { category: "Dairy", price: "$15", stocked: false, name: "Cream 49" },
    { category: "Dairy", price: "$18", stocked: true, name: "Yogurt 87" },
    { category: "Bakery", price: "$6", stocked: false, name: "Bun 80" },
    { category: "Dairy", price: "$8", stocked: true, name: "Cream 43" },
    { category: "Beverages", price: "$8", stocked: true, name: "Water 71" },
    { category: "Fruits", price: "$3", stocked: true, name: "Dragonfruit 14" },
    { category: "Seafood", price: "$16", stocked: true, name: "Lobster 73" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Cucumber 40" },
    { category: "Fruits", price: "$12", stocked: false, name: "Banana 26" },
    { category: "Dairy", price: "$19", stocked: false, name: "Butter 35" },
    { category: "Dairy", price: "$15", stocked: false, name: "Cream 90" },
    { category: "Fruits", price: "$15", stocked: true, name: "Dragonfruit 25" },
    { category: "Meat", price: "$15", stocked: true, name: "Lamb 16" },
    { category: "Meat", price: "$14", stocked: false, name: "Chicken 61" },
    { category: "Dairy", price: "$11", stocked: true, name: "Cheese 88" },
    { category: "Fruits", price: "$10", stocked: false, name: "Dragonfruit 32" },
    { category: "Beverages", price: "$12", stocked: true, name: "Milkshake 45" },
    { category: "Bakery", price: "$3", stocked: false, name: "Bagel 12" },
    { category: "Vegetables", price: "$17", stocked: false, name: "Spinach 45" },
    { category: "Beverages", price: "$3", stocked: false, name: "Juice 48" },
    { category: "Dairy", price: "$2", stocked: true, name: "Butter 39" },
    { category: "Meat", price: "$16", stocked: true, name: "Turkey 64" },
    { category: "Dairy", price: "$13", stocked: false, name: "Cream 30" },
    { category: "Fruits", price: "$13", stocked: false, name: "Peach 54" },
    { category: "Dairy", price: "$9", stocked: true, name: "Yogurt 18" },
    { category: "Vegetables", price: "$7", stocked: true, name: "Tomato 9" },
    { category: "Snacks", price: "$11", stocked: false, name: "Chocolate 67" },
    { category: "Snacks", price: "$20", stocked: false, name: "Nuts 70" },
    { category: "Dairy", price: "$9", stocked: true, name: "Cottage Cheese 38" },
    { category: "Snacks", price: "$7", stocked: false, name: "Crackers 64" },
    { category: "Snacks", price: "$11", stocked: true, name: "Nuts 43" },
    { category: "Fruits", price: "$18", stocked: false, name: "Grapes 20" },
    { category: "Fruits", price: "$6", stocked: false, name: "Peach 60" },
    { category: "Bakery", price: "$1", stocked: true, name: "Croissant 59" },
    { category: "Vegetables", price: "$13", stocked: true, name: "Onion 4" },
    { category: "Fruits", price: "$9", stocked: true, name: "Pear 11" },
    { category: "Fruits", price: "$2", stocked: false, name: "Mango 30" },
    { category: "Seafood", price: "$20", stocked: true, name: "Cod 69" },
    { category: "Fruits", price: "$19", stocked: true, name: "Mango 15" },
    { category: "Vegetables", price: "$16", stocked: false, name: "Lettuce 8" },
    { category: "Seafood", price: "$15", stocked: false, name: "Lobster 1" },
    { category: "Dairy", price: "$6", stocked: true, name: "Milk 10" },
    { category: "Seafood", price: "$12", stocked: false, name: "Cod 68" },
    { category: "Beverages", price: "$1", stocked: false, name: "Juice 98" },
    { category: "Fruits", price: "$10", stocked: false, name: "Dragonfruit 29" },
    { category: "Snacks", price: "$19", stocked: true, name: "Cookies 45" },
    { category: "Seafood", price: "$8", stocked: false, name: "Salmon 30" },
    { category: "Seafood", price: "$9", stocked: false, name: "Lobster 98" },
    { category: "Fruits", price: "$9", stocked: false, name: "Grapes 60" },
    { category: "Fruits", price: "$19", stocked: true, name: "Passionfruit 96" },
    { category: "Beverages", price: "$3", stocked: false, name: "Water 3" },
    { category: "Seafood", price: "$1", stocked: true, name: "Tuna 97" },
    { category: "Snacks", price: "$6", stocked: true, name: "Crackers 78" },
    { category: "Meat", price: "$1", stocked: false, name: "Turkey 83" },
    { category: "Meat", price: "$11", stocked: false, name: "Sausage 49" },
    { category: "Dairy", price: "$17", stocked: true, name: "Cheese 83" },
    { category: "Snacks", price: "$5", stocked: false, name: "Cookies 61" },
    { category: "Meat", price: "$8", stocked: false, name: "Chicken 52" },
    { category: "Fruits", price: "$19", stocked: true, name: "Peach 91" },
    { category: "Fruits", price: "$17", stocked: true, name: "Banana 44" },
    { category: "Vegetables", price: "$19", stocked: true, name: "Lettuce 29" },
    { category: "Snacks", price: "$7", stocked: true, name: "Cookies 75" },
    { category: "Fruits", price: "$8", stocked: true, name: "Peach 90" },
    { category: "Meat", price: "$13", stocked: false, name: "Lamb 48" },
    { category: "Vegetables", price: "$6", stocked: false, name: "Pumpkin 100" },
    { category: "Dairy", price: "$11", stocked: true, name: "Cottage Cheese 49" },
    { category: "Seafood", price: "$8", stocked: true, name: "Crab 55" },
    { category: "Bakery", price: "$9", stocked: true, name: "Bun 25" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Broccoli 17" },
    { category: "Meat", price: "$6", stocked: false, name: "Lamb 3" },
    { category: "Beverages", price: "$12", stocked: true, name: "Milkshake 80" },
    { category: "Beverages", price: "$10", stocked: true, name: "Water 14" },
    { category: "Snacks", price: "$4", stocked: false, name: "Chocolate 33" },
    { category: "Vegetables", price: "$5", stocked: true, name: "Peas 42" },
    { category: "Vegetables", price: "$11", stocked: false, name: "Garlic 13" },
    { category: "Bakery", price: "$7", stocked: false, name: "Muffin 24" },
    { category: "Bakery", price: "$1", stocked: true, name: "Bagel 21" },
    { category: "Bakery", price: "$11", stocked: false, name: "Bagel 6" },
    { category: "Vegetables", price: "$12", stocked: true, name: "Spinach 71" },
    { category: "Seafood", price: "$8", stocked: true, name: "Shrimp 70" },
    { category: "Fruits", price: "$14", stocked: true, name: "Peach 83" },
    { category: "Meat", price: "$11", stocked: false, name: "Chicken 73" },
    { category: "Vegetables", price: "$6", stocked: true, name: "Tomato 37" },
    { category: "Seafood", price: "$18", stocked: false, name: "Tuna 42" },
    { category: "Bakery", price: "$2", stocked: false, name: "Bagel 18" },
    { category: "Seafood", price: "$3", stocked: true, name: "Salmon 36" },
    { category: "Snacks", price: "$7", stocked: true, name: "Nuts 97" },
    { category: "Beverages", price: "$9", stocked: false, name: "Soda 18" },
    { category: "Fruits", price: "$18", stocked: false, name: "Dragonfruit 38" },
    { category: "Meat", price: "$12", stocked: false, name: "Beef 52" },
    { category: "Vegetables", price: "$19", stocked: false, name: "Lettuce 21" },
    { category: "Dairy", price: "$11", stocked: false, name: "Cream 21" },
    { category: "Meat", price: "$11", stocked: false, name: "Chicken 99" },
    { category: "Bakery", price: "$5", stocked: true, name: "Croissant 70" },
    { category: "Meat", price: "$18", stocked: true, name: "Sausage 54" },
    { category: "Vegetables", price: "$4", stocked: true, name: "Carrot 69" },
    { category: "Beverages", price: "$6", stocked: false, name: "Coffee 16" },
    { category: "Snacks", price: "$13", stocked: false, name: "Popcorn 91" },
    { category: "Fruits", price: "$5", stocked: true, name: "Passionfruit 8" },
    { category: "Fruits", price: "$2", stocked: true, name: "Mango 54" },
    { category: "Dairy", price: "$9", stocked: false, name: "Cottage Cheese 60" },
    { category: "Meat", price: "$9", stocked: false, name: "Turkey 23" },
    { category: "Dairy", price: "$10", stocked: false, name: "Cottage Cheese 88" },
    { category: "Meat", price: "$16", stocked: true, name: "Pork 66" },
    { category: "Bakery", price: "$12", stocked: true, name: "Muffin 80" },
    { category: "Meat", price: "$4", stocked: false, name: "Beef 74" },
    { category: "Snacks", price: "$5", stocked: true, name: "Popcorn 6" },
    { category: "Vegetables", price: "$17", stocked: true, name: "Carrot 70" },
    { category: "Meat", price: "$16", stocked: false, name: "Lamb 28" },
    { category: "Beverages", price: "$15", stocked: false, name: "Milkshake 2" },
    { category: "Meat", price: "$2", stocked: false, name: "Turkey 17" },
    { category: "Fruits", price: "$10", stocked: false, name: "Dragonfruit 91" },
    { category: "Snacks", price: "$8", stocked: true, name: "Cookies 18" },
    { category: "Snacks", price: "$2", stocked: true, name: "Cookies 66" },
    { category: "Beverages", price: "$6", stocked: false, name: "Milkshake 75" },
    { category: "Dairy", price: "$2", stocked: false, name: "Milk 87" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Lettuce 69" },
    { category: "Snacks", price: "$4", stocked: true, name: "Nuts 38" },
    { category: "Vegetables", price: "$13", stocked: false, name: "Tomato 36" },
    { category: "Vegetables", price: "$8", stocked: true, name: "Pumpkin 92" },
    { category: "Vegetables", price: "$15", stocked: false, name: "Cucumber 81" },
    { category: "Fruits", price: "$3", stocked: false, name: "Grapes 94" },
    { category: "Meat", price: "$17", stocked: false, name: "Chicken 37" },
    { category: "Fruits", price: "$3", stocked: true, name: "Banana 29" },
    { category: "Snacks", price: "$13", stocked: true, name: "Cookies 36" },
    { category: "Seafood", price: "$19", stocked: true, name: "Shrimp 25" },
    { category: "Dairy", price: "$9", stocked: true, name: "Cheese 31" },
    { category: "Vegetables", price: "$3", stocked: true, name: "Garlic 87" },
    { category: "Seafood", price: "$4", stocked: true, name: "Cod 87" },
    { category: "Vegetables", price: "$18", stocked: true, name: "Broccoli 31" },
    { category: "Vegetables", price: "$20", stocked: false, name: "Pumpkin 93" },
    { category: "Bakery", price: "$20", stocked: true, name: "Muffin 4" },
];

export default function App() {
    return (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
                <FilterableProductTable products={PRODUCTS} />
            </div>
        </div>
    );
}
