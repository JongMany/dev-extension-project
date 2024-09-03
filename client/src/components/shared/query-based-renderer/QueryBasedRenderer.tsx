import {PropsWithChildren, ReactNode} from "react";

type Props = {
  isLoading: boolean;
  isError: boolean;
  data: unknown;
  Loader: ReactNode;
  ErrorComponent: ReactNode;
  EmptyView: ReactNode;
  checkIsEmptyArray?: boolean;
}
export default function QueryBasedRenderer({isLoading, isError, data, Loader, ErrorComponent, EmptyView, children, checkIsEmptyArray=false}: PropsWithChildren<Props>) {
  if (isLoading) {
    return Loader;
  }
  if (isError) {
    return ErrorComponent
  }

  if (!data) {
    return EmptyView;
  }

  if(checkIsEmptyArray && Array.isArray(data)) {
    if (data.length === 0) return EmptyView;
  }

  return children;
}