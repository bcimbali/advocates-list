'use client';

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type paramsTypes = {
  [key: string]: string | string[] | undefined | FormDataEntryValue;
};

export default function AdvocatesSearch() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const initialFirstName = searchParams?.get('firstName');
    const initialLastName = searchParams?.get('lastName');
    if (typeof initialFirstName === 'string') {
      setFirstName(initialFirstName);
    }
    if (typeof initialLastName === 'string') {
      setLastName(initialLastName);
    }
  }, [searchParams]);

  const search = (formData: FormData) => {
    const params = [];
    for (const pair of formData.entries()) {
      params.push(pair);
    }
    // @ts-expect-error
    const queryString = new URLSearchParams(params).toString();

    router.push(`${pathname}?${queryString}`);
  }

  const clearSearch = () => {
    router.push(pathname);
  }

  return (
    <div className="form-wrapper">
    <form action={search}>
      <input onChange={(e) => setFirstName(e?.target?.value)} value={firstName} name="firstName" />
      <input onChange={(e) => setLastName(e?.target?.value)} value={lastName} name="lastName" />
      <button>Search</button>
    </form>
    <button type="button" onClick={clearSearch}>Clear Search</button>
    </div>
  )

};