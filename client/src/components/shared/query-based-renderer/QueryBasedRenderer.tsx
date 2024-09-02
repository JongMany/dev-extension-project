import {PropsWithChildren, ReactNode} from "react";

type Props = {
  isLoading: boolean;
  isError: boolean;
  data: unknown;
  Loader: ReactNode;
  ErrorComponent: ReactNode;
  EmptyView: ReactNode;
}
export default function QueryBasedRenderer({isLoading, isError, data, Loader, ErrorComponent, EmptyView, children}: PropsWithChildren<Props>) {
  if (isLoading) {
    return Loader;
  }
  if (isError) {
    return ErrorComponent
  }

  if (!data) {
    return EmptyView;
  }

  return children;
}