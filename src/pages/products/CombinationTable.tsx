import React, { useState, useEffect } from "react";
import { Table, Input } from "antd";

// Type definitions
interface AttributeValue {
  title: string;
  [key: string]: any;
}

interface Attribute {
  name_uz: string;
  values: AttributeValue[];
}

interface CombinationItem {
  name_uz: string;
  value: AttributeValue;
}

interface Variant {
  attributes: {
    [key: string]: string;
  };
  price: number;
  count: number;
}

interface CombinationTableProps {
  attributes: Attribute[];
  onSave?: (variants: Variant[]) => void;
}

const CombinationTable: React.FC<CombinationTableProps> = ({
  attributes,
  onSave,
}) => {
  const [combinations, setCombinations] = useState<CombinationItem[][]>([]);
  const [amounts, setAmounts] = useState<{ [key: string]: string }>({});
  const [prices, setPrices] = useState<{ [key: string]: string }>({});
  const [variants, setVariants] = useState<Variant[]>([]);
  // Generate all possible combinations of attribute values
  const calculateCombinations = (): CombinationItem[][] => {
    if (!attributes || attributes.length === 0) return [];

    const cartesian = (arr: Attribute[]): CombinationItem[][] => {
      return arr.reduce(
        (acc, curr) =>
          acc.flatMap((accItem) =>
            curr.values.map((value) => [
              ...accItem,
              { name_uz: curr.name_uz, value },
            ])
          ),
        [[]] as CombinationItem[][]
      );
    };

    return cartesian(attributes);
  };

  // Sync combinations, amounts, and prices when attributes change
  useEffect(() => {
    const newCombinations = calculateCombinations();
    setCombinations(newCombinations);

    // Initialize amounts and prices for new combinations
    const initialAmounts: { [key: string]: string } = {};
    const initialPrices: { [key: string]: string } = {};
    newCombinations.forEach((combination) => {
      const key = combination.map((item) => item.value.title).join(" / ");
      initialAmounts[key] = amounts[key] || "";
      initialPrices[key] = prices[key] || "";
    });
    setAmounts(initialAmounts);
    setPrices(initialPrices);
  }, [attributes]);

  // Automatically generate `variants` whenever amounts or prices change
  useEffect(() => {
    const newVariants: Variant[] = combinations
      .map((combination) => {
        const key = combination.map((item) => item.value.title).join(" / ");

        // Create attributes object with exact structure
        const attributesObject: { [key: string]: string } = {};
        combination.forEach((item) => {
          attributesObject[item.name_uz] = item.value.title;
        });

        return {
          attributes: attributesObject,
          price: prices[key] ? parseFloat(prices[key]) : 0,
          count: amounts[key] ? parseInt(amounts[key], 10) : 0,
        };
      })
      .filter((variant) => variant.price > 0 || variant.count > 0); // Optional: filter out empty variants

    setVariants(newVariants);

    // Pass to parent if onSave callback is provided
    if (onSave) onSave(newVariants);
  }, [amounts, prices, combinations]);

  // Handle changes in amount and price inputs
  const handleInputChange = (
    combinationKey: string,
    type: "amount" | "price",
    value: string
  ) => {
    if (type === "amount") {
      setAmounts((prev) => ({ ...prev, [combinationKey]: value }));
    } else if (type === "price") {
      setPrices((prev) => ({ ...prev, [combinationKey]: value }));
    }
  };

  // Prepare data for the table
  const dataSource = combinations.map((combination, index) => {
    const key = combination.map((item) => item.value.title).join(" / ");
    return {
      key: index,
      combination: key,
      amount: (
        <Input
          type="number"
          placeholder="Amount"
          value={amounts[key]}
          onChange={(e) => handleInputChange(key, "amount", e.target.value)}
        />
      ),
      price: (
        <Input
          type="number"
          placeholder="Price"
          value={prices[key]}
          onChange={(e) => handleInputChange(key, "price", e.target.value)}
        />
      ),
    };
  });

  // Define table columns
  const columns = [
    {
      title: "Mahsulot turi",
      dataIndex: "combination",
      key: "combination",
      align: "center",
    },
    {
      title: "Miqdor",
      dataIndex: "amount",
      key: "amount",
      align: "center",
    },
    {
      title: "Narx",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
  ];

  return (
    <div style={{ marginTop: 16 }}>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
        size="middle"
      />
    </div>
  );
};

export default CombinationTable;
