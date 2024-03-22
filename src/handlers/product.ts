import prisma from "../db";
import { Product, User } from "@prisma/client";
import { Handler } from "../types/handler.type";

export const getProducts: Handler<{ user: User }> = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.body.user.id,
      },
      include: {
        products: true,
      },
    });
    res.json({ data: user?.products });
  } catch (err) {
    next(err);
  }
};

export const getOneProduct: Handler<{ user: User }> = async (
  req,
  res,
  next,
) => {
  try {
    const productId = req.params.id;

    const product = await prisma.product.findUnique({
      where: {
        id: productId as string,
        belongsToId: req.body.user.id,
      },
    });

    res.json({ data: product });
  } catch (err) {
    next(err);
  }
};

export const createProduct: Handler<Product> = async (req, res, next) => {
  try {
    const { name, belongsToId } = req.body;

    const result = await prisma.product.create({
      data: {
        name,
        belongsToId,
      },
    });

    res.json({ data: result });
  } catch (err) {
    next(err);
  }
};

export const updateProduct: Handler<Product> = async (req, res, next) => {
  try {
    const updated = await prisma.product.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: req.body.name,
      },
    });

    res.json({ data: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct: Handler<{ user: User }> = async (
  req,
  res,
  next,
) => {
  try {
    const deleted = await prisma.product.delete({
      where: {
        id: req.params.id,
        belongsToId: req.body.user.id,
      },
    });

    return res.json({ data: deleted });
  } catch (err) {
    next(err);
  }
};
