"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const sync_1 = __importDefault(require("./Model/sync"));
const PORT = 4000;
(0, sync_1.default)();
app_1.default.listen(PORT, () => {
    console.log(`Server is runnning on PORT: ${PORT}`);
});
