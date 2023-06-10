const express = require("express");
const router = express.Router();
const blogControllers = require("../../controller/blogControllers");
// blog routes
router.get("/", blogControllers.blogIndex);

router.post("/", blogControllers.blogCreateSave);

router.get("/:id", blogControllers.blogDetails);

router.delete("/:id", blogControllers.blogDelete);

module.exports = router;
