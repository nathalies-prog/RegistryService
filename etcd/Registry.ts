import { serve } from "@hono/node-server/.";
import { Etcd3 } from "etcd3";
import { Hono } from "hono";
import {
  deregisterService,
  getServiceUrl,
  registerService,
} from "./etcd-helper";

const app = new Hono();
const port = 3005;
const etcd = new Etcd3({ hosts: "http://localhost:2379" });

// Registrierung eines neuen Services
app.post("/registration/:serviceName", async (c) => {
  const { serviceName } = c.req.param();
  const { url } = await c.req.json();

  try {
    await registerService(serviceName, url);
    c.json(`Service ${serviceName} erfolgreich registriert.`, 201);
  } catch (error) {
    c.json({ error: `Fehler beim Registrieren des Service: ${error}` }, 500);
  }
});

// Abrufen eines Services
app.get("/registration/:serviceName", async (c) => {
  const { serviceName } = c.req.param();

  try {
    const serviceUrl = await getServiceUrl(serviceName);
    if (serviceUrl) {
      c.json({ serviceName, url: serviceUrl });
    } else {
      c.json(`Service ${serviceName} nicht gefunden.`, 404);
    }
  } catch (error) {
    c.json(`Fehler beim Abrufen des Service: ${error}`, 500);
  }
});

// Löschen eines Services
app.delete("/registration/:serviceName", async (c) => {
  const { serviceName } = c.req.param();

  try {
    await deregisterService(serviceName);
    c.json(`Service ${serviceName} erfolgreich gelöscht.`);
  } catch (error) {
    c.json(`Fehler beim Löschen des Service: ${error}`, 500);
  }
});

serve({ fetch: app.fetch, port: 3005 }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
