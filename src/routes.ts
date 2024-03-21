import { Router } from "express";
import { body } from "express-validator";
import { handleInputError } from "./modules/middleware";
import { UPDATE_STATUES } from ".prisma/client";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";

const router = Router();

/**
 * Product
 */
router.get("/product", getProducts);

router.get("/product/:id", getOneProduct);

router.post("/product", body("name").isString(), createProduct);

router.put(
  "/product/:id",
  body("name").isString(),
  handleInputError,
  updateProduct,
);

router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update", (req, res) => {});

router.get("/update/:id", (req, res) => {});

router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  handleInputError,

  (req, res) => {},
);

router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").custom((value) => {
    if (!Object.values(UPDATE_STATUES).includes(value)) {
      throw new Error("올바르지 않은 상태 값입니다.");
    }

    return true;
  }),
  body("version").optional(),
  handleInputError,
  (req, res) => {},
);

router.delete("/update/:id", (req, res) => {});

/**
 * UpdatePoint
 */

router.get("/updatepoint", (req, res) => {});

router.get("/updatepoint/:id", (req, res) => {});

router.post(
  "/updatepoint",
  body("name").exists().isString(),
  body("description").exists().isString(),
  body("updateId").exists().isString(),
  handleInputError,
  (req, res) => {},
);

router.put(
  "/updatepoint/:id",
  body("name").optional(),
  body("description").optional(),
  handleInputError,
  (req, res) => {},
);

router.delete("/updatepoint/:id", (req, res) => {});

export default router;
