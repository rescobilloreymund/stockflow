import { ProductService } from "@/services/product.service";

const productService = new ProductService();
export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;

    const productId = Number(id);

    if (Number.isNaN(productId)) {
      return Response.json(
        {
          message: "Invalid product id.",
        },
        { status: 400 },
      );
    }

    const data = await request.json();

    const product = await productService.updateProduct(productId, data);

    return Response.json(product, { status: 200 });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Failed to update product.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;

    const productId = Number(id);

    if (Number.isNaN(productId)) {
      return Response.json(
        {
          message: "Invalid product id.",
        },
        { status: 400 },
      );
    }

    await productService.deleteProduct(productId);

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Failed to delete product.",
      },
      {
        status: 500,
      },
    );
  }
}
