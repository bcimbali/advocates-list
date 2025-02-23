import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { kebabCase } from "lodash";
import parsePhoneNumber from 'libphonenumber-js';

//@ts-expect-error
export function AdvocateCard({ advocate }) {
  const advocateName = `${advocate?.firstName} ${advocate?.lastName}`;
  const parsedPhone = parsePhoneNumber(advocate?.phoneNumber?.toString(), 'US');

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{advocateName}</CardTitle>
        <CardDescription>{`${advocate?.yearsOfExperience ?? 'Some'} years of experience.`}</CardDescription>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <p className="font-bold">City: <span className="font-normal">{advocate?.city}</span></p>
        <p className="font-bold">Phone: <span className="font-normal">{parsedPhone?.formatNational()}</span></p>
        <p className="font-bold">Specialties:</p>
        <ul className="my-6 ml-6 list-disc mt-0 [&>li]:mt-2">
        {advocate?.specialties?.slice(0, 3)?.map((specialty) => (
          <li key={kebabCase(specialty)}>{specialty}</li>
        ))}
        {advocate?.specialties?.length >= 3 && (
          <li>And More...</li>
        )}
        </ul>
      </CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
  )
}
