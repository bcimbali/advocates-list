'use client';

import { parse } from "path";
import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { kebabCase } from "lodash";
import { usePathname, useRouter } from 'next/navigation'

type paramsTypes = {
  [key: string]: string | string[] | undefined | FormDataEntryValue;
};

export default function AdvocatesSearch() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const pathname = usePathname();
  const router = useRouter();

  function search(formData: FormData) {
    const params = [];
    for (const pair of formData.entries()) {
      console.log('In index.tsx, this is pair: ', pair);
      params.push(pair);
    }
    // @ts-expect-error
    const queryString = new URLSearchParams(params).toString();

    router.push(`${pathname}?${queryString}`);
  }

  return (
    <form action={search}>
      <input onChange={(e) => setFirstName(e?.target?.value)} value={firstName} name="firstName" />
      <input onChange={(e) => setLastName(e?.target?.value)} value={lastName} name="lastName" />
      <button>Search!</button>
    </form>
  )

};