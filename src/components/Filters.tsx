import React, { useEffect, useState } from "react";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { fetchCategories, fetchLocations, fetchDeliveryMethods } from "@/services";
import { Button } from "./ui/Button";

const Filters = ({
  searchQuery,
  onSearchChange,
  category,
  setCategory,
  location,
  setCourseLocation,
  deliveryMethod,
  setDeliveryMethod,
}: {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  category: string;
  setCategory: (category: string) => void;
  location: string;
  setCourseLocation: (location: string) => void;
  deliveryMethod: string;
  setDeliveryMethod: (location: string) => void;
}) => {
  const [locations, setLocations] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [deliveryMethods, setDeliveryMethods] = useState<string[]>([]);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const data = await fetchLocations();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const getDeliveryMethods = async () => {
      try {
        const data = await fetchDeliveryMethods();
        setDeliveryMethods(data);
      } catch (error) {
        console.error("Error fetching delivery methods:", error);
      }
    };

    getLocations();
    getCategories();
    getDeliveryMethods();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleClearFilter = () => {
    onSearchChange("");
    setCategory("");
    setCourseLocation("");
    setDeliveryMethod("");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_minmax(0,_1fr)__minmax(0,_1fr)_minmax(0,_1fr)_auto] gap-4 my-6 py-4 border-b sticky top-0 bg-white">
      <div>
        <Label htmlFor="search">Search courses</Label>
        <Input
          id="search"
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        <Label>Category</Label>
        <Select onValueChange={setCategory} value={category}>
          <SelectTrigger>
            <SelectValue placeholder="All categories" />
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
      <div>
        <Label>Location</Label>
        <Select onValueChange={setCourseLocation} value={location}>
          <SelectTrigger>
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Delivery method</Label>
        <Select onValueChange={setDeliveryMethod} value={deliveryMethod}>
          <SelectTrigger>
            <SelectValue placeholder="All delivery methods" />
          </SelectTrigger>
          <SelectContent>
            {deliveryMethods.map((deliveryMethod) => (
              <SelectItem key={deliveryMethod} value={deliveryMethod}>
                {deliveryMethod}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end items-end gap-4">
        {/* <Button variant="outline" onClick={handleClearFilter}>Additional</Button> */}
        <Button onClick={handleClearFilter}>Clear filters</Button>
      </div>
    </div>
  );
};

export default Filters;
