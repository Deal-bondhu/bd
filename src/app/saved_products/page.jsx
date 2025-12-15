import SavedProducts from "@/components/page-layout/saved-products/SavedProducts";
import mongoDb, { collections } from "@/lib/mongoConnect";
import { cookies } from "next/headers";

const page = async () => {
  const cookieStore = await cookies();
  const visitor = cookieStore.get("visitor");
  const user_id = JSON.parse(visitor.value)?.user_id;

  const saved_products_collections = await mongoDb(collections.saved_products);
  const products = await saved_products_collections
    .find({ user_id: user_id })
    .toArray();
  return (
    <section>
      {products.length === 0 ? (
        <p>No Products Added</p>
      ) : (
        <SavedProducts products={products}></SavedProducts>
      )}
    </section>
  );
};

export default page;
