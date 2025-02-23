'use client';

import { parse } from "path";
import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { kebabCase } from "lodash";

export default function AdvocatesTable(data) {
  // console.log('In AdvocatesTable.tsx, this is data?.data: ', JSON.parse(data?.data?.value));
  const [advocates, setAdvocates] = useState([]);
  console.log('In AdvocatesTable.tsx, this is advocates: ', advocates);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // useEffect(() => {
  //   console.log("fetching advocates...");
  //   fetch("/api/advocates").then((response) => {
  //     response.json().then((jsonResponse) => {
  //       setAdvocates(jsonResponse.data);
  //       setFilteredAdvocates(jsonResponse.data);
  //     });
  //   });
  // }, []);

  useEffect(() => {
    const parsedData = JSON.parse(data?.data?.value)?.data;
    console.log('In useEffect, this is parsedData: ', parsedData);
    
    setAdvocates(parsedData)
  }, [data]);


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const searchTerm = e.target.value;
    setSearchTerm(e.target.value)

    // document.getElementById("search-term").innerHTML = searchTerm;

    // console.log("filtering advocates...");
    // const filteredAdvocates = advocates.filter((advocate) => {
    //   return (
    //     advocate.firstName.includes(searchTerm) ||
    //     advocate.lastName.includes(searchTerm) ||
    //     advocate.city.includes(searchTerm) ||
    //     advocate.degree.includes(searchTerm) ||
    //     advocate.specialties.includes(searchTerm) ||
    //     advocate.yearsOfExperience.includes(searchTerm)
    //   );
    // });

    // setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate?.firstName?.includes(searchTerm) ||
        advocate?.lastName?.includes(searchTerm) ||
        advocate?.city?.includes(searchTerm) ||
        advocate?.degree?.includes(searchTerm) ||
        advocate?.specialties?.includes(searchTerm) ||
        advocate?.yearsOfExperience?.includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  return (
    <div style={{ margin: "24px" }}>
      <pre>
        {data?.data?.value}
      </pre>
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} value={searchTerm} />
        <button onClick={onClick}>Reset Search</button>
      </div>
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
