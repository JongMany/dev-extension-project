import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

// SSR Next.js
const getQueryClient = cache(() => new QueryClient());
export default getQueryClient;
