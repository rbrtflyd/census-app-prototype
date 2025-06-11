import PageHeader from '../../components/Structural/Headers/PageHeader';

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <PageHeader title="Home" />
      <main className="flex-grow p-4">Some text on the home page</main>
    </div>
  );
}
