import ProductUpdateForm from "@/components/page-layout/update/ProductUpdateForm";

const page = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:5000/single_pending_product/${id}`);
  const data = await res.json();
  return <ProductUpdateForm product={data}></ProductUpdateForm>;
};

export default page;
