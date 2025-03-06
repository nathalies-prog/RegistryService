import { serve } from "@hono/node-server";
import { Hono } from "hono";
import {
  deregisterService,
  getServiceUrl,
  registerService,
} from "./etcd-helper";

const app = new Hono();
const port = 3003;

// Alle Services bei Etcd registrieren
const registerAllServices = async () => {
  await registerService("AccountService", "http://AccountService:3000");
  await registerService("InventoryService", "http://InventoryService:3001");
  await registerService("LendingService", "http://LendingService:3002");
};

registerAllServices();
// Registrierung eines neuen Services
app.post("/registration/:serviceName", async (c) => {
  const { serviceName } = c.req.param();
  const { url } = await c.req.json();

  try {
    await registerService(serviceName, url);
    return c.json(`Service ${serviceName} erfolgreich registriert.`, 201);
  } catch (error) {
    return c.json({ error: `Fehler beim Registrieren des Service: ${error}` }, 500);
  }
});

// Abrufen eines Services
app.get("/registration/:serviceName", async (c) => {
  const { serviceName } = c.req.param();

  try {
    const serviceUrl = await getServiceUrl(serviceName);
    if (serviceUrl) {
      return c.json({ serviceName, url: serviceUrl });
    } else {
      return c.json(`Service ${serviceName} nicht gefunden.`, 404);
    }
  } catch (error) {
    return c.json(`Fehler beim Abrufen des Service: ${error}`, 500);
  }
});

// Löschen eines Services
app.delete("/registration/:serviceName", async (c) => {
  const { serviceName } = c.req.param();

  try {
    await deregisterService(serviceName);
    return c.json(`Service ${serviceName} erfolgreich gelöscht.`);
  } catch (error) {
   return c.json(`Fehler beim Löschen des Service: ${error}`, 500);
  }
});

serve({ fetch: app.fetch, port: port }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
