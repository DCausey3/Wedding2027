/**
 * Amplify client-side configuration.
 * Import this in your root layout to initialize Amplify once.
 */
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";

export function configureAmplify() {
  Amplify.configure(outputs, { ssr: true });
}
