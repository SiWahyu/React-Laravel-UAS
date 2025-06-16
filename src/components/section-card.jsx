import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, Tag, Truck } from "lucide-react";
import { Link } from "react-router-dom";

export function SectionCards({ data = {} }) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 ">
      <Card className="@container/card px-5 py-10">
        <CardHeader>
          <CardDescription>Total Category</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.category_total || 0}
          </CardTitle>
          <CardAction>
            <Tag />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <Link to={"/dashboard/categories"}>View all</Link>
        </CardFooter>
      </Card>
      <Card className="@container/card px-5 py-10">
        <CardHeader>
          <CardDescription>Total Producut</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.product_total || 0}
          </CardTitle>
          <CardAction>
            <Package />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <Link to={"/dashboard/products"}>View all</Link>
        </CardFooter>
      </Card>
      <Card className="@container/card px-5 py-10">
        <CardHeader>
          <CardDescription>Total Supplier</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.supplier_total || 0}
          </CardTitle>
          <CardAction>
            <Truck />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <Link to={"/dashboard/suppliers"}>View all</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
