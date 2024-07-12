import React, { useState, useEffect } from "react";
import data from "../data";

const DropdownFilter = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const uniqueProducts = Array.from(
    new Set(data.flatMap((item) => item.products))
  );
  const uniqueBodyParts = Array.from(
    new Set(data.flatMap((item) => item.bodyPart))
  );
  const uniqueRegions = Array.from(
    new Set(data.flatMap((item) => item.region))
  );

  useEffect(() => {
    const filteredData = data.filter(
      (item) =>
        (selectedProduct ? item.products.includes(selectedProduct) : true) &&
        (selectedBodyPart ? item.bodyPart.includes(selectedBodyPart) : true) &&
        (selectedRegion ? item.region.includes(selectedRegion) : true)
    );
    setFilteredResults(filteredData);
  }, [selectedProduct, selectedBodyPart, selectedRegion]); // Automatically re-filter whenever these state values change

  const combinedFilters = [
    selectedProduct,
    selectedBodyPart,
    selectedRegion,
  ].filter((e) => !!e);

  const things = (thing) => <li key={thing}>{thing}</li>;
  return (
    <div>
      <div className="dropdowns">
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">Select Product</option>
          {uniqueProducts.map((product) => (
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </select>

        <select
          value={selectedBodyPart}
          onChange={(e) => setSelectedBodyPart(e.target.value)}
        >
          <option value="">Select Body Part</option>
          {uniqueBodyParts.map((bodyPart) => (
            <option key={bodyPart} value={bodyPart}>
              {bodyPart}
            </option>
          ))}
        </select>

        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="">Select Region</option>
          {uniqueRegions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
      <div className="my-5">
        {combinedFilters.length === 0 && <div>&nbsp;</div>}
        {combinedFilters.length > 0 && (
          <div className="flex">
            Filtering by{" "}
            <div>
              {combinedFilters.map((item, i, array) => (
                <>
                  <>{item}</>
                  <>{i < array.length - 1 && <>,</>}</>
                  <> </>
                </>
              ))}
            </div>
          </div>
        )}
      </div>

      {filteredResults.length === 0 && (
        <p className="text-center">No results found</p>
      )}
      <ul>
        {filteredResults.map((item) => (
          <li className="doc-item" key={item.name}>
            <div>
              {item.name} <span className="button">Download ↓</span>
            </div>
            {item.products.length > 0 && (
              <ul className="pills">{item.products.map(things)}</ul>
            )}
            {item.bodyPart.length > 0 && (
              <ul className="pills">{item.bodyPart.map(things)}</ul>
            )}
            {item.region.length > 0 && (
              <ul className="pills">{item.region.map(things)}</ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownFilter;
