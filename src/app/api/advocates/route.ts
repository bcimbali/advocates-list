// import db from "../../../db";
// import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { NextRequest } from 'next/server';
import { isEmpty, isNil } from "lodash";

export async function GET(request: NextRequest) {
  // Uncomment this line to use a database
  // const data = await db.select().from(advocates);

  let data = await advocateData;
  let dataToReturn = data;
  let firstNameResults: typeof advocateData = [];
  let lastNameResults: typeof advocateData = [];

  const firstName = request?.nextUrl?.searchParams?.get('firstName');
  const lastName = request?.nextUrl?.searchParams?.get('lastName');

  const isFirstNameQueryPresent = !isNil(firstName) && !isEmpty(firstName);
  const isLastNameQueryPresent = !isNil(lastName) && !isEmpty(lastName);

  const hasFilters = isFirstNameQueryPresent || isLastNameQueryPresent;

  // TODO: Search by all params and DRY this up:
  if (isFirstNameQueryPresent) {
    firstNameResults = data?.filter((advocate) => advocate?.firstName === firstName);
  }
  if (isLastNameQueryPresent) {
    lastNameResults = data?.filter((advocate) => advocate?.lastName === lastName);
  }

  if (hasFilters) {
    const concatArr = firstNameResults.concat(lastNameResults);
    const result = concatArr.filter((item, idx) => concatArr.indexOf(item) === idx);
    dataToReturn = result;
  }

  return Response.json({ data: dataToReturn });
}
