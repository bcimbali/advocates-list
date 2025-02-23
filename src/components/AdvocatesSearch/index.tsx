'use client';

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

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
    setFirstName('');
    setLastName('');
  }

  return (
    <div className="form-wrapper">
    <form action={search} className="grid gap-4 md:grid-cols-4 items-end">
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input onChange={(e) => setFirstName(e?.target?.value)} value={firstName} name="firstName" />
      </div>
      
      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input onChange={(e) => setLastName(e?.target?.value)} value={lastName} name="lastName" />
      </div>
      <Button>Search</Button>
    <Button type="button" variant="outline" onClick={clearSearch}>Clear Search</Button>
    </form>
    </div>
  )

};