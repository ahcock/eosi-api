import { Handler } from "../types/handler.type";
import prisma from "../db";
import { Product, User } from "@prisma/client";

export const getProducts: Handler<{ user: User }> = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });
  res.json({ data: user?.products });
};

export const getOneProduct: Handler<{ user: User }> = async (req, res) => {
  const productId = req.query.id;

  const product = await prisma.product.findUnique({
    where: {
      id: productId as string,
      belongsToId: req.user.id,
    },
  });

  res.json({ data: product });
};

export const createProduct: Handler<Product> = async (req, res) => {
  const { name, belongsToId } = req;
  const result = await prisma.product.create({
    data: {
      name,
      belongsToId,
    },
  });

  res.json({ data: result });
};

export const updateProduct: Handler = async (req, res) => {
  const updated = await prisma.product.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: updated });
};

export const deleteProduct: Handler<{ user: User }> = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id: req.params.id,
      belongsToId: req.user.id,
    },
  });

  return res.json({ data: deleted });
};
