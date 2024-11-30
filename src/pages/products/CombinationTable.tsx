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
  old_price?: number;
  body_price?: number;
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
  const [oldPrices, setOldPrices] = useState<{ [key: string]: string }>({});
  const [bodyPrices, setBodyPrices] = useState<{ [key: string]: string }>({});
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

  // Sync combinations, amounts, prices, and additional prices when attributes change
  useEffect(() => {
    const newCombinations = calculateCombinations();
    setCombinations(newCombinations);

    // Initialize amounts, prices, old_prices, and body_prices for new combinations
    const initialAmounts: { [key: string]: string } = {};
    const initialPrices: { [key: string]: string } = {};
    const initialOldPrices: { [key: string]: string } = {};
    const initialBodyPrices: { [key: string]: string } = {};

    newCombinations.forEach((combination) => {
      const key = combination.map((item) => item.value.title).join(" / ");
      initialAmounts[key] = amounts[key] || "";
      initialPrices[key] = prices[key] || "";
      initialOldPrices[key] = oldPrices[key] || "";
      initialBodyPrices[key] = bodyPrices[key] || "";
    });

    setAmounts(initialAmounts);
    setPrices(initialPrices);
    setOldPrices(initialOldPrices);
    setBodyPrices(initialBodyPrices);
  }, [attributes]);

  // Automatically generate `variants` whenever amounts, prices, old_prices, or body_prices change
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
          old_price: oldPrices[key] ? parseFloat(oldPrices[key]) : undefined,
          body_price: bodyPrices[key] ? parseFloat(bodyPrices[key]) : undefined,
          count: amounts[key] ? parseInt(amounts[key], 10) : 0,
        };
      })
      .filter((variant) => variant.price > 0 || variant.count > 0); // Optional: filter out empty variants

    setVariants(newVariants);

    // Pass to parent if onSave callback is provided
    if (onSave) onSave(newVariants);
  }, [amounts, prices, oldPrices, bodyPrices, combinations]);

  // Handle changes in amount, price, old_price, and body_price inputs
  const handleInputChange = (
    combinationKey: string,
    type: "amount" | "price" | "old_price" | "body_price",
    value: string
  ) => {
    switch (type) {
      case "amount":
        setAmounts((prev) => ({ ...prev, [combinationKey]: value }));
        break;
      case "price":
        setPrices((prev) => ({ ...prev, [combinationKey]: value }));
        break;
      case "old_price":
        setOldPrices((prev) => ({ ...prev, [combinationKey]: value }));
        break;
      case "body_price":
        setBodyPrices((prev) => ({ ...prev, [combinationKey]: value }));
        break;
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
          placeholder="miqdor"
          value={amounts[key]}
          onChange={(e) => handleInputChange(key, "amount", e.target.value)}
        />
      ),
      price: (
        <Input
          type="number"
          placeholder="Narxi"
          value={prices[key]}
          onChange={(e) => handleInputChange(key, "price", e.target.value)}
        />
      ),
      old_price: (
        <Input
          type="number"
          placeholder="eski narxi"
          value={oldPrices[key]}
          onChange={(e) => handleInputChange(key, "old_price", e.target.value)}
        />
      ),
      body_price: (
        <Input
          type="number"
          placeholder="Tan narxi"
          value={bodyPrices[key]}
          onChange={(e) => handleInputChange(key, "body_price", e.target.value)}
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
    },
    {
      title: "Miqdor",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Narx",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Eski Narx",
      dataIndex: "old_price",
      key: "old_price",
    },
    {
      title: "Tan Narx",
      dataIndex: "body_price",
      key: "body_price",
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
