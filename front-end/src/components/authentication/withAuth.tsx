import { NextPage } from "next";
import withAuthRedirect from "./withAuthRedirect";

/**
 * Require the user to be authenticated in order to render the component.
 * If the user isn't authenticated, forward to the given URL.
 */
export function withAuth<P>(
  WrappedComponent: NextPage<P>,
  location = "/index"
): NextPage<P> {
  return withAuthRedirect({
    WrappedComponent,
    location,
    expectedAuth: true,
  });
}
