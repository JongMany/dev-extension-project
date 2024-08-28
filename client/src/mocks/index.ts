import { isBrowser } from "@/lib/checkIsBrowser";

export async function initMocks() {
  if (isBrowser()) {
    await import("./browser");
    // const { worker } = await import("./browser");
    // await worker.start();
  } else {
    // const { server } = await import("./http");
    // server.listen();
  }
}
