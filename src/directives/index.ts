/*
 * @Date: 2024-04-16 11:16:19
 * @LastEditors: phil_litian
 */

import { setupLoadingDirective } from "./loading";
import { setupPermissionDirective } from './permission'


export function setupGlobDirectives(app) {
  setupLoadingDirective(app)
  setupPermissionDirective(app)
}

