'use client';

import { useState, useEffect } from "react";
import { kebabCase } from "lodash";
import AdvocatesSearch from "../AdvocatesSearch";

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
      <br />
      <table>
        <thead>
          <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocates?.map((advocate) => {
            const key = `${advocate?.firstName}-${advocate?.lastName}-${kebabCase(advocate?.city)}`
            return (
              <tr key={key}>
                <td>{advocate?.firstName}</td>
                <td>{advocate?.lastName}</td>
                <td>{advocate?.city}</td>
                <td>{advocate?.degree}</td>
                <td>
                  {advocate?.specialties.map((s) => (
                    <div key={`${key}-${kebabCase(s)}`}>{s}</div>
                  ))}
                </td>
                <td>{advocate?.yearsOfExperience}</td>
                <td>{advocate?.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
