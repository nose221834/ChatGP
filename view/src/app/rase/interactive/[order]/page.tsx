export default function Page({ params }: { params: { order: string } }) {
  return (
    <main>
      <div>{params.order}</div>
    </main>
  );
}
