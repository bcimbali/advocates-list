import AdvocatesTable from "@/components/AdvocatesTable";
import objectToUrlParams from "@/utils/urlHelpers";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // console.log('In page.tsx, this is searchParams: ', searchParams);
  const params = await searchParams;
  console.log('In page.tsx, this is params: ', params);
  const filters = await objectToUrlParams(params);
  console.log('In page.tsx, this is filters: ', filters);

  const data = await fetch(`http://localhost:3000/api/advocates?${filters}`);
  const advocates = data?.json();

  return (
    <main className="m-8 grid">
      <h1 className="self-center justify-self-center">Solace Advocates</h1>
      <AdvocatesTable data={advocates} />
    </main>
  );
}
