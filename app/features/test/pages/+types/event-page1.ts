import type { MetaFunction } from "react-router";

interface DataArgs {
  request: Request;
  params: Record<string, string>;
  context: Record<string, unknown>;
}

export interface Route {
  readonly id: string;
  readonly path: string;
}

export declare namespace Route {
  type LoaderArgs = DataArgs;
  type ActionArgs = DataArgs;
  type MetaFunction = MetaFunction;
  interface ComponentProps {
    loaderData?: unknown;
    actionData?: unknown;
  }
}

