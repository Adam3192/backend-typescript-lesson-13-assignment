"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coffeeController_1 = require("../controllers/coffeeController");
const router = (0, express_1.Router)();
router.get('/', coffeeController_1.getAllCoffee);
router.get('/:id', coffeeController_1.getOneCoffee);
router.post('/', coffeeController_1.addCoffee);
router.put('/:id', coffeeController_1.editCoffee);
router.delete('/:id', coffeeController_1.deleteCoffee);
exports.default = router;
