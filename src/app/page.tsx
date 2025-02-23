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
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <AdvocatesTable data={advocates} />
    </main>
  );
}
