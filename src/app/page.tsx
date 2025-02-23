import AdvocatesTable from "@/components/AdvocatesTable";

export default async function Home() {

  const data = await fetch("http://localhost:3000/api/advocates");
  const advocates = data.json();

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <AdvocatesTable data={advocates} />
    </main>
  );
}
