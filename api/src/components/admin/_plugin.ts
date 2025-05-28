import Elysia from "elysia";
import registerAdmin from "./controllers/registerAdmin";
import signAdmin from "./controllers/signAdmin";

const adminPlugin = new Elysia({
    prefix: "/admins"
})
    .use(registerAdmin)
    .use(signAdmin)

export default adminPlugin;