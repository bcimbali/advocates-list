'use client';

import { useState, useEffect } from "react";
import { kebabCase } from "lodash";
import AdvocatesSearch from "../AdvocatesSearch";
import { AdvocateCard } from "../AdvocateCard";

// @ts-expect-error
export default function AdvocatesTable(data) {
  const [advocates, setAdvocates] = useState([]);

  useEffect(() => {
    const parsedData = JSON.parse(data?.data?.value)?.data;
    
    setAdvocates(parsedData)
  }, [data?.data?.value]);

  return (
    <div style={{ margin: "24px" }}>
      <AdvocatesSearch />
      <br />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {advocates?.map((advocate) => {
            const key = `${advocate?.firstName}-${advocate?.lastName}-${kebabCase(advocate?.city)}`
            return (
              <AdvocateCard key={key} advocate={advocate} />
            );
        })}
      </div>
    </div>
  );
}
