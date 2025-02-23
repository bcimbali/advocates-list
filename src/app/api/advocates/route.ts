import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { NextRequest } from 'next/server';
import { first, isNil } from "lodash";

export async function GET(request: NextRequest) {
  // Uncomment this line to use a database
  // const data = await db.select().from(advocates);
  const data = await advocateData;
  let dataToReturn = data;
  // console.log('In route.ts, this is data?.length: ', data?.length);

  const firstName = request?.nextUrl?.searchParams?.get('firstName');
  const lastName = request?.nextUrl?.searchParams?.get('lastName');

  const isFirstNameQueryPresent = !isNil(firstName);

  // console.log('In route.ts, this is firstName: ', firstName);
  // console.log('In route.ts, this is lastName: ', lastName);
  // console.log('isNil(lastName): ', isNil(lastName));

  if (isFirstNameQueryPresent) {
    dataToReturn = data?.filter((advocate) => advocate?.firstName === firstName);
  }

  console.log('dataToReturn?.length: ', dataToReturn?.length);
  return Response.json({ data: dataToReturn });
}
