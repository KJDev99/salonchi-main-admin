import { Input, Table } from "antd";
import React, { useEffect, useState } from "react";

// Type definitions
interface AttributeValue {
  title: string;
  [key: string]: any;
}

interface Attribute {
  name_uz: string;
  values: AttributeValue[];
}

interface Variant {
  attributes: { [key: string]: string }; // Key: Attribute name, Value: Attribute value
  price: number;
  old_price?: number;
  body_price?: number;
  count: number;
}

interface CombinationTableProps {
  attributes: Attribute[];
  onSave?: (variants: Variant[]) => void;
  defaultVariant?: Variant[];
}

const CombinationTable: React.FC<CombinationTableProps> = ({
  attributes,
  onSave,
  defaultVariant = [],
}) => {
  const [combinations, setCombinations] = useState<string[]>([]);
  const [amounts, setAmounts] = useState<{ [key: string]: string }>({});
  const [prices, setPrices] = useState<{ [key: string]: string }>({});
  const [oldPrices, setOldPrices] = useState<{ [key: string]: string }>({});
  const [bodyPrices, setBodyPrices] = useState<{ [key: string]: string }>({});
  const [variants, setVariants] = useState<Variant[]>([]);

  // Generate combinations
  const calculateCombinations = (): string[] => {
    if (!attributes || attributes.length === 0) return [];

    const cartesian = (arr: Attribute[]): string[] => {
      const results = arr.reduce(
        (acc, curr) =>
          acc.flatMap((accItem) =>
            curr.values.map((value) => [...accItem, value.title])
          ),
        [[]] as string[][]
      );

      return results.map((combination) => combination.join(" / "));
    };

    return cartesian(attributes);
  };

  // Initialize or update combinations and default values
  useEffect(() => {
    const newCombinations = calculateCombinations();
    setCombinations(newCombinations);

    // Create initial state objects
    const initialAmounts: { [key: string]: string } = {};
    const initialPrices: { [key: string]: string } = {};
    const initialOldPrices: { [key: string]: string } = {};
    const initialBodyPrices: { [key: string]: string } = {};

    // Process defaultVariant if provided
    if (defaultVariant && defaultVariant.length > 0) {
      defaultVariant.forEach((variant) => {
        // Create a key by joining attribute values
        const key = Object.values(variant.attributes)
          .map((value) => value.toString())
          .join(" / ");

        // Populate initial values for this variant
        if (newCombinations.includes(key)) {
          initialAmounts[key] = variant.count.toString();
          initialPrices[key] = variant.price.toString();
          initialOldPrices[key] = variant.old_price?.toString() || "";
          initialBodyPrices[key] = variant.body_price?.toString() || "";
        }
      });
    }

    // Update state with initial or existing values
    newCombinations.forEach((key) => {
      if (!initialAmounts[key]) initialAmounts[key] = amounts[key] || "";
      if (!initialPrices[key]) initialPrices[key] = prices[key] || "";
      if (!initialOldPrices[key]) initialOldPrices[key] = oldPrices[key] || "";
      if (!initialBodyPrices[key])
        initialBodyPrices[key] = bodyPrices[key] || "";
    });

    // Set the states
    setAmounts(initialAmounts);
    setPrices(initialPrices);
    setOldPrices(initialOldPrices);
    setBodyPrices(initialBodyPrices);
  }, [attributes]);

  // Generate variants whenever state changes
  useEffect(() => {
    const newVariants: Variant[] = combinations
      .map((key) => {
        const attributePairs = key.split(" / ");
        const attributesObject: { [key: string]: string } = {};
        attributes.forEach((attr, index) => {
          attributesObject[attr.name_uz] = attributePairs[index];
        });

        return {
          attributes: attributesObject,
          price: prices[key] ? parseFloat(prices[key]) : 0,
          old_price: oldPrices[key] ? parseFloat(oldPrices[key]) : undefined,
          body_price: bodyPrices[key] ? parseFloat(bodyPrices[key]) : undefined,
          count: amounts[key] ? parseInt(amounts[key], 10) : 0,
        };
      })
      .filter((variant) => variant.price > 0 || variant.count > 0);

    setVariants(newVariants);

    if (onSave) {
      onSave(newVariants);
    }
  }, [amounts, prices, oldPrices, bodyPrices, combinations, onSave]);

  // Handle input changes
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
  const dataSource = combinations.map((key, index) => ({
    key: index,
    combination: key,
    amount: (
      <Input
        type="number"
        label="Miqdor"
        placeholder="Miqdor"
        value={amounts[key]}
        onChange={(e) => handleInputChange(key, "amount", e.target.value)}
      />
    ),
    price: (
      <Input
        type="number"
        label="Narx"
        placeholder="Narx"
        value={prices[key]}
        onChange={(e) => handleInputChange(key, "price", e.target.value)}
      />
    ),
    old_price: (
      <Input
        type="number"
        label="Eski narx"
        placeholder="Eski narx"
        value={oldPrices[key]}
        onChange={(e) => handleInputChange(key, "old_price", e.target.value)}
      />
    ),
    body_price: (
      <Input
        type="number"
        placeholder="Tan narx"
        label="Tan narx"
        value={bodyPrices[key]}
        onChange={(e) => handleInputChange(key, "body_price", e.target.value)}
      />
    ),
  }));

  // Table columns
  const columns = [
    {
      title: "Mahsulot turi",
      dataIndex: "combination",
      key: "combination",
    },
    // {
    //   title: "Miqdor",
    //   dataIndex: "amount",
    //   key: "amount",
    // },
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
