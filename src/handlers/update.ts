import prisma from "../db";
import { Product, Update, User } from "@prisma/client";
import { Handler } from "../types/handler.type";

export const getUpdates: Handler<{ user: User }> = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.body.user.id,
    },
    include: {
      update: true,
    },
  });

  const updates = products.reduce((allUpdates: Update[], product) => {
    return [...allUpdates, ...product.update];
  }, []);

  const updateResult = res.json({ data: updates });
};

export const getOneUpdate: Handler = async (req, res) => {
  const updateId = req.params.id;

  const updates = await prisma.update.findUnique({
    where: {
      id: updateId,
    },
  });

  res.json({ data: updates });
};

export const createUpdate: Handler<{
  product: Product;
  update: Update;
}> = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.product.id,
    },
  });

  if (!product) {
    return res.json({
      message:
        "가지고 계신 프로덕트가 없습니다. 프로덕트를 먼저 생성하신 후 시도해 주세요.",
    });
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.update.title,
      body: req.body.update.body,
      product: { connect: { id: product.id } },
      updatedAt: new Date(),
    },
  });

  res.json({ data: update });

  res.json({ data: update });
};

export const updateUpdate: Handler<{ user: User; update: Update }> = async (
  req,
  res,
) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.body.user.id,
    },
    include: {
      update: true,
    },
  });

  const updates = products.reduce<Update[]>((allUpdates, product) => {
    return [...allUpdates, ...product.update];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.json({
      message: "일치하는 업데이트가 없습니다. 알맞은 업데이트를 수정해 주세요",
    });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body.update,
  });

  res.json({ data: updatedUpdate });
};

export const deleteUpdate: Handler<{ user: User }> = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.body.user.id,
    },
    include: {
      update: true,
    },
  });

  const updates = products.reduce<Update[]>((allUpdates, product) => {
    return [...allUpdates, ...product.update];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.json({ message: "삭제할 업데이트가 없습니다." });
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deleted });
};
